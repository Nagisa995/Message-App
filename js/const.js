import { querySelectorIDCall } from './utils';
export const DEFAULT_UI_ELEMENTS = {
    MAIN_SETTINGS_BUTTON: querySelectorIDCall('#mainSettingsButton'),
    MAIN_EXIT_BUTTON: querySelectorIDCall('#mainExitButton'),
    MESSAGE_FORM: querySelectorIDCall('#messageInput'),
    MESSAGE_INPUT: querySelectorIDCall('#messageField'),
    MESSAGE_SCREEN: querySelectorIDCall('#messageScreen'),
    SETTINGS_MENU_EXIT_BUTTON: querySelectorIDCall('#settingsMenuExitButton'),
    SETTINGS_MENU: querySelectorIDCall('#settingsMenu'),
    SETTINGS_MENU_FORM: querySelectorIDCall('#nicknameForm'),
    SETTINGS_MENU_INPUT: querySelectorIDCall('#nicknameInput'),
    AUTORISATION_EMAIL_MENU: querySelectorIDCall('#autorisationEmail'),
    AUTORISATION_EMAIL_EXIT_BUTTON: querySelectorIDCall('#autorisationEmailMenuExitButton'),
    AUTORISATION_EMAIL_FORM: querySelectorIDCall('#formEmail'),
    AUTORISATION_EMAIL_INPUT: querySelectorIDCall('#inputEmail'),
    AUTORISATION_PASSWORD_MENU: querySelectorIDCall('#autorisationPassword'),
    AUTORISATION_PASSWORD_EXIT_BUTTON: querySelectorIDCall('#autorisationPasswordMenuExitButton'),
    AUTORISATION_PASSWORD_FORM: querySelectorIDCall('#formPassword'),
    AUTORISATION_PASSWORD_INPUT: querySelectorIDCall('#inputPassword'),
};
export const TEMPLATE_CONTENT = document.querySelector('#messageContent');
export const serverURL = 'https://mighty-cove-31255.herokuapp.com/api/user';
export const userNameURL = `${serverURL}/me`;
export const messageHistory = {
    url: 'https://mighty-cove-31255.herokuapp.com/api/messages',
    timeline: undefined,
    counter: 0,
    perLoad: 20,
    clear: () => {
        messageHistory.timeline = undefined;
        messageHistory.counter = 0;
    }
};
