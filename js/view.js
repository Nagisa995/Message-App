import {
    DEFAULT_UI_ELEMENTS,

} from './const.js'

import {
    switchOptionalMenu,
} from './utilities.js'

import {
    format
} from 'date-fns'

import Cookies from 'js-cookie'

export function settingsMenuOnUI() {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.SETTINGS_MENU);
}

export function autorisationEmailMenuOnUI() {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_MENU);
}

export function autorisationPasswordMenuOnUI() {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_MENU);
}

export function messageOnUI({
    createdAt: sendTime,
    text: message,
    user: {
        email: userEmail,
        name: userName
    }
}, status) {
    const messageBlock = document.createElement('div');

    const messageBody = document.createElement('div');
    messageBody.classList.add('message', 'deliver_message');

    messageBody.append(DEFAULT_UI_ELEMENTS.SAMPLE_MESSAGE_CONTENT.content.cloneNode(true));
    messageBody.firstElementChild.textContent = `${userName}: ${message}`;
    messageBody.lastElementChild.textContent = format(new Date(sendTime), 'k:mm');

    messageBlock.append(messageBody);

    const thisIsUserMessage = Cookies.get('userEmail') == userEmail;

    if (thisIsUserMessage) {
        messageBlock.classList.add('my_message');
    }

    const thisMessageInHistory = status === 'history';

    if (thisMessageInHistory) {
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(messageBlock);
    } else {
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.prepend(messageBlock);
    }
}