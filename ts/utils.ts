import Cookies from 'js-cookie'

export function getCookieToken():string | undefined {
    return Cookies.get('token');
}

export function querySelectorIDCall(selector: string): HTMLElement {
    const domElement = <HTMLElement> document.querySelector(`${selector}`);
    return domElement
}

export function switchOptionalMenu(menu: HTMLElement): void {
    const userOpensOptionalMenu: boolean = menu.classList.contains('hidden');
    if (userOpensOptionalMenu) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

export function notEmptyInput(value: string): boolean {
    return value.split(' ').join('') !== '';
}

export function serverAnswerIsValid(answerStatus: number): boolean {
    return (answerStatus !== 404 && answerStatus !== 500);
}

export function clearInput(input: HTMLInputElement): void {
    input.value = '';
}

export function getInputValue(input: HTMLInputElement): string {
    return input.value;
}