import {
    DEFAULT_UI_ELEMENTS,

} from './const.js'

import { 
    format 
} from 'date-fns'

export function settingsMenuOnUI() {
    const userOpensSettingsMenu = DEFAULT_UI_ELEMENTS.SETTINGS_MENU.classList.contains('hidden');
    if (userOpensSettingsMenu) {
        DEFAULT_UI_ELEMENTS.SETTINGS_MENU.classList.remove('hidden');
    } else {
        DEFAULT_UI_ELEMENTS.SETTINGS_MENU.classList.add('hidden');
    }
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