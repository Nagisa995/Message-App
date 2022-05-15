import { userAuthorizationPass, savePasswordToken, sendPassword } from './authorization/main';
DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_FORM.addEventListener('submit', sendPassword);
DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_FORM.addEventListener('submit', savePasswordToken);
import { autorisationEmailMenuOnUI, autorisationPasswordMenuOnUI } from './authorization/view';
DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_EXIT_BUTTON.addEventListener('click', autorisationEmailMenuOnUI);
DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_EXIT_BUTTON.addEventListener('click', autorisationPasswordMenuOnUI);
import { scrollMessageScreen } from './message_history/main';
DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.addEventListener('scroll', scrollMessageScreen);
import { changeUserName } from './settings/main';
DEFAULT_UI_ELEMENTS.SETTINGS_MENU_FORM.addEventListener('submit', changeUserName);
import { settingsMenuOnUI } from './settings/view';
DEFAULT_UI_ELEMENTS.MAIN_SETTINGS_BUTTON.addEventListener('click', settingsMenuOnUI);
DEFAULT_UI_ELEMENTS.SETTINGS_MENU_EXIT_BUTTON.addEventListener('click', settingsMenuOnUI);
import { socket, sendMessage } from './socket/main';
DEFAULT_UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);
import { DEFAULT_UI_ELEMENTS, messageHistory, } from './const';
import Cookies from 'js-cookie';
DEFAULT_UI_ELEMENTS.MAIN_EXIT_BUTTON.addEventListener('click', exitingTheApplication);
function exitingTheApplication() {
    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.innerHTML = '';
    messageHistory.clear();
    Cookies.remove('token');
    Cookies.remove('userEmail');
    socket.close();
    autorisationEmailMenuOnUI();
}
userAuthorizationPass();
