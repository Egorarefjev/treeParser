import { parseTree } from './src/utils/parseTreeString.js';
import { renderTree } from './src/utils/renderTree.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.querySelector('.input');
    const buttonEl = document.querySelector('.btn');
    const outputEl = document.querySelector('.output');

    buttonEl.addEventListener('click', () => {
        const rawInput = inputEl.value.trim();

        if (!rawInput) {
            renderError(outputEl, 'Введите строку с деревом.');
            return;
        }

        if (!validateInput(rawInput)) {
            renderError(outputEl, 'Ошибка: в строке найдены недопустимые символы.');
            return;
        }

        try {
            const tree = parseTree(rawInput);
            console.log(tree, 'tree');
            const textTree = renderTree(tree);
            console.log(textTree, 'textTree');

            outputEl.textContent = textTree;
        } catch (error) {
            renderError(outputEl, `Ошибка: ${error.message}`);
        }
    });
});

/**
 * Проверяет, что строка содержит только цифры, пробелы и скобки.
 * @param {string} input
 * @returns {boolean}
 */
function validateInput(input) {
    const allowedChars = new Set(['(', ')', ' ']);
    for (const ch of input) {
        if (ch >= '0' && ch <= '9') continue;
        if (allowedChars.has(ch)) continue;
        return false;
    }
    return true;
}

/**
 * Выводит сообщение об ошибке в формате <pre>.
 * @param {HTMLElement} container
 * @param {string} message
 */
function renderError(container, message) {
    container.textContent = message;
}
