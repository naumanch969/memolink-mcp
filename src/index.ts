#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import os from "os";
import path from "path";
import { createServer } from "./server.js";

const CLAUDE_CONFIG_PATHS = {
    darwin: path.join(os.homedir(), "Library/Application Support/Claude/claude_desktop_config.json"),
    win32: path.join(process.env.APPDATA || "", "Claude/claude_desktop_config.json"),
    linux: path.join(os.homedir(), ".config/Claude/claude_desktop_config.json"),
};

async function setupClaude(apiKey: string) {
    const platform = os.platform() as keyof typeof CLAUDE_CONFIG_PATHS;
    const configPath = CLAUDE_CONFIG_PATHS[platform];

    if (!configPath) {
        console.error(`❌ Auto-setup is not currently supported on ${platform}.`);
        console.error(`Please manually add the connection block relying on this API Key.`);
        process.exit(1);
    }

    let config: any = { mcpServers: {} };

    // Try reading existing config
    if (fs.existsSync(configPath)) {
        try {
            const raw = fs.readFileSync(configPath, 'utf8');
            config = JSON.parse(raw);
            if (!config.mcpServers) config.mcpServers = {};
        } catch (err) {
            console.error(`⚠️ Found existing Claude config but couldn't parse it: ${err}`);
        }
    } else {
        // Create directory
        fs.mkdirSync(path.dirname(configPath), { recursive: true });
    }

    config.mcpServers.memolink = {
        command: "npx",
        args: ["-y", "memolink-mcp"],
        env: {
            MEMOLINK_API_KEY: apiKey,
            // Assuming default production backend URL
            MEMOLINK_API_URL: "https://memolink.opstintechnologies.com/api"
        }
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

    console.log(`✅ Successfully connected Memolink to Claude Desktop!`);
    console.log(`📂 Config updated at: ${configPath}`);
    console.log(`\nPlease RESTART Claude Desktop to activate your AI memory layer.`);
    process.exit(0);
}

async function main() {
    const args = process.argv.slice(2);

    // Effortless connector setup mode
    if (args[0] === "setup") {
        const apiKey = args[1];
        if (!apiKey || !apiKey.startsWith('mclk_')) {
            console.error('❌ Please provide a valid Memolink API Key. Example:');
            console.error('   npx memolink-mcp setup mclk_YOUR_KEY_HERE');
            process.exit(1);
        }
        await setupClaude(apiKey);
        return;
    }

    // Standard MCP Server operation mode over stdio
    const server = createServer();
    const transport = new StdioServerTransport();

    await server.connect(transport);
    console.error("🚀 Memolink MCP Server running and listening for AI tools on stdio...");
}

main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
