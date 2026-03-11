import { io } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL
const URL = API_URL || DEV_API_URL;

export const socket = io(URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
  timeout: 20000,
  secure: false,
  rejectUnauthorized: true,
});
