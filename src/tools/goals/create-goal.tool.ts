import { z } from "zod";
import { BaseTool } from "../../core/base-tool.js";

export class CreateGoalTool extends BaseTool<any> {
    name = "create_goal";
    description = "Creates a new goal for the user to track in Memolink.";
    readOnlyHint = false;
    destructiveHint = false;

    schema = z.object({
        title: z.string().describe("The title of the goal."),
        description: z.string().optional().describe("A detailed description of the goal."),
        why: z.string().optional().describe("The motivation or reason behind the goal."),
        period: z.enum(['weekly', 'monthly', 'yearly', 'indefinite']).optional().describe("The timeframe of the goal."),
        priority: z.enum(['low', 'medium', 'high']).optional().describe("The priority level."),
        tags: z.array(z.string()).optional().describe("Tags associated with the goal."),
        deadline: z.string().optional().describe("ISO date string for when the goal should be completed."),
    });

    protected async run(args: any) {
        const response = await this.apiClient.post("/goals", args);
        const id = response.data?._id || response._id || 'unknown';
        return `Successfully created goal. ID: ${id}`;
    }
}
