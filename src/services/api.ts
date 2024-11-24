import axios from "axios";
import { Wallet, Transaction } from "../types";

const API = axios.create({
    baseURL: "http://188.245.59.58:8000/api",
});

API.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
        config.headers["Authorization"] = `Bearer ${apiKey}`;
    }
    return config;
});

export const generateApiKey = (): Promise<{ data: { data: { apiKey: string } } }> => API.post("/generate-api-key");
export const createWallet = (): Promise<{ data: Wallet }> => API.post("/create-wallet");
export const getTransactions = (): Promise<{ data: { data: Transaction[] } }> => API.get(`/transactions`);
export const withdraw = (data: { toAddress: string; amount: number }): Promise<{ data: { txId: string } }> =>
    API.post("/withdraw", data);
export const getWallets = (): Promise<{ data: { data: Wallet[] } }> => API.get("/wallets");
export const getUser = (): Promise<{ data: { data: { usdtBalance: string } } }> => API.get("/user");
export default API;
