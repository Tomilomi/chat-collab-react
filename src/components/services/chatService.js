import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5135/chatHub")
    .build();

export const startConnection = () => connection.start();

export const onReceiveMessage = (callback) => {
    connection.on("ReceiveMessage", callback);
};

export const onLoadMessages = (callback) => {
    connection.on("LoadMessages", callback);
};

export const sendMessage = (content) => {
    connection.invoke("SendMessage", { content });
};
