import { z } from "zod";
import { BaseTool } from "../../core/base-tool.js";

export class GetDailySummaryTool extends BaseTool<any> {
    name = "get_daily_summary";
    description = "Retrieves the user's journal entries from a specific day to provide context about their current state or activities.";

    schema = z.object({
        date: z.string().optional().describe("ISO Date string for the summary. Defaults to today."),
    });

    protected async run(args: any) {
        const targetDate = args.date ? new Date(args.date) : new Date();
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const response = await this.apiClient.get("/entries", {
            dateFrom: targetDate.toISOString(),
            dateTo: nextDay.toISOString()
        });

        return response.data?.items || response.data || response;
    }
}
