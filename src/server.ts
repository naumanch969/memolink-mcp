import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { ToolRegistry } from "./core/tool-registry.js";
import { BrinnClient } from "./api/brinn-client.js";
import { CreateGoalTool, CreateMemoTool, GetDailySummaryTool, GetGoalsTool, GetTagsTool, ReadMemoTool, SearchMemosTool, UpdateMemoTool, ListMemosTool, DeleteMemoTool } from "./tools/index.js";


export function createServer(apiClient: BrinnClient = new BrinnClient()): Server {
    const server = new Server(
        { name: "brinn-mcp", version: "1.0.0" },
        { capabilities: { tools: {} } }
    );

    const registry = new ToolRegistry();

    // Register all tools centrally
    const tools = [
        new CreateMemoTool(apiClient),
        new SearchMemosTool(apiClient),
        new GetDailySummaryTool(apiClient),
        new ReadMemoTool(apiClient),
        new UpdateMemoTool(apiClient),
        new GetTagsTool(apiClient),
        new GetGoalsTool(apiClient),
        new CreateGoalTool(apiClient),
        new ListMemosTool(apiClient),
        new DeleteMemoTool(apiClient)
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

