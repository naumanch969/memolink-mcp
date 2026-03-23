import { ProviderConfig } from './provider.interface.js';
import { antigravityProvider } from './providers/antigravity.js';
import { claudeProvider } from './providers/claude.js';
import { cursorProvider } from './providers/cursor.js';
import { geminiProvider } from './providers/gemini.js';
import { vscodeRooProvider } from './providers/roo.js';
import { windsurfProvider } from './providers/windsurf.js';

export const providers: Record<string, ProviderConfig> = {
    [claudeProvider.name]: claudeProvider,
    [vscodeRooProvider.name]: vscodeRooProvider,
    [cursorProvider.name]: cursorProvider,
    [geminiProvider.name]: geminiProvider,
    [antigravityProvider.name]: antigravityProvider,
    [windsurfProvider.name]: windsurfProvider
};

export async function handleSetup(args: string[]) {
    if (args.length < 2) {
        console.error('Please specify a provider and an API Key.');
        console.error('   Usage: npx memolink-mcp setup <provider> <API_KEY>');
        console.error('\nAvailable Providers:');
        Object.values(providers).forEach(p => console.error(` - ${p.name.padEnd(12)} : ${p.description}`));
        process.exit(1);
    }

    const providerName = args[0].toLowerCase();
    const apiKey = args[1];

    const provider = providers[providerName];

    if (!provider) {
        console.error(`Unknown provider: ${providerName}`);
        console.error('\nAvailable Providers:');
        Object.values(providers).forEach(p => console.error(` - ${p.name.padEnd(12)} : ${p.description}`));
        process.exit(1);
    }

    if (!apiKey || !apiKey.startsWith('mclk_')) {
        console.error('Invalid Memolink API Key. It must start with "mclk_" ');
        process.exit(1);
    }

    await provider.setup(apiKey);
}
