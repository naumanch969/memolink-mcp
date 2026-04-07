import * as os from 'os';
import * as path from 'path';
import { ProviderConfig } from '../provider.interface.js';
import { getBrinnMcpConfig } from '../../core/constants.js';
import { updateMcpConfig } from '../setup-helper.js';

const WINDSURF_CONFIG_PATHS = {
    darwin: path.join(os.homedir(), ".codeium/windsurf/mcp_config.json"),
    win32: path.join(os.homedir(), ".codeium/windsurf/mcp_config.json"),
    linux: path.join(os.homedir(), ".codeium/windsurf/mcp_config.json")
};

export const windsurfProvider: ProviderConfig = {
    name: 'windsurf',
    description: 'Installs Brinn inside Windsurf IDE via its config file.',
    async setup(apiKey: string) {
        const platform = os.platform() as 'darwin' | 'win32' | 'linux';
        const configPath = WINDSURF_CONFIG_PATHS[platform];

        console.error(`✅ Ready to connect Brinn to Windsurf!`);

        updateMcpConfig(configPath, 'brinn', getBrinnMcpConfig(apiKey));

        console.error(`✅ Successfully connected Brinn to Windsurf!`);
        console.error(`📂 Config updated at: ${configPath}`);
    }
};
