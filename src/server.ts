import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ToolRegistry } from "./core/tool-registry.js";
import {
    CreateGoalTool,
    CreateMemoTool,
    GetDailySummaryTool,
    GetGoalsTool,
    GetTagsTool,
    ReadMemoTool,
    SearchMemosTool,
    UpdateMemoTool
} from "./tools/index.js";

export function createServer(): Server {
    const server = new Server(
        { name: "memolink-mcp", version: "1.0.0" },
        { capabilities: { tools: {} } }
    );

    const registry = new ToolRegistry();

    // Register all tools centrally
    const tools = [
        new CreateMemoTool(),
        new SearchMemosTool(),
        new GetDailySummaryTool(),
        new ReadMemoTool(),
        new UpdateMemoTool(),
        new GetTagsTool(),
        new GetGoalsTool(),
        new CreateGoalTool()
    ];

    tools.forEach(t => registry.register(t));

    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return { tools: registry.getDefinitions() };
    });

    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;

        const tool = registry.getTool(name);
        if (!tool) {
            return {
                content: [{ type: "text", text: `Unknown tool: ${name}` }],
                isError: true,
            };
        }

        return await tool.execute(args);
    });

    return server;
}
