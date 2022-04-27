export function switchOptionalMenu (menu) {
    const userOpensOptionalMenu = menu.classList.contains('hidden');
    if (userOpensOptionalMenu) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}