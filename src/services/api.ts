import axios from "axios";
import { Wallet, Transaction } from "../types";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
        config.headers["Authorization"] = `Bearer ${apiKey}`;
    }
    return config;
});

export const generateApiKey = (): Promise<{ data: { apiKey: string } }> => API.post("/generate-api-key");
export const createWallet = (): Promise<{ data: Wallet }> => API.post("/create-wallet");
export const getTransactions = (address: string): Promise<{ data: Transaction[] }> =>
    API.get(`/transactions?address=${address}`);
export const withdraw = (data: { toAddress: string; amount: number }): Promise<{ data: { txId: string } }> =>
    API.post("/withdraw", data);

export default API;
