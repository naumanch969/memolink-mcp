import { ProviderConfig } from '../provider.interface.js';

export const geminiProvider: ProviderConfig = {
    name: 'gemini',
    description: 'Provides instructions for using Memolink with Google Gemini Advanced (if applicable) or Gemini API integrations.',
    async setup(apiKey: string) {
        console.error(`✅ Ready to connect Memolink to Gemini!`);
        console.error(`Gemini natively supports MCP in custom environments or vertex setups.\n`);

        console.error(`When defining your tools or using a Google-compatible MCP adapter, provide these variables to the runtime:`);
        console.error(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.error(`   - MEMOLINK_API_URL : https://memolink.opstintechnologies.com/api\n`);
        console.error(`Command to run the server:`);
        console.error(`npx -y memolink-mcp`);
    }
};
