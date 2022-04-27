import {
    emailURL,
} from './const.js'

export async function sendPasswordOnEmail(userEmail) {
    return fetch(emailURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: userEmail })
    });
}