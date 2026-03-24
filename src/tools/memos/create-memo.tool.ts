import { z } from "zod";
import { BaseTool } from "../../core/base-tool.js";

export class CreateMemoTool extends BaseTool<any> {
    name = "create_memo";
    description = "Creates a new personalized journal entry or memo in Memolink. Always use this to save facts, reflections, or context about the user's life.";
    readOnlyHint = false;
    destructiveHint = false;

    schema = z.object({
        content: z.string().describe("The content of the journal entry or memo."),
        isPrivate: z.boolean().optional().describe("Whether the memo is private."),
        isImportant: z.boolean().optional().describe("Whether the memo is important."),
        isFavorite: z.boolean().optional().describe("Whether the memo is favorited."),
        mood: z.string().optional().describe("A word or short phrase describing the mood (e.g., happy, anxious)."),
        tags: z.array(z.string()).optional().describe("Array of tags for categorization (e.g., ['launch', 'anxiety'])."),
    });

    protected async run(args: any) {
        const response = await this.apiClient.post("/capture/entry", args);
        const id = response.data?._id || response._id || 'unknown';
        return `Successfully created memo. ID: ${id}`;
    }
}

