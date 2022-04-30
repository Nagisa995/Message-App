import {
    DEFAULT_UI_ELEMENTS,
    messagesPerLoad,
} from './const.js'

import {
    notEmptyInput,
    serverAnswerIsValid
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
    displayPartOfMessages();
}

async function sendPassword() {
    event.preventDefault();

    try {
        const userEmail = DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT.value

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
        DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT.value = '';
    }
}

async function savePasswordToken() {
    event.preventDefault();

    try {
        const token = DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT.value;

        const tokenIsValid = notEmptyInput(token);

        if (!tokenIsValid) {
            throw new Error('Enter password');
        }

        Cookies.set('token', token, { expires: 7 });

        const userNameRequest = await getUserName();

        const userNameRequestIsNotValid = !serverAnswerIsValid(userNameRequest.status);

        if (!userNameRequest.ok || userNameRequestIsNotValid) {
            Cookies.remove('token');
            throw new Error('Password is not valid, try again');
        }

        const userName = await userNameRequest.json();

        Cookies.set('userName', userName.name);

        autorisationPasswordMenuOnUI();
    } catch (error) {
        alert(error.message);
    } finally {
        DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT.value = '';
    }
}

async function changeUserName() {
    event.preventDefault();

    try {
        const newUserName = DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT.value;

        const newUserNameIsValid = notEmptyInput(newUserName);

        if (!newUserNameIsValid) {
            return
        }

        const changeUserNameRequest = await changeUserNameOnServer(newUserName);

        const changeUserNameRequestIsNotValid = !serverAnswerIsValid(changeUserNameRequest.status)

        if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
            throw new Error('Nickname is not valid, try again');
        }

        const newUserNameOnServer = await changeUserNameRequest.json();

        Cookies.set('userName', newUserNameOnServer.name);
    } catch (error) {
        alert(error.message);
    } finally {
        DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT.value = '';
    }
}

function sendMessage() {
    event.preventDefault();

    const messageText = DEFAULT_UI_ELEMENTS.MESSAGE_INPUT.value;
    const messageDate = Date.now();

    const messageIsValid = notEmptyInput(messageText);

    DEFAULT_UI_ELEMENTS.MESSAGE_INPUT.value = '';

    if (messageIsValid) {
        messageOnUI(Cookies.get('userName'), messageText, messageDate, 'send');
    }
}

function exitingTheApplication() {
    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.innerHTML = '';
    Cookies.remove('token');
    autorisationEmailMenuOnUI();
}

async function getMessageHistory() {
    try {
        const messageHistoryRequest = await getMessageHistoryOnServer();

        const messageHistoryRequestIsNotValid = !serverAnswerIsValid(messageHistoryRequest.status);

        if (messageHistoryRequestIsNotValid) {
            throw new Error ('The server could not provide information, please try again later')
        }

        const messageHistoryAnswer = await messageHistoryRequest.json();

        return [...messageHistoryAnswer.messages].reverse();
    } catch (error) {
        alert(error.message);
    }
}

async function displayPartOfMessages() {
    const currentIDofLastPost = +DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id + 1;
    const nextIDofLastPost = currentIDofLastPost + messagesPerLoad;

    const messageTimeline = await getMessageHistory();

    const fullMessageHistoryOnScreen = currentIDofLastPost === (messageTimeline.length - 1);

    if (fullMessageHistoryOnScreen) {
        return
    }

    for (let postID = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
        const lastMessageInHistoryDisplayed = postID === messageTimeline.length;

        if (lastMessageInHistoryDisplayed) {
            return
        }

        let {
            createdAt: sendTime,
            text: message,
            user: {
                email,
                name: userName
            }
        } = messageTimeline[postID];

        messageOnUI(userName, message, new Date(sendTime), 'delivered');

        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = postID
    }
}

async function scrollMessageScreen() {
    const scroolSize = DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
    const screenIsFullScrolled = scroolSize === DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;

    if (screenIsFullScrolled) {
        await displayPartOfMessages();
    }
}