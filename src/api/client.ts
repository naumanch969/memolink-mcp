import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.MEMOLINK_API_URL || "http://localhost:5000/api";
const API_KEY = process.env.MEMOLINK_API_KEY;

if (!API_KEY) {
    console.error("MEMOLINK_API_KEY environment variable is required.");
    process.exit(1);
}

export const memolinkApi = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
});
