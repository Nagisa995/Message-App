import {
    DEFAULT_UI_ELEMENTS,
    messageHistory,
} from './const'

import {
    notEmptyInput,
    serverAnswerIsValid,
    clearInput,
    getInputValue
} from './utils'

import {
    sendPasswordOnEmail,
    getUserName,
    changeUserNameOnServer,
    getMessageHistoryOnServer,
    socket,
    socketInit
} from './api'

import {
    settingsMenuOnUI,
    autorisationEmailMenuOnUI,
    autorisationPasswordMenuOnUI,
    messageOnUI,
    messageHistoryEndOnUI
} from './view'

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

socket.addEventListener('message', onlineMessageOnScreen);
socket.addEventListener('error', ((error) => alert(error.message)));
socket.addEventListener('close', socketInit);

if (Cookies.get('token')) {
    autorisationEmailMenuOnUI();
    getMessageHistory();
}

async function sendPassword() {
    event.preventDefault();

    try {
        const userEmail: string = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT as HTMLInputElement);

        const passwordRequest: ResponseInit = await sendPasswordOnEmail(userEmail);

        const passwordRequestIsValid: boolean = await serverAnswerIsValid(passwordRequest.status);

        if (passwordRequestIsValid) {
            autorisationEmailMenuOnUI();
            autorisationPasswordMenuOnUI();
        } else {
            throw new Error('The server could not provide information, please try again later');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT as HTMLInputElement);
    }
}

async function savePasswordToken() {
    event.preventDefault();

    try {
        const token: string = getInputValue(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT as HTMLInputElement);

        const tokenIsNotValid: boolean = !notEmptyInput(token);

        if (tokenIsNotValid) {
            return
        }

        Cookies.set('token', token, { expires: 7 });

        const userNameRequest: Response = await getUserName();

        const userNameRequestIsNotValid: boolean = !serverAnswerIsValid(userNameRequest.status);

        if (!userNameRequest.ok || userNameRequestIsNotValid) {
            Cookies.remove('token');
            throw new Error('Password is not valid, try again');
        }

        const userName: { email: string } = await userNameRequest.json();

        Cookies.set('userEmail', userName.email);

        autorisationPasswordMenuOnUI();
        getMessageHistory();
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT as HTMLInputElement);
    }
}

async function changeUserName() {
    event.preventDefault();

    try {
        const newUserName: string = getInputValue(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT as HTMLInputElement);

        const newUserNameIsNotValid: boolean = !notEmptyInput(newUserName);

        if (newUserNameIsNotValid) {
            return
        }

        const changeUserNameRequest: Response = await changeUserNameOnServer(newUserName);

        const changeUserNameRequestIsNotValid: Boolean = !serverAnswerIsValid(changeUserNameRequest.status)

        if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
            throw new Error('Nickname is not valid, try again later');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        clearInput(DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT as HTMLInputElement);
    }
}

function sendMessage() {
    event.preventDefault();

    const messageText: string = getInputValue(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT as HTMLInputElement);

    const messageIsValid: boolean = notEmptyInput(messageText);

    clearInput(DEFAULT_UI_ELEMENTS.MESSAGE_INPUT as HTMLInputElement);

    if (messageIsValid) {
        socket.send(JSON.stringify({ text: `${messageText}`, }));
    }
}

function exitingTheApplication() {
    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.innerHTML = '';
    messageHistory.clear();

    Cookies.remove('token');
    Cookies.remove('userEmail');

    socket.close();

    autorisationEmailMenuOnUI();
}



async function getMessageHistory() {
    interface messageData {
        createdAt: Date,
        text: string,
        user: {
            email: string,
            name: string
        }
    }
    try {
        const messageHistoryRequest: Response = await getMessageHistoryOnServer();

        const messageHistoryRequestIsNotValid: boolean = !serverAnswerIsValid(messageHistoryRequest.status);

        if (messageHistoryRequestIsNotValid) {
            throw new Error('The server could not provide information, please try again later')
        }

        const messageHistoryAnswer: { messages: Array<messageData> } = await messageHistoryRequest.json();

        messageHistory.timeline = [...messageHistoryAnswer.messages].reverse();

        displayPartOfMessages();
    } catch (error) {
        alert(error.message);
    }
}

function displayPartOfMessages() {
    const currentIDofLastPost: number = messageHistory.counter;
    const nextIDofLastPost: number = currentIDofLastPost + messageHistory.perLoad;

    const fullMessageHistoryOnScreen: boolean = currentIDofLastPost >= (messageHistory.timeline.length - 1);

    if (fullMessageHistoryOnScreen) {
        return
    }

    for (let postID: number = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
        const lastMessageInHistoryDisplayed: boolean = postID === (messageHistory.timeline.length - 1);

        if (lastMessageInHistoryDisplayed) {
            messageHistoryEndOnUI();
            break;
        }

        messageOnUI(messageHistory.timeline[postID], 'history');

        DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = `${postID}`;
    }

    messageHistory.counter = nextIDofLastPost;
}

async function scrollMessageScreen() {
    const scroolSize: number = DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
    const screenIsFullScrolled: boolean = scroolSize === DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;

    if (screenIsFullScrolled) {
        displayPartOfMessages();
    }
}

export function onlineMessageOnScreen(event) {
    const messageData = JSON.parse(event.data);

    messageOnUI(messageData, 'online');
}