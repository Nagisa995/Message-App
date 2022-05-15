import {
    serverURL,
    userNameURL,
} from '../const'

import {
    getCookieToken
} from '../utils'

export async function sendPasswordOnEmail(email: string): Promise<Response> | never {
    try {
        return fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ email })
        });
    } catch (error) {
        throw error
    }

}

export async function getUserName(): Promise<Response> | never {
    try {
        const apiToken: string | undefined = getCookieToken();
        return fetch(userNameURL, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            }
        });
    } catch (error) {
        throw error
    }

}