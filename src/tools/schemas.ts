import { z } from "zod";

export const CreateMemoSchema = z.object({
    content: z.string().describe("The content of the journal entry or memo."),
    isPrivate: z.boolean().optional().describe("Whether the memo is private."),
    isImportant: z.boolean().optional().describe("Whether the memo is important."),
    isFavorite: z.boolean().optional().describe("Whether the memo is favorited."),
    mood: z.string().optional().describe("A word or short phrase describing the mood (e.g., happy, anxious)."),
    tags: z.array(z.string()).optional().describe("Array of tags for categorization (e.g., ['launch', 'anxiety'])."),
});

export const SearchMemosSchema = z.object({
    q: z.string().optional().describe("Search query string."),
    tags: z.array(z.string()).optional().describe("Filter by specific tags."),
    mode: z.enum(['instant', 'deep', 'hybrid']).optional().describe("Search mode. Deep uses semantic search if available."),
});

export const GetDailySummarySchema = z.object({
    date: z.string().optional().describe("ISO Date string for the summary. Defaults to today."),
});

export const ReadMemoSchema = z.object({
    id: z.string().describe("The exact ID of the memo to read."),
});

export const UpdateMemoSchema = z.object({
    id: z.string().describe("The ID of the memo to update."),
    content: z.string().optional().describe("Updated content of the memo."),
    tags: z.array(z.string()).optional().describe("Updated tags."),
    mood: z.string().optional().describe("Updated mood."),
    isPrivate: z.boolean().optional(),
    isImportant: z.boolean().optional(),
    isFavorite: z.boolean().optional(),
});

export const GetTagsSchema = z.object({});

export const GetGoalsSchema = z.object({
    status: z.enum(['active', 'completed', 'failed', 'archived', 'all']).optional().describe("Filter goals by status. Defaults to active."),
});

export const CreateGoalSchema = z.object({
    title: z.string().describe("The title of the goal."),
    description: z.string().optional().describe("A detailed description of the goal."),
    why: z.string().optional().describe("The motivation or reason behind the goal."),
    period: z.enum(['weekly', 'monthly', 'yearly', 'indefinite']).optional().describe("The timeframe of the goal."),
    priority: z.enum(['low', 'medium', 'high']).optional().describe("The priority level."),
    tags: z.array(z.string()).optional().describe("Tags associated with the goal."),
    deadline: z.string().optional().describe("ISO date string for when the goal should be completed."),
});
