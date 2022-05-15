import {
    serverURL,
} from '../const'

import {
    getCookieToken
} from '../utils'

export async function changeUserNameOnServer(name: string): Promise<Response> | never {
    try {
        const apiToken: string | undefined = getCookieToken();
        return fetch(serverURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({ name })
        });
    } catch (error) {
        throw error;
    }

}