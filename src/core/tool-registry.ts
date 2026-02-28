import type { Tool } from "@modelcontextprotocol/sdk/types.js";
import { ITool } from "./base-tool.js";

export class ToolRegistry {
    private tools: Map<string, ITool> = new Map();

    register(tool: ITool) {
        this.tools.set(tool.definition.name, tool);
    }

    getDefinitions(): Tool[] {
        return Array.from(this.tools.values()).map(tool => tool.definition);
    }

    getTool(name: string): ITool | undefined {
        return this.tools.get(name);
    }
}
