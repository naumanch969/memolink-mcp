export interface ProviderConfig {
    name: string; // The visible name of the provider (e.g., 'claude', 'cursor', 'antigravity')
    description: string;
    setup(apiKey: string): Promise<void>;
}
