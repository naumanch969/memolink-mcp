import { z } from "zod";
import { memolinkApi } from "../../api/client.js";
import { BaseTool } from "../../core/base-tool.js";

export class ListMemosTool extends BaseTool<any> {
    name = "list_memos";
    description = "List memos and research notes with pagination. " +
        "Call this when the user wants to browse their library of notes, or when " +
        "searching isn't yielding the desired specific result.";
    schema = z.object({
        page: z.number().optional().default(1).describe("The page number to retrieve."),
        limit: z.number().optional().default(10).describe("Number of memos per page."),
        sort: z.string().optional().default("-createdAt").describe("Sorting field and order."),
    });

    protected async run(args: { page: number; limit: number; sort: string }) {
        const response = await memolinkApi.get("/entries", { params: args });
        return response.data;
    }
}
