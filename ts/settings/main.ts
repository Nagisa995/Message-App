import {
    DEFAULT_UI_ELEMENTS,
} from '../const'

import {
    notEmptyInput,
    serverAnswerIsValid,
    clearInput,
    getInputValue,
} from '../utils'

import {
    changeUserNameOnServer
} from './api'

export async function changeUserName(): Promise<void> | never {
    event.preventDefault();

    try {
        const newUserName: string = getInputValue(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT as HTMLInputElement);

        const newUserNameIsNotValid: boolean = !notEmptyInput(newUserName);

        if (newUserNameIsNotValid) {
            return
        }

        const changeUserNameRequest: Response = await changeUserNameOnServer(newUserName);

        const changeUserNameRequestIsNotValid: Boolean = !serverAnswerIsValid(changeUserNameRequest.status)

        if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
            throw new Error('Nickname is not valid, try again later');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT as HTMLInputElement);
    }
}