"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineMessageOnScreen = void 0;
const const_1 = require("./const");
const utils_1 = require("./utils");
const api_1 = require("./api");
const view_1 = require("./view");
const js_cookie_1 = __importDefault(require("js-cookie"));
const_1.DEFAULT_UI_ELEMENTS.MAIN_SETTINGS_BUTTON.addEventListener('click', view_1.settingsMenuOnUI);
const_1.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_EXIT_BUTTON.addEventListener('click', view_1.settingsMenuOnUI);
const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_EXIT_BUTTON.addEventListener('click', view_1.autorisationEmailMenuOnUI);
const_1.DEFAULT_UI_ELEMENTS.MAIN_EXIT_BUTTON.addEventListener('click', exitingTheApplication);
const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_EXIT_BUTTON.addEventListener('click', view_1.autorisationPasswordMenuOnUI);
const_1.DEFAULT_UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);
const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_FORM.addEventListener('submit', sendPassword);
const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_FORM.addEventListener('submit', savePasswordToken);
const_1.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_FORM.addEventListener('submit', changeUserName);
const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.addEventListener('scroll', scrollMessageScreen);
api_1.socket.addEventListener('message', onlineMessageOnScreen);
api_1.socket.addEventListener('error', ((error) => alert(error.message)));
api_1.socket.addEventListener('close', api_1.socketInit);
if (js_cookie_1.default.get('token')) {
    (0, view_1.autorisationEmailMenuOnUI)();
    getMessageHistory();
}
function sendPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const userEmail = (0, utils_1.getInputValue)(const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
            const passwordRequest = yield (0, api_1.sendPasswordOnEmail)(userEmail);
            const passwordRequestIsValid = yield (0, utils_1.serverAnswerIsValid)(passwordRequest.status);
            if (passwordRequestIsValid) {
                (0, view_1.autorisationEmailMenuOnUI)();
                (0, view_1.autorisationPasswordMenuOnUI)();
            }
            else {
                throw new Error('The server could not provide information, please try again later');
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            (0, utils_1.clearInput)(const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
        }
    });
}
function savePasswordToken() {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const token = (0, utils_1.getInputValue)(const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
            const tokenIsNotValid = !(0, utils_1.notEmptyInput)(token);
            if (tokenIsNotValid) {
                return;
            }
            js_cookie_1.default.set('token', token, { expires: 7 });
            const userNameRequest = yield (0, api_1.getUserName)();
            const userNameRequestIsNotValid = !(0, utils_1.serverAnswerIsValid)(userNameRequest.status);
            if (!userNameRequest.ok || userNameRequestIsNotValid) {
                js_cookie_1.default.remove('token');
                throw new Error('Password is not valid, try again');
            }
            const userName = yield userNameRequest.json();
            js_cookie_1.default.set('userEmail', userName.email);
            (0, view_1.autorisationPasswordMenuOnUI)();
            getMessageHistory();
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            (0, utils_1.clearInput)(const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
        }
    });
}
function changeUserName() {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const newUserName = (0, utils_1.getInputValue)(const_1.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
            const newUserNameIsNotValid = !(0, utils_1.notEmptyInput)(newUserName);
            if (newUserNameIsNotValid) {
                return;
            }
            const changeUserNameRequest = yield (0, api_1.changeUserNameOnServer)(newUserName);
            const changeUserNameRequestIsNotValid = !(0, utils_1.serverAnswerIsValid)(changeUserNameRequest.status);
            if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
                throw new Error('Nickname is not valid, try again later');
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            (0, utils_1.clearInput)(const_1.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
        }
    });
}
function sendMessage() {
    event.preventDefault();
    const messageText = (0, utils_1.getInputValue)(const_1.DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);
    const messageIsValid = (0, utils_1.notEmptyInput)(messageText);
    (0, utils_1.clearInput)(const_1.DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);
    if (messageIsValid) {
        api_1.socket.send(JSON.stringify({ text: `${messageText}`, }));
    }
}
function exitingTheApplication() {
    const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.innerHTML = '';
    const_1.messageHistory.clear();
    js_cookie_1.default.remove('token');
    js_cookie_1.default.remove('userEmail');
    api_1.socket.close();
    (0, view_1.autorisationEmailMenuOnUI)();
}
function getMessageHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messageHistoryRequest = yield (0, api_1.getMessageHistoryOnServer)();
            const messageHistoryRequestIsNotValid = !(0, utils_1.serverAnswerIsValid)(messageHistoryRequest.status);
            if (messageHistoryRequestIsNotValid) {
                throw new Error('The server could not provide information, please try again later');
            }
            const messageHistoryAnswer = yield messageHistoryRequest.json();
            const_1.messageHistory.timeline = [...messageHistoryAnswer.messages].reverse();
            displayPartOfMessages();
        }
        catch (error) {
            alert(error.message);
        }
    });
}
function displayPartOfMessages() {
    const currentIDofLastPost = const_1.messageHistory.counter;
    const nextIDofLastPost = currentIDofLastPost + const_1.messageHistory.perLoad;
    const fullMessageHistoryOnScreen = currentIDofLastPost >= (const_1.messageHistory.timeline.length - 1);
    if (fullMessageHistoryOnScreen) {
        return;
    }
    for (let postID = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
        const lastMessageInHistoryDisplayed = postID === (const_1.messageHistory.timeline.length - 1);
        if (lastMessageInHistoryDisplayed) {
            (0, view_1.messageHistoryEndOnUI)();
            break;
        }
        (0, view_1.messageOnUI)(const_1.messageHistory.timeline[postID], 'history');
        const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = `${postID}`;
    }
    const_1.messageHistory.counter = nextIDofLastPost;
}
function scrollMessageScreen() {
    return __awaiter(this, void 0, void 0, function* () {
        const scroolSize = const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
        const screenIsFullScrolled = scroolSize === const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;
        if (screenIsFullScrolled) {
            displayPartOfMessages();
        }
    });
}
function onlineMessageOnScreen(event) {
    const messageData = JSON.parse(event.data);
    (0, view_1.messageOnUI)(messageData, 'online');
}
exports.onlineMessageOnScreen = onlineMessageOnScreen;
