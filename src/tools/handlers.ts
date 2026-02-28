import { memolinkApi } from "../api/client.js";
import { CreateGoalSchema, CreateMemoSchema, GetDailySummarySchema, GetGoalsSchema, GetTagsSchema, ReadMemoSchema, SearchMemosSchema, UpdateMemoSchema } from "./schemas.js"

export async function handleCreateMemo(args: any) {
    const parsed = CreateMemoSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for create_memo: ${parsed.error}`);

    const response = await memolinkApi.post("/entries", parsed.data);
    const id = response.data?.data?._id || response.data?._id || 'unknown';
    return { content: [{ type: "text", text: `Successfully created memo. ID: ${id}` }] };
}

export async function handleSearchMemos(args: any) {
    const parsed = SearchMemosSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for search_memos: ${parsed.error}`);

    const response = await memolinkApi.get("/entries/search", { params: parsed.data });
    const items = response.data?.data?.items || response.data?.data || response.data;
    return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
}

export async function handleGetDailySummary(args: any) {
    const parsed = GetDailySummarySchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for get_daily_summary: ${parsed.error}`);

    const targetDate = parsed.data.date ? new Date(parsed.data.date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const response = await memolinkApi.get("/entries/search", {
        params: { dateFrom: targetDate.toISOString(), dateTo: nextDay.toISOString() }
    });

    const items = response.data?.data?.items || response.data?.data || response.data;
    return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
}

export async function handleReadMemo(args: any) {
    const parsed = ReadMemoSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for read_memo: ${parsed.error}`);

    const response = await memolinkApi.get(`/entries/${parsed.data.id}`);
    const item = response.data?.data || response.data;
    return { content: [{ type: "text", text: JSON.stringify(item, null, 2) }] };
}

export async function handleUpdateMemo(args: any) {
    const parsed = UpdateMemoSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for update_memo: ${parsed.error}`);

    const { id, ...updateData } = parsed.data;
    const response = await memolinkApi.put(`/entries/${id}`, updateData);
    const item = response.data?.data || response.data;
    return { content: [{ type: "text", text: `Successfully updated memo ${id}` }] };
}

export async function handleGetTags(args: any) {
    const parsed = GetTagsSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for get_user_tags: ${parsed.error}`);

    const response = await memolinkApi.get("/tags");
    const items = response.data?.data || response.data;
    return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
}

export async function handleGetGoals(args: any) {
    const parsed = GetGoalsSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for get_goals: ${parsed.error}`);

    const response = await memolinkApi.get("/goals", { params: parsed.data });
    const items = response.data?.data?.items || response.data?.data || response.data;
    return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
}

export async function handleCreateGoal(args: any) {
    const parsed = CreateGoalSchema.safeParse(args);
    if (!parsed.success) throw new Error(`Invalid arguments for create_goal: ${parsed.error}`);

    const response = await memolinkApi.post("/goals", parsed.data);
    const id = response.data?.data?._id || response.data?._id || 'unknown';
    return { content: [{ type: "text", text: `Successfully created goal. ID: ${id}` }] };
}
