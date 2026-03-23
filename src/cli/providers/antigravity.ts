import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';

const ANTIGRAVITY_CONFIG_PATHS = {
    darwin: path.join(os.homedir(), ".gemini/antigravity/mcp_config.json"),
    win32: path.join(os.homedir(), ".gemini/antigravity/mcp_config.json"),
    linux: path.join(os.homedir(), ".gemini/antigravity/mcp_config.json"),
};

export const antigravityProvider: ProviderConfig = {
    name: 'antigravity',
    description: 'Installs Memolink as an MCP tool inside Antigravity AI Assistant.',
    async setup(apiKey: string) {
        const platform = os.platform() as keyof typeof ANTIGRAVITY_CONFIG_PATHS;
        const configPath = ANTIGRAVITY_CONFIG_PATHS[platform] || ANTIGRAVITY_CONFIG_PATHS.darwin;

        let config: any = { mcpServers: {} };

        // Try reading existing config
        if (fs.existsSync(configPath)) {
            try {
                const raw = fs.readFileSync(configPath, 'utf8');
                config = JSON.parse(raw);
                if (!config.mcpServers) config.mcpServers = {};
            } catch (err) {
                console.error(`⚠️ Found existing Antigravity config but couldn't parse it: ${err}`);
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
                MEMOLINK_API_URL: "https://api.memo.opstintechnologies.com/api"
            }
        };

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

        console.log(`✅ Successfully connected Memolink to Antigravity!`);
        console.log(`📂 Config updated at: ${configPath}`);
        console.log(`\n🔄 Antigravity will automatically detect the new memory layer.`);
    }
};

