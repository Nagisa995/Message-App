import {
    messageHistory
} from '../const'

import {
    getCookieToken
} from '../utils'


export async function getMessageHistoryOnServer(): Promise<Response> | never {
    try {
        const apiToken: string | undefined = getCookieToken();
        return fetch(messageHistory.url, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            }
        });
    } catch (error) {
        throw error
    }
}