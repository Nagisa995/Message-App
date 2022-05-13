var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("utils", ["require", "exports", "js-cookie"], function (require, exports, js_cookie_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInputValue = exports.clearInput = exports.serverAnswerIsValid = exports.notEmptyInput = exports.switchOptionalMenu = exports.querySelectorIDCall = exports.getCookieToken = void 0;
    js_cookie_1 = __importDefault(js_cookie_1);
    function getCookieToken() {
        return js_cookie_1.default.get('token');
    }
    exports.getCookieToken = getCookieToken;
    function querySelectorIDCall(selector) {
        const domElement = document.querySelector(`${selector}`);
        return domElement;
    }
    exports.querySelectorIDCall = querySelectorIDCall;
    function switchOptionalMenu(menu) {
        const userOpensOptionalMenu = menu.classList.contains('hidden');
        if (userOpensOptionalMenu) {
            menu.classList.remove('hidden');
        }
        else {
            menu.classList.add('hidden');
        }
    }
    exports.switchOptionalMenu = switchOptionalMenu;
    function notEmptyInput(value) {
        return value.split(' ').join('') !== '';
    }
    exports.notEmptyInput = notEmptyInput;
    function serverAnswerIsValid(answerStatus) {
        return (answerStatus !== 404 && answerStatus !== 500);
    }
    exports.serverAnswerIsValid = serverAnswerIsValid;
    function clearInput(input) {
        input.value = '';
    }
    exports.clearInput = clearInput;
    function getInputValue(input) {
        return input.value;
    }
    exports.getInputValue = getInputValue;
});
define("const", ["require", "exports", "utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.messageHistory = exports.userNameURL = exports.serverURL = exports.TEMPLATE_CONTENT = exports.DEFAULT_UI_ELEMENTS = void 0;
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
});
define("api", ["require", "exports", "const", "utils"], function (require, exports, const_1, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.socketInit = exports.socket = exports.getMessageHistoryOnServer = exports.changeUserNameOnServer = exports.getUserName = exports.sendPasswordOnEmail = void 0;
    function sendPasswordOnEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(const_1.serverURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ email })
            });
        });
    }
    exports.sendPasswordOnEmail = sendPasswordOnEmail;
    function getUserName() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiToken = (0, utils_2.getCookieToken)();
            return fetch(const_1.userNameURL, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                }
            });
        });
    }
    exports.getUserName = getUserName;
    function changeUserNameOnServer(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiToken = (0, utils_2.getCookieToken)();
            return fetch(const_1.serverURL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify({ name })
            });
        });
    }
    exports.changeUserNameOnServer = changeUserNameOnServer;
    function getMessageHistoryOnServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiToken = (0, utils_2.getCookieToken)();
            return fetch(const_1.messageHistory.url, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                }
            });
        });
    }
    exports.getMessageHistoryOnServer = getMessageHistoryOnServer;
    exports.socket = socketInit();
    function socketInit() {
        const apiToken = (0, utils_2.getCookieToken)();
        return exports.socket = new WebSocket(`ws://mighty-cove-31255.herokuapp.com/websockets?${apiToken}`);
    }
    exports.socketInit = socketInit;
});
define("view", ["require", "exports", "const", "utils", "date-fns", "js-cookie"], function (require, exports, const_2, utils_3, date_fns_1, js_cookie_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.messageHistoryEndOnUI = exports.messageOnUI = exports.autorisationPasswordMenuOnUI = exports.autorisationEmailMenuOnUI = exports.settingsMenuOnUI = void 0;
    js_cookie_2 = __importDefault(js_cookie_2);
    function settingsMenuOnUI() {
        (0, utils_3.switchOptionalMenu)(const_2.DEFAULT_UI_ELEMENTS.SETTINGS_MENU);
    }
    exports.settingsMenuOnUI = settingsMenuOnUI;
    function autorisationEmailMenuOnUI() {
        (0, utils_3.switchOptionalMenu)(const_2.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_MENU);
    }
    exports.autorisationEmailMenuOnUI = autorisationEmailMenuOnUI;
    function autorisationPasswordMenuOnUI() {
        (0, utils_3.switchOptionalMenu)(const_2.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_MENU);
    }
    exports.autorisationPasswordMenuOnUI = autorisationPasswordMenuOnUI;
    function messageOnUI({ createdAt: sendTime, text: message, user: { email: userEmail, name: userName } }, status) {
        const messageBlock = document.createElement('div');
        const messageBody = document.createElement('div');
        messageBody.classList.add('message', 'deliver_message');
        messageBody.append(const_2.TEMPLATE_CONTENT.content.cloneNode(true));
        messageBody.firstElementChild.textContent = `${userName}: ${message}`;
        messageBody.lastElementChild.textContent = (0, date_fns_1.format)(new Date(sendTime), 'k:mm');
        messageBlock.append(messageBody);
        const thisIsUserMessage = js_cookie_2.default.get('userEmail') == userEmail;
        if (thisIsUserMessage) {
            messageBlock.classList.add('my_message');
        }
        const thisMessageInHistory = status === 'history';
        if (thisMessageInHistory) {
            const_2.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(messageBlock);
        }
        else {
            const_2.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.prepend(messageBlock);
        }
    }
    exports.messageOnUI = messageOnUI;
    function messageHistoryEndOnUI() {
        const endMessage = document.createElement('div');
        endMessage.classList.add('endOfStory');
        endMessage.textContent = 'Вся история загружена';
        const_2.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(endMessage);
    }
    exports.messageHistoryEndOnUI = messageHistoryEndOnUI;
});
define("main", ["require", "exports", "const", "utils", "api", "view", "js-cookie"], function (require, exports, const_3, utils_4, api_1, view_1, js_cookie_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onlineMessageOnScreen = void 0;
    js_cookie_3 = __importDefault(js_cookie_3);
    const_3.DEFAULT_UI_ELEMENTS.MAIN_SETTINGS_BUTTON.addEventListener('click', view_1.settingsMenuOnUI);
    const_3.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_EXIT_BUTTON.addEventListener('click', view_1.settingsMenuOnUI);
    const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_EXIT_BUTTON.addEventListener('click', view_1.autorisationEmailMenuOnUI);
    const_3.DEFAULT_UI_ELEMENTS.MAIN_EXIT_BUTTON.addEventListener('click', exitingTheApplication);
    const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_EXIT_BUTTON.addEventListener('click', view_1.autorisationPasswordMenuOnUI);
    const_3.DEFAULT_UI_ELEMENTS.MESSAGE_FORM.addEventListener('submit', sendMessage);
    const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_FORM.addEventListener('submit', sendPassword);
    const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_FORM.addEventListener('submit', savePasswordToken);
    const_3.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_FORM.addEventListener('submit', changeUserName);
    const_3.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.addEventListener('scroll', scrollMessageScreen);
    api_1.socket.addEventListener('message', onlineMessageOnScreen);
    api_1.socket.addEventListener('error', ((error) => alert(error.message)));
    api_1.socket.addEventListener('close', api_1.socketInit);
    if (js_cookie_3.default.get('token')) {
        (0, view_1.autorisationEmailMenuOnUI)();
        getMessageHistory();
    }
    function sendPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const userEmail = (0, utils_4.getInputValue)(const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
                const passwordRequest = yield (0, api_1.sendPasswordOnEmail)(userEmail);
                const passwordRequestIsValid = yield (0, utils_4.serverAnswerIsValid)(passwordRequest.status);
                if (passwordRequestIsValid) {
                    (0, view_1.autorisationEmailMenuOnUI)();
                    (0, view_1.autorisationPasswordMenuOnUI)();
                }
                else {
                    throw new Error('The server could not provide information, please try again later');
                }
            }
            catch (error) {
                alert(error.message);
            }
            finally {
                (0, utils_4.clearInput)(const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_EMAIL_INPUT);
            }
        });
    }
    function savePasswordToken() {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const token = (0, utils_4.getInputValue)(const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
                const tokenIsNotValid = !(0, utils_4.notEmptyInput)(token);
                if (tokenIsNotValid) {
                    return;
                }
                js_cookie_3.default.set('token', token, { expires: 7 });
                const userNameRequest = yield (0, api_1.getUserName)();
                const userNameRequestIsNotValid = !(0, utils_4.serverAnswerIsValid)(userNameRequest.status);
                if (!userNameRequest.ok || userNameRequestIsNotValid) {
                    js_cookie_3.default.remove('token');
                    throw new Error('Password is not valid, try again');
                }
                const userName = yield userNameRequest.json();
                js_cookie_3.default.set('userEmail', userName.email);
                (0, view_1.autorisationPasswordMenuOnUI)();
                getMessageHistory();
                api_1.socket.init();
            }
            catch (error) {
                alert(error.message);
            }
            finally {
                (0, utils_4.clearInput)(const_3.DEFAULT_UI_ELEMENTS.AUTORISATION_PASSWORD_INPUT);
            }
        });
    }
    function changeUserName() {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const newUserName = (0, utils_4.getInputValue)(const_3.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
                const newUserNameIsNotValid = !(0, utils_4.notEmptyInput)(newUserName);
                if (newUserNameIsNotValid) {
                    return;
                }
                const changeUserNameRequest = yield (0, api_1.changeUserNameOnServer)(newUserName);
                const changeUserNameRequestIsNotValid = !(0, utils_4.serverAnswerIsValid)(changeUserNameRequest.status);
                if (!changeUserNameRequest.ok || changeUserNameRequestIsNotValid) {
                    throw new Error('Nickname is not valid, try again later');
                }
            }
            catch (error) {
                alert(error.message);
            }
            finally {
                (0, utils_4.clearInput)(const_3.DEFAULT_UI_ELEMENTS.SETTINGS_MENU_INPUT);
            }
        });
    }
    function sendMessage() {
        event.preventDefault();
        const messageText = (0, utils_4.getInputValue)(const_3.DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);
        const messageIsValid = (0, utils_4.notEmptyInput)(messageText);
        (0, utils_4.clearInput)(const_3.DEFAULT_UI_ELEMENTS.MESSAGE_INPUT);
        if (messageIsValid) {
            api_1.socket.send(JSON.stringify({ text: `${messageText}`, }));
        }
    }
    function exitingTheApplication() {
        const_3.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.innerHTML = '';
        const_3.messageHistory.clear();
        js_cookie_3.default.remove('token');
        js_cookie_3.default.remove('userEmail');
        api_1.socket.close();
        (0, view_1.autorisationEmailMenuOnUI)();
    }
    function getMessageHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageHistoryRequest = yield (0, api_1.getMessageHistoryOnServer)();
                const messageHistoryRequestIsNotValid = !(0, utils_4.serverAnswerIsValid)(messageHistoryRequest.status);
                if (messageHistoryRequestIsNotValid) {
                    throw new Error('The server could not provide information, please try again later');
                }
                const messageHistoryAnswer = yield messageHistoryRequest.json();
                const_3.messageHistory.timeline = [...messageHistoryAnswer.messages].reverse();
                displayPartOfMessages();
            }
            catch (error) {
                alert(error.message);
            }
        });
    }
    function displayPartOfMessages() {
        const currentIDofLastPost = const_3.messageHistory.counter;
        const nextIDofLastPost = currentIDofLastPost + const_3.messageHistory.perLoad;
        const fullMessageHistoryOnScreen = currentIDofLastPost >= (const_3.messageHistory.timeline.length - 1);
        if (fullMessageHistoryOnScreen) {
            return;
        }
        for (let postID = currentIDofLastPost; postID < nextIDofLastPost; postID++) {
            const lastMessageInHistoryDisplayed = postID === (const_3.messageHistory.timeline.length - 1);
            if (lastMessageInHistoryDisplayed) {
                (0, view_1.messageHistoryEndOnUI)();
                break;
            }
            (0, view_1.messageOnUI)(const_3.messageHistory.timeline[postID], 'history');
            const_3.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.lastElementChild.id = `${postID}`;
        }
        const_3.messageHistory.counter = nextIDofLastPost;
    }
    function scrollMessageScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            const scroolSize = const_3.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.clientHeight - const_3.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollHeight;
            const screenIsFullScrolled = scroolSize === const_3.DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.scrollTop;
            if (screenIsFullScrolled) {
                displayPartOfMessages();
            }
        });
    }
    function onlineMessageOnScreen(event) {
        const messageData = JSON.parse(event.data);
        (0, view_1.messageOnUI)(messageData, 'online');
    }
    exports.onlineMessageOnScreen = onlineMessageOnScreen;
});
