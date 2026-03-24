import * as fs from 'fs';
import * as path from 'path';

export function updateMcpConfig(configPath: string, serverName: string, payload: any) {
    let config: any = { mcpServers: {} };

    if (fs.existsSync(configPath)) {
        try {
            const raw = fs.readFileSync(configPath, 'utf8');
            const parsed = JSON.parse(raw);
            config = { ...parsed };
            if (!config.mcpServers) config.mcpServers = {};
        } catch (err) {
            console.error(`⚠️ Found existing config at ${configPath} but couldn't parse it: ${err}`);
        }
    } else {
        const dir = path.dirname(configPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    config.mcpServers[serverName] = payload;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
}
