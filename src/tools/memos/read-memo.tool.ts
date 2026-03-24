import { z } from "zod";
import { BaseTool } from "../../core/base-tool.js";

export class ReadMemoTool extends BaseTool<any> {
    name = "read_memo";
    description = "Retrieve a specific memo or journal entry by its explicit ID to get its full context and details.";
    readOnlyHint = true;
    destructiveHint = false;

    schema = z.object({
        id: z.string().describe("The exact ID of the memo to read."),
    });

    protected async run(args: any) {
        const response = await this.apiClient.get(`/entries/${args.id}`);
        return response.data || response;
    }
}
