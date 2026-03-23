import { ProviderConfig } from '../provider.interface.js';

export const windsurfProvider: ProviderConfig = {
    name: 'windsurf',
    description: 'Provides instructions for using Memolink with Windsurf IDE.',
    async setup(apiKey: string) {
        console.error(`✅ Ready to connect Memolink to Windsurf!`);
        console.error(`Windsurf handles MCP servers via its central configuration or UI.\n`);

        console.error(`1. Open Windsurf Settings`);
        console.error(`2. Navigate to AI > Context > Custom Tools / MCP`);
        console.error(`3. Add a new MCP server`);
        console.error(`4. Command: "npx", Args: ["-y", "memolink-mcp"]`);
        console.error(`5. Provide environment variables:`);
        console.error(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.error(`   - MEMOLINK_API_URL : https://memolink.opstintechnologies.com/api\n`);
        console.error(`Click "Add/Save" to test the connection.`);
    }
};
