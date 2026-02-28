import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { MEMO_TOOLS } from "./tools/definitions.js";
import { handleCreateGoal, handleCreateMemo, handleGetDailySummary, handleGetGoals, handleGetTags, handleReadMemo, handleSearchMemos, handleUpdateMemo } from "./tools/handlers.js";

export function createServer(): Server {
    const server = new Server(
        { name: "memolink-mcp", version: "1.0.0" },
        { capabilities: { tools: {} } }
    );

    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return { tools: MEMO_TOOLS };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;

        try {
            switch (name) {
                case "create_memo": return await handleCreateMemo(args);
                case "search_memos": return await handleSearchMemos(args);
                case "get_daily_summary": return await handleGetDailySummary(args);
                case "read_memo": return await handleReadMemo(args);
                case "update_memo": return await handleUpdateMemo(args);
                case "get_user_tags": return await handleGetTags(args);
                case "get_goals": return await handleGetGoals(args);
                case "create_goal": return await handleCreateGoal(args);
                default:
                    throw new Error(`Unknown tool: ${name}`);
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                return {
                    content: [{ type: "text", text: `Memolink API Error: ${errorMessage}` }],
                    isError: true,
                };
            }

            return {
                content: [{ type: "text", text: `Error executing tool ${name}: ${error.message}` }],
                isError: true,
            };
        }
    });

    return server;
}
