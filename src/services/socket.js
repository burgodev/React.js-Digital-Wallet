import socketIOClient from "socket.io-client";

var socket = null;
const token = localStorage.getItem("token") || "";

if (token) {
    const socketUrl = process.env.REACT_APP_BASE_URL;
    socket = socketIOClient(socketUrl, {
        query: { token },
    });
}

export default socket;