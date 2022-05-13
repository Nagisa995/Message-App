import {
    serverURL,
    userNameURL,
    messageHistory
} from './const'

import {
    getCookieToken
} from './utils'

export async function sendPasswordOnEmail(email: string) {
    return fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email })
    });
}

export async function getUserName() {
    const apiToken: string | undefined = getCookieToken();
    return fetch(userNameURL, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
        }
    });
}

export async function changeUserNameOnServer(name: string) {
    const apiToken: string | undefined = getCookieToken();
    return fetch(serverURL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({ name })
    });
}

export async function getMessageHistoryOnServer() {
    const apiToken: string | undefined = getCookieToken();
    return fetch(messageHistory.url, {
        headers: {
            Authorization: `Bearer ${apiToken}`,
        }
    });
}

export let socket = socketInit();

export function socketInit(){
    const apiToken: string | undefined = getCookieToken();
    return socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${apiToken}`);
} 