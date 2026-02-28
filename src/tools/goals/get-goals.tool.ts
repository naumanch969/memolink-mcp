import { z } from "zod";
import { memolinkApi } from "../../api/memolink-client.js";
import { BaseTool } from "../../core/base-tool.js";

export class GetGoalsTool extends BaseTool<any> {
    name = "get_goals";
    description = "Fetches current, active, completed, or archived goals the user is working towards in their life or projects.";

    schema = z.object({
        status: z.enum(['active', 'completed', 'failed', 'archived', 'all']).optional().describe("Filter goals by status. Defaults to active."),
    });

    protected async run(args: any) {
        const response = await memolinkApi.get("/goals", args);
        return response.data?.items || response.data || response;
    }
}
