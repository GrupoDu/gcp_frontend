import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const socket = io(API_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  timeout: 20000,
  secure: false,
  rejectUnauthorized: true,
});
