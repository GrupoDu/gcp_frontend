import { io } from "socket.io-client";

export const socket = io("http://localhost:8002", {
  transports: ["websocket", "polling"],
  withCredentials: true,
  timeout: 20000,
  secure: false,
  rejectUnauthorized: true,
});
