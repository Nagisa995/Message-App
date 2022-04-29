export const DEFAULT_UI_ELEMENTS = {
    MAIN_SETTINGS_BUTTON: mainSettingsButton,
    MAIN_EXIT_BUTTON: mainExitButton,

    MESSAGE_FORM: messageInput,
    MESSAGE_INPUT: messageField,

    SAMPLE_MESSAGE_CONTENT: messageContent,
    MESSAGE_SCREEN: messageScreen,

    SETTINGS_MENU_EXIT_BUTTON: settingsMenuExitButton,
    SETTINGS_MENU: settingsMenu,
    SETTINGS_MENU_FORM: nicknameForm,
    SETTINGS_MENU_INPUT: nicknameInput,

    
    AUTORISATION_EMAIL_MENU: autorisationEmail,
    AUTORISATION_EMAIL_EXIT_BUTTON: autorisationEmailMenuExitButton,
    AUTORISATION_EMAIL_FORM: formEmail,
    AUTORISATION_EMAIL_INPUT: inputEmail,

    AUTORISATION_PASSWORD_MENU: autorisationPassword,
    AUTORISATION_PASSWORD_EXIT_BUTTON: autorisationPasswordMenuExitButton,
    AUTORISATION_PASSWORD_FORM: formPassword,
    AUTORISATION_PASSWORD_INPUT: inputPassword,
}

export const serverURL = 'https://mighty-cove-31255.herokuapp.com/api/user';

export const userNameURL = `${serverURL}/me`;

export const messageHistoryURL = 'https://mighty-cove-31255.herokuapp.com/api/messages';

export const messagesPerScreen = 20;