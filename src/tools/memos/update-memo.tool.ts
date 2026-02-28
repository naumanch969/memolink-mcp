import { z } from "zod";
import { memolinkApi } from "../../api/memolink-client.js";
import { BaseTool } from "../../core/base-tool.js";

export class UpdateMemoTool extends BaseTool<any> {
    name = "update_memo";
    description = "Update an existing memo. Use this to append or correct facts about the user for a memory you already know the ID of.";

    schema = z.object({
        id: z.string().describe("The ID of the memo to update."),
        content: z.string().optional().describe("Updated content of the memo."),
        tags: z.array(z.string()).optional().describe("Updated tags."),
        mood: z.string().optional().describe("Updated mood."),
        isPrivate: z.boolean().optional(),
        isImportant: z.boolean().optional(),
        isFavorite: z.boolean().optional(),
    });

    protected async run(args: any) {
        const { id, ...updateData } = args;
        await memolinkApi.put(`/entries/${id}`, updateData);
        return `Successfully updated memo ${id}`;
    }
}
