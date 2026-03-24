import { ProviderConfig } from '../provider.interface.js';
import { MEMOLINK_API_URL } from '../../core/constants.js';

export const cursorProvider: ProviderConfig = {
    name: 'cursor',
    description: 'Provides instructions for using Memolink with Cursor IDE.',
    async setup(apiKey: string) {
        console.error(`✅ Ready to connect Memolink to Cursor!`);
        console.error(`Cursor manages MCP servers via its settings interface.\n`);

        console.error(`1. Open Cursor Settings`);
        console.error(`2. Navigate to "General" > "MCP Server"`);
        console.error(`3. Click "+ Add New MCP Server"`);
        console.error(`4. Fill in the following:`);
        console.error(`   - Name: "memolink"`);
        console.error(`   - Type: "command"`);
        console.error(`   - Command: "npx"`);
        console.error(`7. Args: "-y memolink-mcp"`);
        console.error(`8. Under Env vars, add:`);
        console.error(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.error(`   - MEMOLINK_API_URL : ${MEMOLINK_API_URL}\n`);
        console.error(`9. Click "Save" and you're good to go!`);
    }
};
