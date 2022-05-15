import { DEFAULT_UI_ELEMENTS, } from '../const';
import { notEmptyInput, clearInput, getInputValue, getCookieToken } from '../utils';
import { messageOnUI } from '../message_history/view';
export const socket = {
    chanel: undefined,
    init: function () {
        const apiToken = getCookieToken();
        socket.chanel = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${apiToken}`);
        socket.chanel.addEventListener('message', onlineMessageOnScreen);
        socket.chanel.addEventListener('error', ((error) => alert(error.message)));
        socket.chanel.addEventListener('close', socket.init);
    },
    send: function (data) {
        socket.chanel.send(data);
    },
    close: function () {
        socket.chanel.removeEventListener('close', socket.init);
        socket.chanel.close();
    }
};
export function sendMessage() {
    event.preventDefault();
    const messageText = getInputValue(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);
    const messageIsValid = notEmptyInput(messageText);
    clearInput(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);
    if (messageIsValid) {
        socket.send(JSON.stringify({ text: `${messageText}`, }));
    }
}
export function onlineMessageOnScreen(event) {
    try {
        const messageData = JSON.parse(event.data);
        messageOnUI(messageData, 'online');
    }
    catch (error) {
        console.log(error.message);
    }
}
