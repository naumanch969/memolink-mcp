import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';
import { getBrinnMcpConfig } from '../../core/constants.js';
import { updateMcpConfig } from '../setup-helper.js';

const CLAUDE_CONFIG_PATHS = {
    darwin: path.join(os.homedir(), "Library/Application Support/Claude/claude_desktop_config.json"),
    win32: path.join(process.env.APPDATA || "", "Claude/claude_desktop_config.json"),
    linux: path.join(os.homedir(), ".config/Claude/claude_desktop_config.json")
};

export const claudeProvider: ProviderConfig = {
    name: 'claude',
    description: 'Installs Brinn inside Claude Desktop (macOS/Windows/Linux).',
    async setup(apiKey: string) {
        const platform = os.platform() as keyof typeof CLAUDE_CONFIG_PATHS;
        const configPath = CLAUDE_CONFIG_PATHS[platform];

        if (!configPath) {
            console.error(`Auto-setup for Claude Desktop is not supported on ${platform}.`);
            process.exit(1);
        }

        updateMcpConfig(configPath, 'brinn', getBrinnMcpConfig(apiKey));

        console.error(`✅ Successfully connected Brinn to Claude Desktop!`);
        console.error(`📂 Config updated at: ${configPath}`);
        console.error(`\n🔄 Restart your Claude Desktop app to apply the new memory layer.`);
    }
};
