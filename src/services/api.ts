/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Cria uma instancia do axios já com uma configuração padrão
export const api = axios.create({
  baseURL: "https://192.168.1.2:8001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

type FailedQueue = {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

const processQueue = (error = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

// interceptor de response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorizedError = error.response?.status === 401;
    const isExpiredToken = error.response?.data?.code === "TOKEN_EXPIRED";
    const isTryingRefreshAgain = originalRequest._retry === true;

    if (!isUnauthorizedError) return Promise.reject(error);

    if (!isExpiredToken) return Promise.reject(error);

    if (isTryingRefreshAgain) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    console.log("Token expirado. Tentando fazer refresh...");

    if (isRefreshing) {
      return new Promise((resolve, reject) =>
        failedQueue.push({ resolve, reject }),
      )
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      console.log("\n=== DEBUG ===");
      console.log("Chamando refresh...");
      await api.post("/login/refresh");

      console.log("\n=== DEBUG ===");
      console.log("Token renovado com sucesso.");

      processQueue();

      return api(originalRequest);
    } catch (err) {
      console.log("\n=== DEBUG ===");
      console.log("Falha no refresh: ", err);

      processQueue(err as null);

      window.location.href = "/login";

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
