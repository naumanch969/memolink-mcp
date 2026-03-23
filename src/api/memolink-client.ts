import axios, { AxiosInstance } from "axios";

export class MemolinkClient {
    private api: AxiosInstance;

    constructor() {
        const API_URL = process.env.MEMOLINK_API_URL || "http://localhost:5001/api";
        const API_KEY = process.env.MEMOLINK_API_KEY;

        if (!API_KEY && process.argv[2] !== "setup") {
            console.error("MEMOLINK_API_KEY environment variable is required.");
            process.exit(1);
        }

        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        });
    }

    async get<T = any>(path: string, params?: any): Promise<T> {
        const response = await this.api.get(path, { params });
        return response.data;
    }

    async post<T = any>(path: string, data?: any): Promise<T> {
        const response = await this.api.post(path, data);
        return response.data;
    }

    async put<T = any>(path: string, data?: any): Promise<T> {
        const response = await this.api.put(path, data);
        return response.data;
    }

    async delete<T = any>(path: string): Promise<T> {
        const response = await this.api.delete(path);
        return response.data;
    }
}

export const memolinkApi = new MemolinkClient();
