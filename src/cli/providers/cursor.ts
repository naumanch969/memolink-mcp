import { ProviderConfig } from '../provider.interface.js';

export const cursorProvider: ProviderConfig = {
    name: 'cursor',
    description: 'Provides instructions for using Memolink with Cursor IDE.',
    async setup(apiKey: string) {
        console.log(`Ready to connect Memolink to Cursor!`);
        console.log(`Cursor currently requires manual entry of MCP servers through its UI.\n`);

        console.log(`1. Open Cursor Settings (Cmd/Ctrl + , or Top Right Gear Icon)`);
        console.log(`2. Go to "Features" > "MCP Servers"`);
        console.log(`3. Click "+ Add new MCP server"`);
        console.log(`4. Set Type to "command"`);
        console.log(`5. Name: "memolink"`);
        console.log(`6. Command: "npx"`);
        console.log(`7. Args: "-y memolink-mcp"`);
        console.log(`8. Under Env vars, add:`);
        console.log(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.log(`   - MEMOLINK_API_URL : https://memolink.opstintechnologies.com/api\n`);
        console.log(`9. Click "Save" and you're good to go!`);
    }
};
