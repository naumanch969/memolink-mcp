#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleSetup } from "./cli/index.js";
import { createServer } from "./server.js";

async function main() {
    const args = process.argv.slice(2);

    // CLI Setup Mode Interface
    // Example: npx memolink-mcp setup claude mclk_SECRET
    if (args[0] === "setup") {
        await handleSetup(args.slice(1));
        return;
    }

    // Standard MCP Server operation mode over stdio (Triggered silently by the LLM client)
    const server = createServer();
    const transport = new StdioServerTransport();

    await server.connect(transport);
    console.error("🚀 Memolink MCP Server running and listening for AI tools on stdio...");
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
