import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';

const CLAUDE_CONFIG_PATHS = {
    darwin: path.join(os.homedir(), "Library/Application Support/Claude/claude_desktop_config.json"),
    win32: path.join(process.env.APPDATA || "", "Claude/claude_desktop_config.json"),
    linux: path.join(os.homedir(), ".config/Claude/claude_desktop_config.json"),
};

export const claudeProvider: ProviderConfig = {
    name: 'claude',
    description: 'Installs Memolink as an MCP tool inside the Claude Desktop app.',
    async setup(apiKey: string) {
        const platform = os.platform() as keyof typeof CLAUDE_CONFIG_PATHS;
        const configPath = CLAUDE_CONFIG_PATHS[platform];

        if (!configPath) {
            console.error(`Auto-setup is not currently supported on ${platform}.`);
            console.error(`Please manually configure Claude Desktop with this API Key.`);
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
            // Create directory recursively
            fs.mkdirSync(path.dirname(configPath), { recursive: true });
        }

        // Apply configuration payload
        config.mcpServers.memolink = {
            command: "npx",
            args: ["-y", "memolink-mcp"],
            env: {
                MEMOLINK_API_KEY: apiKey,
                MEMOLINK_API_URL: "https://memolink.opstintechnologies.com/api"
            }
        };

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

        console.log(`✅ Successfully connected Memolink to Claude Desktop!`);
        console.log(`📂 Config updated at: ${configPath}`);
        console.log(`\n🔄 Please RESTART Claude Desktop to activate your AI memory layer.`);
    }
};
