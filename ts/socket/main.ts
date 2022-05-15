import {
    DEFAULT_UI_ELEMENTS,
} from '../const'

import {
    notEmptyInput,
    clearInput,
    getInputValue,
    getCookieToken
} from '../utils'

import {
    messageOnUI
} from '../message_history/view'

export const socket: any = {
    chanel: undefined,
    init: function (): void {
        const apiToken: string = getCookieToken()
        socket.chanel = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${apiToken}`);
        socket.chanel.addEventListener('message', onlineMessageOnScreen);
        socket.chanel.addEventListener('error', ((error) => alert(error.message)));
        socket.chanel.addEventListener('close', socket.init);
    },
    send: function (data): void {
        socket.chanel.send(data);
    },
    close: function (): void {
        socket.chanel.removeEventListener('close', socket.init);
        socket.chanel.close();
    }
}


export function sendMessage(): void {
    event.preventDefault();

    const messageText: string = getInputValue(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT as HTMLInputElement);

    const messageIsValid: boolean = notEmptyInput(messageText);

    clearInput(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT as HTMLInputElement);

    if (messageIsValid) {
        socket.send(JSON.stringify({ text: `${messageText}`, }));
    }
}

export function onlineMessageOnScreen(event): void | never {
    try {
        const messageData = JSON.parse(event.data);

        messageOnUI(messageData, 'online');
    } catch (error) {
        console.log(error.message);
    }
}