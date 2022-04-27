import {
    DEFAULT_UI_ELEMENTS,

} from './const.js'

import {
    switchOptionalMenu,
} from './utilities.js'

import {
    format
} from 'date-fns'

export function settingsMenuOnUI() {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.SETTINGS_MENU);
}

export function autorisationEmailMenuOnUI() {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_MENU);
}

export function autorisationPasswordMenuOnUI() {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_MENU);
}

export function messageOnUI(message, date) {
    const messageBlock = document.createElement('div');
    messageBlock.classList.add('my_message');

    const messageBody = document.createElement('div');
    messageBody.classList.add('message', 'send_message');

    messageBody.append(DEFAULT_UI_ELEMENTS.SAMPLE_MESSAGE_CONTENT.content.cloneNode(true));
    messageBody.firstElementChild.textContent = message;
    messageBody.lastElementChild.textContent = format(date, 'k:mm');

    messageBlock.append(messageBody);

    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(messageBlock);
}