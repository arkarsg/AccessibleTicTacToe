import React from "react";
import { io } from "socket.io-client";
import { WS_SERVER } from "../utils/config";

export const socket = io(WS_SERVER);
export const SocketContext = React.createContext();