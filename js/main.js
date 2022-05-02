import {
    DEFAULT_UI_ELEMENTS,
    messagesPerLoad,
} from './const.js'

import {
    notEmptyInput,
    serverAnswerIsValid,
    defaultHistoryID,
    clearInput,
    getInputValue
} from './utilities.js'

import {
    sendPasswordOnEmail,
    getUserName,
    changeUserNameOnServer,
    getMessageHistoryOnServer,
} from './server.js'

import {
    settingsMenuOnUI,
    autorisationEmailMenuOnUI,
    autorisationPasswordMenuOnUI,
    messageOnUI,
} from './view.js'

import Cookies from 'js-cookie'

DEFAULT_UI_ELEMENTS.MAIN_SETTINGS_BUTTON.addEventListener('click', settingsMenuOnUI);
DEFAULT_UI_ELEMENTS.SETTINGS_MENU_EXIT_BUTTON.addEventListener('click', settingsMenuOnUI);

DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_EXIT_BUTTON.addEventListener('click', autorisationEmailMenuOnUI);
DEFAULT_UI_ELEMENTS.MAIN_EXIT_BUTTON.addEventListener('click', exitingTheApplication);

DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_EXIT_BUTTON.addEventListener('click', autorisationPasswordMenuOnUI);

DEFAULT_UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);
DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_FORM.addEventListener('submit', sendPassword);
DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_FORM.addEventListener('submit', savePasswordToken);
DEFAULT_UI_ELEMENTS.SETTINGS_MENU_FORM.addEventListener('submit', changeUserName);

DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.addEventListener('scroll', scrollMessageScreen);

if (Cookies.get('token')) {
    autorisationEmailMenuOnUI();
    getMessageHistory();
    joinOnline();
}

function joinOnline() {
    window.socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${Cookies.get('token')}`);
    socket.addEventListener('message', onlineMessageOnScreen);
    socket.addEventListener('error', ((error) => alert(error.message)));
    socket.addEventListener('close', joinOnline);
}

async function sendPassword() {
    event.preventDefault();

    try {
        const userEmail = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);

        const passwordRequest = await sendPasswordOnEmail(userEmail);

        const passwordRequestIsValid = await serverAnswerIsValid(passwordRequest.status);

        if (passwordRequestIsValid) {
            autorisationEmailMenuOnUI();
            autorisationPasswordMenuOnUI();
        } else {
            throw new Error('The server could not provide information, please try again later');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
    }
}

async function savePasswordToken() {
    event.preventDefault();

    try {
        const token = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);

        const tokenIsNotValid = !notEmptyInput(token);

        if (tokenIsNotValid) {
            return
        }

        Cookies.set('token', token, { expires: 7 });

        const userNameRequest = await getUserName();

        const userNameRequestIsNotValid = !serverAnswerIsValid(userNameRequest.status);

        if (!userNameRequest.ok || userNameRequestIsNotValid) {
            Cookies.remove('token');
            throw new Error('Password is not valid, try again');
        }

        const userName = await userNameRequest.json();

        Cookies.set('userEmail', userName.email);

        autorisationPasswordMenuOnUI();
        getMessageHistory();
        joinOnline();
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
    }
}

async function changeUserName() {
    event.preventDefault();

    try {
        const newUserName = getInputValue(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);

        const newUserNameIsNotValid = !notEmptyInput(newUserName);

        if (newUserNameIsNotValid) {
            return
        }

        const changeUserNameRequest = await changeUserNameOnServer(newUserName);

        const changeUserNameRequestIsNotValid = !serverAnswerIsValid(changeUserNameRequest.status)

        if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
            throw new Error('Nickname is not valid, try again later');
        }

        const newUserNameOnServer = await changeUserNameRequest.json();

        Cookies.set('userName', newUserNameOnServer.name);
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
    }
}

function sendMessage() {
    event.preventDefault();

    const messageText = getInputValue(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);

    const messageIsValid = notEmptyInput(messageText);

    clearInput(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);

    if (messageIsValid) {
        socket.send(JSON.stringify({ text: `${messageText}`, }));
    }
}

function exitingTheApplication() {
    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.innerHTML = '';
    defaultHistoryID();

    Cookies.remove('token');
    Cookies.remove('userEmail');

    socket.close();

    autorisationEmailMenuOnUI();
}

async function getMessageHistory() {
    try {
        const messageHistoryRequest = await getMessageHistoryOnServer();

        const messageHistoryRequestIsNotValid = !serverAnswerIsValid(messageHistoryRequest.status);

        if (messageHistoryRequestIsNotValid) {
            throw new Error('The server could not provide information, please try again later')
        }

        const messageHistoryAnswer = await messageHistoryRequest.json();

        window.messageHistory = [...messageHistoryAnswer.messages].reverse();

        displayPartOfMessages();
    } catch (error) {
        alert(error.message);
    }
}

function displayPartOfMessages() {
    const currentIDofLastPost = +DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id + 1;
    const nextIDofLastPost = currentIDofLastPost + messagesPerLoad;

    const fullMessageHistoryOnScreen = currentIDofLastPost === messageHistory.length;

    if (fullMessageHistoryOnScreen) {
        return
    }

    for (let postID = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
        const lastMessageInHistoryDisplayed = postID === messageHistory.length;

        if (lastMessageInHistoryDisplayed) {
            return
        }

        messageOnUI(messageHistory[postID], 'history');

        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = postID;
    }
}

async function scrollMessageScreen() {
    const scroolSize = DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
    const screenIsFullScrolled = scroolSize === DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;

    if (screenIsFullScrolled) {
        displayPartOfMessages();
    }
}

function onlineMessageOnScreen(event) {
    const messageData = JSON.parse(event.data);

    messageOnUI(messageData, 'online');
}