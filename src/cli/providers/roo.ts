import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';

// Most IDEs configured via VS Code use settings.json, sometimes RooCode uses mcp settings config files
const CLINE_MCP_CONFIG = {
    darwin: path.join(os.homedir(), "Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json"),
    win32: path.join(process.env.APPDATA || "", "Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json"),
    linux: path.join(os.homedir(), ".config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json")
};

export const vscodeRooProvider: ProviderConfig = {
    name: 'roo',
    description: 'Installs Memolink inside Roo Code / Cline extensions in VS Code.',
    async setup(apiKey: string) {
        const platform = os.platform() as keyof typeof CLINE_MCP_CONFIG;
        const configPath = CLINE_MCP_CONFIG[platform];

        if (!configPath) {
            console.error(`Auto-setup for Roo Code is not supported on ${platform}.`);
            process.exit(1);
        }

        let config: any = { mcpServers: {} };

        if (fs.existsSync(configPath)) {
            try {
                const raw = fs.readFileSync(configPath, 'utf8');
                config = JSON.parse(raw);
                if (!config.mcpServers) config.mcpServers = {};
            } catch (err) {
                console.error(`⚠️ Found existing Roo Code config but couldn't parse it: ${err}`);
            }
        } else {
            console.error(`⚠️ Extension config path not found. Do you have Roo Code or Cline installed? Expected path: ${configPath}`);
            console.log("\nIf installed, please open its MCP console and add:")
            console.log(`Command: npx\nArgs: -y memolink-mcp\nEnv: MEMOLINK_API_KEY=${apiKey}\nMEMOLINK_API_URL=https://memolink.opstintechnologies.com/api`);
            process.exit(1);
        }

        config.mcpServers.memolink = {
            command: "npx",
            args: ["-y", "memolink-mcp"],
            env: {
                MEMOLINK_API_KEY: apiKey,
                MEMOLINK_API_URL: "https://memolink.opstintechnologies.com/api"
            }
        };

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

        console.log(`✅ Successfully connected Memolink to VS Code (Roo/Cline)!`);
        console.log(`📂 Config updated at: ${configPath}`);
        console.log(`\n🔄 Restart your VS Code window to apply the MCP extension.`);
    }
};
