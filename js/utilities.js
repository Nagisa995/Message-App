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

export function clearInput(input) {
    input.value = '';
}

export function getInputValue(input) {
    return input.value;
}