import {
    DEFAULT_UI_ELEMENTS,

} from './const.js'

import {
    sendPasswordOnEmail,
} from './server.js'

import {
    settingsMenuOnUI,
    autorisationEmailMenuOnUI,
    autorisationPasswordMenuOnUI,
    messageOnUI,
} from './view.js'

DEFAULT_UI_ELEMENTS.MAIN_SETTINGS_BUTTON.addEventListener('click', settingsMenuOnUI);
DEFAULT_UI_ELEMENTS.SETTINGS_MENU_EXIT_BUTTON.addEventListener('click', settingsMenuOnUI);

DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_EXIT_BUTTON.addEventListener('click', autorisationEmailMenuOnUI);
DEFAULT_UI_ELEMENTS.MAIN_EXIT_BUTTON.addEventListener('click', autorisationEmailMenuOnUI);

DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_EXIT_BUTTON.addEventListener('click', autorisationPasswordMenuOnUI);

DEFAULT_UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);
DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_FORM.addEventListener('submit', sendPassword);


async function sendPassword() {
    event.preventDefault();

    try {
        const userEmail = DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT.value

        const passwordRequest = await sendPasswordOnEmail(userEmail);

        const passwordRequestIsValid = (passwordRequest.status !== 404) && (passwordRequest.status !== 500);

        if (passwordRequestIsValid) {
            autorisationEmailMenuOnUI();
            autorisationPasswordMenuOnUI();
        } else {
            throw new Error('The server could not provide information, please try again later');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT.value = '';
    }
}

function sendMessage() {
    event.preventDefault();

    const messageText = DEFAULT_UI_ELEMENTS.MESSAGE_INPUT.value;
    const messageDate = Date.now();

    const messageIsValid = messageText.split(' ').join('') !== '';

    DEFAULT_UI_ELEMENTS.MESSAGE_INPUT.value = '';

    if (messageIsValid) {
        messageOnUI(messageText, messageDate);
    }
}