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

export function messageOnUI(userName, message, date, status) {
    const messageBlock = document.createElement('div');

    const messageBody = document.createElement('div');
    messageBody.classList.add('message');

    messageBody.append(DEFAULT_UI_ELEMENTS.SAMPLE_MESSAGE_CONTENT.content.cloneNode(true));
    messageBody.firstElementChild.textContent = `${userName}: ${message}`;
    messageBody.lastElementChild.textContent = format(date, 'k:mm');

    messageBlock.append(messageBody);

    const thisIsUserMessage = Cookies.get('userName') == userName;
    
    if (thisIsUserMessage) {
        messageBlock.classList.add('my_message');
    }

    const thisMessageDelivered = status === 'delivered';

    if (thisMessageDelivered) {
        messageBody.classList.add('deliver_message');
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(messageBlock);
    } else {
        messageBody.classList.add('send_message');
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.prepend(messageBlock);
    }
}