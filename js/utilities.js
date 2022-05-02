import { DEFAULT_UI_ELEMENTS } from "./const";

export function switchOptionalMenu (menu) {
    const userOpensOptionalMenu = menu.classList.contains('hidden');
    if (userOpensOptionalMenu) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

export function notEmptyInput(value) {
    return value.split(' ').join('') !== '';
}

export function serverAnswerIsValid(answerStatus) {
    return (answerStatus !== 404 && answerStatus !== 500);
}

export function serverFail() {
    return 
}

export function defaultHistoryID() {
    const historyStart = document.createElement('div');
    historyStart.id = -1;
    DEFAULT_UI_ELEMENTS.MESSAGE_SCREEN.append(historyStart);
}

export function clearInput(input) {
    input.value = '';
}

export function getInputValue(input) {
    return input.value;
}