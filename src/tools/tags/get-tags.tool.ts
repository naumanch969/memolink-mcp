import { z } from "zod";
import { memolinkApi } from "../../api/memolink-client.js";
import { BaseTool } from "../../core/base-tool.js";

export class GetTagsTool extends BaseTool<any> {
    name = "get_user_tags";
    description = "Fetches all existing tags used by the user. Run this to know what categories already exist before saving new memos or goals.";

    schema = z.object({});

    protected async run() {
        const response = await memolinkApi.get("/tags");
        return response.data || response;
    }
}
