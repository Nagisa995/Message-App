import {
    DEFAULT_UI_ELEMENTS,

} from  './const.js'

import {
    settingsMenuOnUI,
    messageOnUI,
} from  './view.js'

DEFAULT_UI_ELEMENTS.MAIN_SETTINGS_BUTTON.addEventListener('click', settingsMenuOnUI);
DEFAULT_UI_ELEMENTS.SETTINGS_EXIT_BUTTON.addEventListener('click', settingsMenuOnUI);
DEFAULT_UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);


function sendMessage() {
event.preventDefault();

const messageText = DEFAULT_UI_ELEMENTS.MESSAGE_INPUT.value;
const messageDate = Date.now();

messageOnUI (messageText, messageDate);

DEFAULT_UI_ELEMENTS.MESSAGE_INPUT.value = '';
}