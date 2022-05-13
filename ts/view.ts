import {
    DEFAULT_UI_ELEMENTS,
    TEMPLATE_CONTENT
} from './const'

import {
    switchOptionalMenu,
} from './utils'

import {
    format
} from 'date-fns'

import Cookies from 'js-cookie'

export function settingsMenuOnUI():void {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.SETTINGS_MENU);
}

export function autorisationEmailMenuOnUI():void {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_MENU);
}

export function autorisationPasswordMenuOnUI():void {
    switchOptionalMenu(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_MENU);
}

interface messageData {
    createdAt: Date,
    text: string,
    user: {
        email: string,
        name: string
    }
}

export function messageOnUI({
    createdAt: sendTime,
    text: message,
    user: {
        email: userEmail,
        name: userName
    }
}: messageData, status: string): void {
    const messageBlock: HTMLDivElement = document.createElement('div');

    const messageBody: HTMLDivElement = document.createElement('div');
    messageBody.classList.add('message', 'deliver_message');

    messageBody.append(TEMPLATE_CONTENT.content.cloneNode(true));
    messageBody.firstElementChild.textContent = `${userName}: ${message}`;
    messageBody.lastElementChild.textContent = format(new Date(sendTime), 'k:mm');

    messageBlock.append(messageBody);

    const thisIsUserMessage: boolean = Cookies.get('userEmail') == userEmail;

    if (thisIsUserMessage) {
        messageBlock.classList.add('my_message');
    }

    const thisMessageInHistory: boolean = status === 'history';

    if (thisMessageInHistory) {
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(messageBlock);
    } else {
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.prepend(messageBlock);
    }
}

export function messageHistoryEndOnUI() {
    const endMessage = document.createElement('div');
    endMessage.classList.add('endOfStory');
    endMessage.textContent = 'Вся история загружена';

    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(endMessage);
}