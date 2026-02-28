import { z } from "zod";
import { memolinkApi } from "../../api/memolink-client.js";
import { BaseTool } from "../../core/base-tool.js";

export class SearchMemosTool extends BaseTool<any> {
    name = "search_memos";
    description = "Searches past memos and journal entries to retrieve context about the user. Very useful for fetching previous reflections, facts, or projects.";

    schema = z.object({
        q: z.string().optional().describe("Search query string."),
        tags: z.array(z.string()).optional().describe("Filter by specific tags."),
        mode: z.enum(['instant', 'deep', 'hybrid']).optional().describe("Search mode. Deep uses semantic search if available."),
    });

    protected async run(args: any) {
        const response = await memolinkApi.get("/entries/search", args);
        return response.data?.items || response.data || response;
    }
}
