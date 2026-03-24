import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';
import { getMemolinkMcpConfig } from '../../core/constants.js';
import { updateMcpConfig } from '../setup-helper.js';

const ROO_MCP_CONFIGS = [
    {
        name: 'Roo Code',
        paths: {
            darwin: path.join(os.homedir(), "Library/Application Support/Code/User/globalStorage/roovet.roo-code/settings/roo_mcp_settings.json"),
            win32: path.join(process.env.APPDATA || "", "Code/User/globalStorage/roovet.roo-code/settings/roo_mcp_settings.json"),
            linux: path.join(os.homedir(), ".config/Code/User/globalStorage/roovet.roo-code/settings/roo_mcp_settings.json")
        }
    },
    {
        name: 'Cline',
        paths: {
            darwin: path.join(os.homedir(), "Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json"),
            win32: path.join(process.env.APPDATA || "", "Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json"),
            linux: path.join(os.homedir(), ".config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json")
        }
    }
];

export const vscodeRooProvider: ProviderConfig = {
    name: 'roo',
    description: 'Installs Memolink inside Roo Code / Cline extensions in VS Code.',
    async setup(apiKey: string) {
        const platform = os.platform() as 'darwin' | 'win32' | 'linux';
        let configPath = '';
        let foundApp = '';

        for (const config of ROO_MCP_CONFIGS) {
            const p = config.paths[platform];
            if (p && fs.existsSync(p)) {
                configPath = p;
                foundApp = config.name;
                break;
            }
        }

        // Default to Roo Code path for creation if neither exists
        if (!configPath) {
            configPath = ROO_MCP_CONFIGS[0].paths[platform];
            foundApp = ROO_MCP_CONFIGS[0].name;
        }

        updateMcpConfig(configPath, 'memolink', getMemolinkMcpConfig(apiKey));

        console.error(`✅ Successfully connected Memolink to VS Code (${foundApp})!`);
        console.error(`📂 Config updated at: ${configPath}`);
        console.error(`\n🔄 Restart your VS Code window to apply the MCP extension.`);
    }
};
