import { ProviderConfig } from '../provider.interface.js';

export const geminiProvider: ProviderConfig = {
    name: 'gemini',
    description: 'Provides instructions for using Memolink with Google Gemini Advanced (if applicable) or Gemini API integrations.',
    async setup(apiKey: string) {
        console.log(`✅ Ready to connect Memolink to Gemini!`);
        console.log(`Gemini natively supports MCP in custom environments or vertex setups.\n`);

        console.log(`When defining your tools or using a Google-compatible MCP adapter, provide these variables to the runtime:`);
        console.log(`   - MEMOLINK_API_KEY : ${apiKey}`);
        console.log(`   - MEMOLINK_API_URL : https://memolink.opstintechnologies.com/api\n`);
        console.log(`Command to run the server:`);
        console.log(`npx -y memolink-mcp`);
    }
};
