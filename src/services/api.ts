/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

export const api = axios.create({
  baseURL: API_URL || DEV_API_URL,
  withCredentials: true, // ✅ ESSENCIAL - envia cookies em TODAS requisições
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

type FailedQueue = {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueue[] = [];

const processQueue = (error: Error | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se não for erro 401, rejeita direto
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Se já tentou refresh e falhou, vai pro login (mas não se já estiver na página de login)
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Verifica se é erro de token expirado (pode ter outras causas de 401)
    const isExpiredToken = error.response?.data?.code === "TOKEN_EXPIRED";

    // Se não for token expirado (ex: usuário não autenticado), vai pro login (mas não se já estiver na página de login)
    if (!isExpiredToken) {
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    // Se já está fazendo refresh, coloca na fila
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          console.log("✅ Requisição da fila processada");
          return api(originalRequest);
        })
        .catch((err) => {
          console.log("❌ Requisição da fila falhou");
          return Promise.reject(err);
        });
    }

    // Marca que vai tentar refresh
    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // ✅ IMPORTANTE: Usar uma NOVA instância ou garantir comCredentials
      const refreshResponse = await axios.post(
        `${API_URL ? API_URL : DEV_API_URL}/login/refresh`,
        {},
        {
          withCredentials: true, // ✅ ESSENCIAL
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Se o servidor retornou um novo token no body (opcional)
      if (refreshResponse.data?.token) {
        // Se você usa token no header além do cookie, atualiza aqui
        // api.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.data.token}`;
      }

      // Processa a fila com sucesso
      processQueue();

      // Tenta a requisição original novamente
      return api(originalRequest);
    } catch (refreshError: any) {
      // Processa a fila com erro
      processQueue(refreshError as Error);

      // Se o refresh falhou (ex: refresh token expirado), vai pro login (mas não se já estiver na página de login)
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    } finally {
      console.log("🏁 Refresh finalizado");
      isRefreshing = false;
    }
  },
);
