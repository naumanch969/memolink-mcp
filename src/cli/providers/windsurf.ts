import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';
import { getMemolinkMcpConfig } from '../../core/constants.js';
import { updateMcpConfig } from '../setup-helper.js';

const WINDSURF_CONFIG_PATHS = {
    darwin: path.join(os.homedir(), ".codeium/windsurf/mcp_config.json"),
    win32: path.join(os.homedir(), ".codeium/windsurf/mcp_config.json"),
    linux: path.join(os.homedir(), ".codeium/windsurf/mcp_config.json")
};

export const windsurfProvider: ProviderConfig = {
    name: 'windsurf',
    description: 'Installs Memolink inside Windsurf IDE via its config file.',
    async setup(apiKey: string) {
        const platform = os.platform() as 'darwin' | 'win32' | 'linux';
        const configPath = WINDSURF_CONFIG_PATHS[platform];

        console.error(`✅ Ready to connect Memolink to Windsurf!`);

        updateMcpConfig(configPath, 'memolink', getMemolinkMcpConfig(apiKey));

        console.error(`✅ Successfully connected Memolink to Windsurf!`);
        console.error(`📂 Config updated at: ${configPath}`);
    }
};
