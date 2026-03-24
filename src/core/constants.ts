export const MEMOLINK_API_URL = "https://api.memo.opstintechnologies.com/api";
export const MEMOLINK_NPX_COMMAND = "npx";
export const MEMOLINK_NPX_ARGS = ["-y", "memolink-mcp"];

export const getMemolinkMcpConfig = (apiKey: string) => ({
    command: MEMOLINK_NPX_COMMAND,
    args: MEMOLINK_NPX_ARGS,
    env: {
        MEMOLINK_API_KEY: apiKey,
        MEMOLINK_API_URL: MEMOLINK_API_URL
    }
});
