import { io } from "socket.io-client";

const socket = io(
  "https://codealpha-project-management-plateform.onrender.com",
  {
    transports: ["websocket"],
  }
);

export default socket;