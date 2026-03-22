# Memolink MCP Server 🚀

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that connects your AI assistants (Claude, Cursor, Windsurf, etc.) with your **Memolink** workspace. This integration allows AI agents to read, search, and manage your research notes, memos, and goals directly.

## ✨ Features

- 📝 **Memo Management**: Create, read, search, and update research notes.
- 📉 **Daily Summaries**: Get AI-generated summaries of your recent memos.
- 🏷️ **Tags & Goals**: Organize search and track your research progress.
- 🛠️ **Developer Friendly**: Built with TypeScript and the Model Context Protocol SDK.

## 🚀 Quick Setup

Connect Memolink to your favorite AI assistant in seconds using the built-in setup CLI:

```bash
npx memolink-mcp setup <provider> <MEMOLINK_API_KEY>
```

### Supported Providers:
- `claude` - Claude Desktop App
- `cursor` - Cursor Code Editor
- `windsurf` - Windsurf Editor
- `gemini` - Google Gemini / AI Studio
- `roo-cline` - VS Code Roo-Cline extension
- `antigravity` - Antigravity AI Assistant

> [!IMPORTANT]
> Your Memolink API Key must start with `mclk_`. You can find this in your Memolink settings.

## 🛠️ Available Tools

The following tools are exposed to your AI assistant:

| Tool | Description |
|------|-------------|
| `create_memo` | Create a new research note or personal memo. |
| `search_memos` | Search for existing memos using keywords or semantic search. |
| `get_daily_summary` | Retrieve a summary of memos created on a specific day. |
| `read_memo` | Get the full content and metadata of a specific memo. |
| `update_memo` | Modify the content, tags, or status of an existing memo. |
| `get_tags` | List all available organization tags. |
| `get_goals` | View your active research goals and progress. |
| `create_goal` | Define a new objective for your research. |

## ⚙️ Manual Configuration

If you prefer to configure your environment manually, ensure the following environment variables are set:

- `MEMOLINK_API_KEY`: Your private Memolink API Key.
- `MEMOLINK_API_URL`: (Optional) Defaults to `https://memolink.opstintechnologies.com/api`.

### Example for `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "memolink": {
      "command": "npx",
      "args": ["-y", "memolink-mcp"],
      "env": {
        "MEMOLINK_API_KEY": "mclk_your_secret_key",
        "MEMOLINK_API_URL": "https://memolink.opstintechnologies.com/api"
      }
    }
  }
}
```

## 👨‍💻 Development

### Build
```bash
npm install
npm run build
```

### Run Dev Server
```bash
npm run dev
```

---
Built with ❤️ by [Memolink Team](https://memolink.cloud)
