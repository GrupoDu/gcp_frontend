import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

const getSocketURL = () => {
  if (API_URL) return API_URL;
  if (DEV_API_URL) return DEV_API_URL;

  if (typeof window !== "undefined") return `${window.location.protocol}//${window.location.hostname}:8000`;

  return "http://localhost:8000";
};

const URL = getSocketURL();

export const socket = io(URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  timeout: 20000,
  secure: false,
  rejectUnauthorized: true,
});
