import { ProviderConfig } from '../provider.interface.js';
import { BRINN_API_URL } from '../../core/constants.js';

export const geminiProvider: ProviderConfig = {
    name: 'gemini',
    description: 'Provides instructions for using Brinn with Google Gemini Advanced (if applicable) or Gemini API integrations.',
    async setup(apiKey: string) {
        console.error(`✅ Ready to connect Brinn to Gemini!`);
        console.error(`Gemini natively supports MCP in custom environments or vertex setups.\n`);

        console.error(`When defining your tools or using a Google-compatible MCP adapter, provide these variables to the runtime:`);
        console.error(`   - BRINN_API_KEY : ${apiKey}`);
        console.error(`   - BRINN_API_URL : ${BRINN_API_URL}\n`);
        console.error(`Command to run the server:`);
        console.error(`npx -y brinn-mcp`);
    }
};
