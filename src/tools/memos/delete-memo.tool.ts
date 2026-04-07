import { z } from "zod";
import { BaseTool } from "../../core/base-tool.js";

export class DeleteMemoTool extends BaseTool<any> {
    name = "delete_memo";
    description = "Permanently delete a memo from the Brinn workspace by its ID. " +
        "Call this ONLY when the user explicitly asks to remove, delete, or " +
        "destroy a specific item of information.";
    readOnlyHint = false;
    destructiveHint = true;

    schema = z.object({
        id: z.string().describe("The ID of the memo to delete."),
    });

    protected async run(args: { id: string }) {
        await this.apiClient.delete(`/entries/${args.id}`);
        return `Successfully deleted memo ${args.id}`;
    }
}

