import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export interface ITool {
    readonly definition: Tool;
    execute(args: any): Promise<{ content: Array<{ type: string; text: string }>, isError?: boolean }>;
}

import { BrinnClient } from "../api/brinn-client.js";

export abstract class BaseTool<T> implements ITool {
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly schema: z.ZodType<any, any, any>;

    // Safety annotations for Anthropic compliance
    readonly readOnlyHint: boolean = false;
    readonly destructiveHint: boolean = false;

    constructor(protected readonly apiClient: BrinnClient) { }


    get definition(): Tool {
        const jsonSchema = zodToJsonSchema(this.schema as any) as any;
        return {
            name: this.name,
            description: this.description,
            inputSchema: {
                type: "object",
                properties: jsonSchema.properties || {},
                required: jsonSchema.required || [],
            },
            // @ts-ignore - Support Anthropic safety extensions
            readOnlyHint: this.readOnlyHint,
            // @ts-ignore
            destructiveHint: this.destructiveHint
        };
    }

    protected abstract run(args: T): Promise<any>;

    async execute(rawArgs: any) {
        try {
            const parsed = this.schema.safeParse(rawArgs);
            if (!parsed.success) {
                throw new Error(`Invalid arguments for ${this.name}: ${parsed.error.message}`);
            }

            const result = await this.run(parsed.data as T);
            const text = typeof result === "string" ? result : JSON.stringify(result, null, 2);

            return {
                content: [{ type: "text", text }],
            };
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message;
            return {
                content: [{ type: "text", text: `Error executing ${this.name}: ${errorMessage}` }],
                isError: true,
            };
        }
    }
}
