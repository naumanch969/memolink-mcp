export class MemolinkClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey?: string, apiUrl?: string) {
        // Workers don't have process.env globally, they use bindings
        // But for local CLI it might still use it
        const API_KEY = apiKey || (typeof process !== 'undefined' ? process.env.MEMOLINK_API_KEY : '');
        const API_URL = apiUrl || (typeof process !== 'undefined' ? process.env.MEMOLINK_API_URL : "http://localhost:5001/api");

        if (!API_KEY && typeof process !== 'undefined' && process.argv && process.argv[2] !== "setup") {
            console.error("MEMOLINK_API_KEY is required.");
        }

        this.apiKey = API_KEY || '';
        this.baseUrl = API_URL || '';
    }

    private async request<T = any>(path: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
        const headers = {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            ...(options.headers || {})
        };

        const response = await fetch(url, {
            ...options,
            headers
        });

        if (!response.ok) {
            const error = await response.text().catch(() => 'Unknown error');
            throw new Error(`API Error: ${response.status} - ${error}`);
        }

        // Return empty object for empty responses (like 204 No Content)
        if (response.status === 204) {
             return {} as T;
        }

        return await response.json() as T;
    }

    async get<T = any>(path: string, params?: any): Promise<T> {
        let urlPath = path;
        if (params) {
            const query = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined) query.append(key, String(value));
            });
            urlPath += `?${query.toString()}`;
        }
        return this.request<T>(urlPath, { method: 'GET' });
    }

    async post<T = any>(path: string, data?: any): Promise<T> {
        return this.request<T>(path, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put<T = any>(path: string, data?: any): Promise<T> {
        return this.request<T>(path, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete<T = any>(path: string): Promise<T> {
        return this.request<T>(path, { method: 'DELETE' });
    }
}
