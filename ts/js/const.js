"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHistory = exports.userNameURL = exports.serverURL = exports.TEMPLATE_CONTENT = exports.DEFAULT_UI_ELEMENTS = void 0;
const utils_1 = require("./utils");
exports.DEFAULT_UI_ELEMENTS = {
    MAIN_SETTINGS_BUTTON: (0, utils_1.querySelectorIDCall)('#mainSettingsButton'),
    MAIN_EXIT_BUTTON: (0, utils_1.querySelectorIDCall)('#mainExitButton'),
    MESSAGE_FORM: (0, utils_1.querySelectorIDCall)('#messageInput'),
    MESSAGE_INPUT: (0, utils_1.querySelectorIDCall)('#messageField'),
    MESSAGE_SCREEN: (0, utils_1.querySelectorIDCall)('#messageScreen'),
    SETTINGS_MENU_EXIT_BUTTON: (0, utils_1.querySelectorIDCall)('#settingsMenuExitButton'),
    SETTINGS_MENU: (0, utils_1.querySelectorIDCall)('#settingsMenu'),
    SETTINGS_MENU_FORM: (0, utils_1.querySelectorIDCall)('#nicknameForm'),
    SETTINGS_MENU_INPUT: (0, utils_1.querySelectorIDCall)('#nicknameInput'),
    AUTORISATION_EMAIL_MENU: (0, utils_1.querySelectorIDCall)('#autorisationEmail'),
    AUTORISATION_EMAIL_EXIT_BUTTON: (0, utils_1.querySelectorIDCall)('#autorisationEmailMenuExitButton'),
    AUTORISATION_EMAIL_FORM: (0, utils_1.querySelectorIDCall)('#formEmail'),
    AUTORISATION_EMAIL_INPUT: (0, utils_1.querySelectorIDCall)('#inputEmail'),
    AUTORISATION_PASSWORD_MENU: (0, utils_1.querySelectorIDCall)('#autorisationPassword'),
    AUTORISATION_PASSWORD_EXIT_BUTTON: (0, utils_1.querySelectorIDCall)('#autorisationPasswordMenuExitButton'),
    AUTORISATION_PASSWORD_FORM: (0, utils_1.querySelectorIDCall)('#formPassword'),
    AUTORISATION_PASSWORD_INPUT: (0, utils_1.querySelectorIDCall)('#inputPassword'),
};
exports.TEMPLATE_CONTENT = document.querySelector('#messageContent');
exports.serverURL = 'https://mighty-cove-31255.herokuapp.com/api/user';
exports.userNameURL = `${exports.serverURL}/me`;
exports.messageHistory = {
    url: 'https://mighty-cove-31255.herokuapp.com/api/messages',
    timeline: undefined,
    counter: 0,
    perLoad: 20,
    clear: () => {
        exports.messageHistory.timeline = undefined;
        exports.messageHistory.counter = 0;
    }
};
