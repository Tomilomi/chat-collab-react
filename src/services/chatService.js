import * as signalR from '@microsoft/signalr';

let connection = null;

export const startConnection = (token, onLoadMessages, onReceiveMessage) => {
    if (connection) return;

    connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5135/chathub', {
            accessTokenFactory: () => token
        })
        .build();

    connection.on('LoadMessages', onLoadMessages);
    connection.on('ReceiveMessage', onReceiveMessage);

    return connection.start()
        .then(() => {
            if (connection.state === signalR.HubConnectionState.Connected) {
                connection.invoke('LoadMessages', 0);
            }
        });
};

export const stopConnection = () => {
    if (connection) {
        connection.stop();
        connection = null;
    }
};

export const sendMessage = (content) => {
    connection.invoke('SendMessage', { content });
};