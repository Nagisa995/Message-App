import {
    DEFAULT_UI_ELEMENTS,
    messageHistory
} from '../const'

import {
    notEmptyInput,
    serverAnswerIsValid,
    clearInput,
    getInputValue,
} from '../utils'

import {
    getMessageHistoryOnServer
} from './api'

import {
    messageOnUI,
    messageHistoryEndOnUI
} from './view'

import Cookies from 'js-cookie';

export async function getMessageHistory(): Promise<void> | never {
    interface messageData {
        createdAt: Date,
        text: string,
        user: {
            email: string,
            name: string
        }
    }
    try {
        const messageHistoryRequest: Response = await getMessageHistoryOnServer();

        const messageHistoryRequestIsNotValid: boolean = !serverAnswerIsValid(messageHistoryRequest.status);

        if (messageHistoryRequestIsNotValid) {
            throw new Error('The server could not provide information, please try again later')
        }

        const messageHistoryAnswer: { messages: Array<messageData> } = await messageHistoryRequest.json();

        messageHistory.timeline = [...messageHistoryAnswer.messages].reverse();

        displayPartOfMessages();
    } catch (error) {
        alert(error.message);
    }
}

function displayPartOfMessages(): void {
    const currentIDofLastPost: number = messageHistory.counter;
    const nextIDofLastPost: number = currentIDofLastPost + messageHistory.perLoad;

    const fullMessageHistoryOnScreen: boolean = currentIDofLastPost >= (messageHistory.timeline.length - 1);

    if (fullMessageHistoryOnScreen) {
        return
    }

    for (let postID: number = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
        const lastMessageInHistoryDisplayed: boolean = postID === (messageHistory.timeline.length - 1);

        if (lastMessageInHistoryDisplayed) {
            messageHistoryEndOnUI();
            break;
        }

        messageOnUI(messageHistory.timeline[postID], 'history');

        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = `${postID}`;
    }

    messageHistory.counter = nextIDofLastPost;
}

export function scrollMessageScreen(): void {
    const scroolSize: number = DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
    const screenIsFullScrolled: boolean = scroolSize === DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;

    if (screenIsFullScrolled) {
        displayPartOfMessages();
    }
}