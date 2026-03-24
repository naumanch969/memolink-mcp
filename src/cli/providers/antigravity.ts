import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';
import { getMemolinkMcpConfig } from '../../core/constants.js';
import { updateMcpConfig } from '../setup-helper.js';

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

        updateMcpConfig(configPath, 'memolink', getMemolinkMcpConfig(apiKey));

        console.error(`✅ Successfully connected Memolink to Antigravity!`);
        console.error(`📂 Config updated at: ${configPath}`);
        console.error(`\n🔄 Antigravity will automatically detect the new memory layer.`);
    }
};
