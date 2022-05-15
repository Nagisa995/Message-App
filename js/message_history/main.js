var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DEFAULT_UI_ELEMENTS, messageHistory } from '../const';
import { serverAnswerIsValid, } from '../utils';
import { getMessageHistoryOnServer } from './api';
import { messageOnUI, messageHistoryEndOnUI } from './view';
export function getMessageHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messageHistoryRequest = yield getMessageHistoryOnServer();
            const messageHistoryRequestIsNotValid = !serverAnswerIsValid(messageHistoryRequest.status);
            if (messageHistoryRequestIsNotValid) {
                throw new Error('The server could not provide information, please try again later');
            }
            const messageHistoryAnswer = yield messageHistoryRequest.json();
            messageHistory.timeline = [...messageHistoryAnswer.messages].reverse();
            displayPartOfMessages();
        }
        catch (error) {
            alert(error.message);
        }
    });
}
function displayPartOfMessages() {
    const currentIDofLastPost = messageHistory.counter;
    const nextIDofLastPost = currentIDofLastPost + messageHistory.perLoad;
    const fullMessageHistoryOnScreen = currentIDofLastPost >= (messageHistory.timeline.length - 1);
    if (fullMessageHistoryOnScreen) {
        return;
    }
    for (let postID = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
        const lastMessageInHistoryDisplayed = postID === (messageHistory.timeline.length - 1);
        if (lastMessageInHistoryDisplayed) {
            messageHistoryEndOnUI();
            break;
        }
        messageOnUI(messageHistory.timeline[postID], 'history');
        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = `${postID}`;
    }
    messageHistory.counter = nextIDofLastPost;
}
export function scrollMessageScreen() {
    const scroolSize = DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
    const screenIsFullScrolled = scroolSize === DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;
    if (screenIsFullScrolled) {
        displayPartOfMessages();
    }
}
