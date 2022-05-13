"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHistoryEndOnUI = exports.messageOnUI = exports.autorisationPasswordMenuOnUI = exports.autorisationEmailMenuOnUI = exports.settingsMenuOnUI = void 0;
const const_1 = require("./const");
const utils_1 = require("./utils");
const date_fns_1 = require("date-fns");
const js_cookie_1 = __importDefault(require("js-cookie"));
function settingsMenuOnUI() {
    (0, utils_1.switchOptionalMenu)(const_1.DEFAULT_UI_ELEMENTS.SETTINGS_MENU);
}
exports.settingsMenuOnUI = settingsMenuOnUI;
function autorisationEmailMenuOnUI() {
    (0, utils_1.switchOptionalMenu)(const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_MENU);
}
exports.autorisationEmailMenuOnUI = autorisationEmailMenuOnUI;
function autorisationPasswordMenuOnUI() {
    (0, utils_1.switchOptionalMenu)(const_1.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_MENU);
}
exports.autorisationPasswordMenuOnUI = autorisationPasswordMenuOnUI;
function messageOnUI({ createdAt: sendTime, text: message, user: { email: userEmail, name: userName } }, status) {
    const messageBlock = document.createElement('div');
    const messageBody = document.createElement('div');
    messageBody.classList.add('message', 'deliver_message');
    messageBody.append(const_1.TEMPLATE_CONTENT.content.cloneNode(true));
    messageBody.firstElementChild.textContent = `${userName}: ${message}`;
    messageBody.lastElementChild.textContent = (0, date_fns_1.format)(new Date(sendTime), 'k:mm');
    messageBlock.append(messageBody);
    const thisIsUserMessage = js_cookie_1.default.get('userEmail') == userEmail;
    if (thisIsUserMessage) {
        messageBlock.classList.add('my_message');
    }
    const thisMessageInHistory = status === 'history';
    if (thisMessageInHistory) {
        const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(messageBlock);
    }
    else {
        const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.prepend(messageBlock);
    }
}
exports.messageOnUI = messageOnUI;
function messageHistoryEndOnUI() {
    const endMessage = document.createElement('div');
    endMessage.classList.add('endOfStory');
    endMessage.textContent = 'Вся история загружена';
    const_1.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(endMessage);
}
exports.messageHistoryEndOnUI = messageHistoryEndOnUI;
