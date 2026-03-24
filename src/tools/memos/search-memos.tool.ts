import { z } from "zod";
import { BaseTool } from "../../core/base-tool.js";

export class SearchMemosTool extends BaseTool<any> {
    name = "search_memos";
    description = "Searches through the user's previously created memos using keywords or date ranges. Essential for recalling context or past thoughts.";
    readOnlyHint = true;
    destructiveHint = false;

    schema = z.object({
        q: z.string().optional().describe("Search query string."),
        tags: z.array(z.string()).optional().describe("Filter by specific tags."),
        mode: z.enum(['instant', 'deep', 'hybrid']).optional().describe("Search mode. Deep uses semantic search if available."),
    });

    protected async run(args: any) {
        const response = await this.apiClient.get("/entries", args);
        return response.data?.items || response.data || response;
    }
}

