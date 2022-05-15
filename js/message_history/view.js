import { DEFAULT_UI_ELEMENTS, TEMPLATE_CONTENT } from '../const';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
export function messageOnUI({ createdAt: sendTime, text: message, user: { email: userEmail, name: userName } }, status) {
    const messageBlock = document.createElement('div');
    const messageBody = document.createElement('div');
    messageBody.classList.add('message', 'deliver_message');
    messageBody.append(TEMPLATE_CONTENT.content.cloneNode(true));
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
    }
    else {
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.prepend(messageBlock);
    }
}
export function messageHistoryEndOnUI() {
    const endMessage = document.createElement('div');
    endMessage.classList.add('endOfStory');
    endMessage.textContent = 'Вся история загружена';
    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(endMessage);
}
