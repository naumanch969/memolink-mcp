import { ProviderConfig } from '../provider.interface.js';

export const windsurfProvider: ProviderConfig = {
    name: 'windsurf',
    description: 'Provides instructions for using Memolink with Windsurf IDE.',
    async setup(apiKey: string) {
        console.log(`✅ Ready to connect Memolink to Windsurf!`);
        console.log(`Windsurf handles MCP servers via its central configuration or UI.\n`);

        console.log(`1. Open Windsurf Settings`);
        console.log(`2. Navigate to AI > Context > Custom Tools / MCP`);
        console.log(`3. Add a new MCP server`);
        console.log(`4. Command: "npx", Args: ["-y", "memolink-mcp"]`);
        console.log(`5. Provide environment variables:`);
        console.log(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.log(`   - MEMOLINK_API_URL : https://memolink.opstintechnologies.com/api\n`);
        console.log(`Click "Add/Save" to test the connection.`);
    }
};
