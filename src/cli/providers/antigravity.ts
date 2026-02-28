import { ProviderConfig } from '../provider.interface.js';

export const antigravityProvider: ProviderConfig = {
    name: 'antigravity',
    description: 'Provides instructions for using Memolink with Antigravity AI Assistant.',
    async setup(apiKey: string) {
        console.log(`✅ Ready to connect Memolink to Antigravity!`);
        console.log(`Antigravity supports dynamic tool integration.\n`);

        console.log(`If you are actively speaking with Antigravity, just paste this following context to it directly:\n`);
        console.log(`=========================`);
        console.log(`Hey Antigravity, connect to my Memolink MCP server!`);
        console.log(`Command: npx -y memolink-mcp`);
        console.log(`MEMOLINK_API_KEY=${apiKey}`);
        console.log(`MEMOLINK_API_URL=https://memolink.opstintechnologies.com/api`);
        console.log(`=========================\n`);
        console.log(`It'll know exactly what to do from there.`);
    }
};
