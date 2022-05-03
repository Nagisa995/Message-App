import {
    serverURL,
    userNameURL,
    messageHistory
} from './const.js'

import {
    onlineMessageOnScreen
} from './main.js'

import Cookies from 'js-cookie'

export async function sendPasswordOnEmail(userEmail) {
    return fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email: userEmail })
    });
}

export async function getUserName() {
    return fetch(userNameURL, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        }
    });
}

export async function changeUserNameOnServer(newUserName) {
    return fetch(serverURL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ name: newUserName })
    });
}

export async function getMessageHistoryOnServer() {
    return fetch(messageHistory.url, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        }
    });
}

export const socket = {
    chanel: '',
    init: function () {
        socket.chanel = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get('token')}`);
        socket.chanel.addEventListener('message', onlineMessageOnScreen);
        socket.chanel.addEventListener('error', ((error) => alert(error.message)));
        socket.chanel.addEventListener('close', socket.init);
    },
    send: function (data) {
        socket.chanel.send(data);
    },
    close: function () {
        socket.chanel.removeEventListener('close', socket.init);
        socket.chanel.close();
    }    
}