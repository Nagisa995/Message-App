import {
    serverURL,
    userNameURL,
    messageHistoryURL,
} from './const.js'

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
        body: JSON.stringify({name: newUserName})
    });
}

export async function getMessageHistoryOnServer() {
    return fetch(messageHistoryURL, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        }
    });
}