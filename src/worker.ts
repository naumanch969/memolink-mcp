import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { streamSSE } from 'hono/streaming';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { 
    JSONRPCMessage,
} from "@modelcontextprotocol/sdk/types.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { createServer } from "./server.js";
import { MemolinkClient } from "./api/memolink-client.js";

type Bindings = {
  MEMOLINK_API_URL: string;
}

/**
 * Custom MCP Transport for Cloudflare Workers SSE via Hono
 */
class WorkerSSEServerTransport implements Transport {
    public sessionId: string;
    private stream: any; 
    private baseUrl: string;

    onmessage?: (message: JSONRPCMessage) => void;
    onclose?: () => void;
    onerror?: (error: Error) => void;

    constructor(sessionId: string, stream: any, baseUrl: string) {
        this.sessionId = sessionId;
        this.stream = stream;
        this.baseUrl = baseUrl;
    }

    async start(): Promise<void> {
        await this.stream.writeSSE({
            event: 'endpoint',
            data: `${this.baseUrl}/mcp/messages?sessionId=${this.sessionId}`,
        });
    }


    async send(message: JSONRPCMessage): Promise<void> {
        await this.stream.writeSSE({
            event: 'message',
            data: JSON.stringify(message),
        });
    }

    async handlePostMessage(message: JSONRPCMessage): Promise<void> {
        if (this.onmessage) {
            this.onmessage(message);
        }
    }

    async close(): Promise<void> {
        if (this.onclose) {
            this.onclose();
        }
    }
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-MCP-Protocol-Version'],
  exposeHeaders: ['Content-Type', 'X-MCP-Protocol-Version'],
  maxAge: 86400,
}));

const sessions = new Map<string, { server: Server, transport: WorkerSSEServerTransport }>();

app.get('/mcp/sse', async (c) => {
  const authHeader = c.req.header('Authorization');
  const apiKey = authHeader?.replace('Bearer ', '') || c.req.query('apiKey');

  if (!apiKey) {
    return c.json({ error: 'API Key required.' }, 401);
  }

  const sessionId = crypto.randomUUID();
  const apiClient = new MemolinkClient(apiKey, c.env.MEMOLINK_API_URL);
  const server = createServer(apiClient);

  return streamSSE(c, async (stream) => {
    const baseUrl = new URL(c.req.url).origin;
    const transport = new WorkerSSEServerTransport(sessionId, stream, baseUrl);
    
    sessions.set(sessionId, { server, transport });

    await server.connect(transport);

    stream.onAbort(() => {
        sessions.delete(sessionId);
        transport.close();
    });

    // Keep-alive loop
    while (sessions.has(sessionId)) {
        await stream.sleep(15000);
        if (!sessions.has(sessionId)) break;
        // Optionally send a keep-alive comment
        // SSE keep-alive with an empty data message
        await stream.writeSSE({ data: "" });
    }
  });
});

app.post('/mcp/messages', async (c) => {
  const sessionId = c.req.query('sessionId');
  const session = sessions.get(sessionId || '');

  if (!session) {
    return c.json({ error: 'Session not found' }, 404);
  }

  const message = await c.req.json();
  await session.transport.handlePostMessage(message);

  return c.text('OK');
});

export default app;
