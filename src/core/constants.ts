export const BRINN_API_URL = "https://api.brinn.app/api";
export const BRINN_NPX_COMMAND = "npx";
export const BRINN_NPX_ARGS = ["-y", "brinn-mcp"];

export const getBrinnMcpConfig = (apiKey: string) => ({
    command: BRINN_NPX_COMMAND,
    args: BRINN_NPX_ARGS,
    env: {
        BRINN_API_KEY: apiKey,
        BRINN_API_URL: BRINN_API_URL
    }
});
