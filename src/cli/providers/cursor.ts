import { ProviderConfig } from '../provider.interface.js';

export const cursorProvider: ProviderConfig = {
    name: 'cursor',
    description: 'Provides instructions for using Memolink with Cursor IDE.',
    async setup(apiKey: string) {
        console.error(`Ready to connect Memolink to Cursor!`);
        console.error(`Cursor currently requires manual entry of MCP servers through its UI.\n`);

        console.error(`1. Open Cursor Settings (Cmd/Ctrl + , or Top Right Gear Icon)`);
        console.error(`2. Go to "Features" > "MCP Servers"`);
        console.error(`3. Click "+ Add new MCP server"`);
        console.error(`4. Set Type to "command"`);
        console.error(`5. Name: "memolink"`);
        console.error(`6. Command: "npx"`);
        console.error(`7. Args: "-y memolink-mcp"`);
        console.error(`8. Under Env vars, add:`);
        console.error(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.error(`   - MEMOLINK_API_URL : https://memolink.opstintechnologies.com/api\n`);
        console.error(`9. Click "Save" and you're good to go!`);
    }
};
