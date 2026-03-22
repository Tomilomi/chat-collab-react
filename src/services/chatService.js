import * as signalR from '@microsoft/signalr';
import { BASE_URL } from '../config';

let connection = null;

export const startConnection = (token, onLoadMessages, onReceiveMessage, onUpdateConnectedUsers, onUserTyping, onUserStoppedTyping, onKicked, onMessageDeleted, onUserUpdated) => {
    if (connection) return;

    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${BASE_URL}/chathub`, {
            accessTokenFactory: () => token
        })
        .build();

    connection.on('LoadMessages', onLoadMessages);
    connection.on('ReceiveMessage', onReceiveMessage);
    connection.on('UpdateConnectedUsers', onUpdateConnectedUsers);
    connection.on('UserTyping', onUserTyping);
    connection.on('UserStoppedTyping', onUserStoppedTyping);
    connection.on('Kicked', onKicked);
    connection.on('MessageDeleted', onMessageDeleted)
    connection.on('UserUpdated', onUserUpdated);

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

export const onUpdateConnectedUsers = (callback) => {
    connection.on('UpdateConnectedUsers', callback);
};

export const startTyping = () => {
    connection.invoke('StartTyping');
};

export const stopTyping = () => {
    connection.invoke('StopTyping');
};

export const kickUser = (userId) => {
    connection.invoke('KickUser', userId);
};


export const loadMoreMessages = (page) => {
    connection.invoke('LoadMessages', page);
};


