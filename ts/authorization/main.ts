import {
    getMessageHistory,
} from '../message_history/main'

import {
    socket,
} from '../socket/main'

import {
    DEFAULT_UI_ELEMENTS,
} from '../const'

import {
    notEmptyInput,
    serverAnswerIsValid,
    clearInput,
    getInputValue,
    getCookieToken
} from '../utils'

import {
    sendPasswordOnEmail,
    getUserName,
} from './api'

import {
    autorisationEmailMenuOnUI,
    autorisationPasswordMenuOnUI,
} from './view'

import Cookies from 'js-cookie';

export async function sendPassword(): Promise<void> | never {
    event.preventDefault();

    try {
        const userEmail: string = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT as HTMLInputElement);

        const passwordRequest: Response = await sendPasswordOnEmail(userEmail);

        const passwordRequestIsValid: boolean = await serverAnswerIsValid(passwordRequest.status);

        if (passwordRequestIsValid) {
            autorisationEmailMenuOnUI();
            autorisationPasswordMenuOnUI();
        } else {
            throw new Error('The server could not provide information, please try again later');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT as HTMLInputElement);
    }
}

export async function savePasswordToken(): Promise<void> | never {
    event.preventDefault();

    try {
        const token: string = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT as HTMLInputElement);

        const tokenIsNotValid: boolean = !notEmptyInput(token);

        if (tokenIsNotValid) {
            return
        }

        Cookies.set('token', token, { expires: 7 });

        const userNameRequest: Response = await getUserName();

        const userNameRequestIsNotValid: boolean = !serverAnswerIsValid(userNameRequest.status);

        if (!userNameRequest.ok || userNameRequestIsNotValid) {
            Cookies.remove('token');
            throw new Error('Password is not valid, try again');
        }

        const userName: { email: string } = await userNameRequest.json();

        Cookies.set('userEmail', userName.email);

        autorisationPasswordMenuOnUI();
        userAuthorizationPass();
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT as HTMLInputElement);
    }
}

export function userAuthorizationPass(): void | never {
    const apiToken: string = getCookieToken();
    const isAuthorizedUser: boolean = Boolean(apiToken);

    if (isAuthorizedUser) {
        autorisationEmailMenuOnUI();
        getMessageHistory();
        socket.init();
    }
}
