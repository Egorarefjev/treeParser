/**
 * Парсит строку с описанием дерева в объектную структуру дерева.
 * Формат строки: числа и вложенные скобки, например "(1 (2 (4 5 6 (7) 108 (9)) 3))"
 *
 * @param {string} str - Входная строка с деревом.
 * @returns {TreeNode|null} Корень дерева или null, если пусто.
 */
export function parseTree(str) {
    const stack = [];               // Стек для отслеживания текущих родителей (иерархия)
    let numberBuffer = '';          // Буфер для накопления цифр числа
    let root = null;                // Корень дерева (первый узел)

    for (const currentChar of str) {
        if (isDigit(currentChar)) {
            numberBuffer += currentChar;  // Накопление цифр числа
            continue;
        }

        if (numberBuffer) {
            const node = createNodeFromNumber(numberBuffer); // Создаём узел из числа
            numberBuffer = '';                                // Очищаем буфер

            attachNode(stack, node);                          // Присоединяем к текущему родителю
            if (!root) root = node;                           // Если корня ещё нет — сохраняем
        }

        if (currentChar === '(') {
            handleOpenBracket(stack, root);                   // Обработка новой вложенности
        } else if (currentChar === ')') {
            stack.pop();                                      // Закрываем вложенность
        }
    }

    if (numberBuffer) {
        const node = createNodeFromNumber(numberBuffer);      // Обработка числа в конце строки
        attachNode(stack, node);
        if (!root) root = node;
    }

    return root;                                               // Возвращаем корень дерева
}



function isDigit(character) {
    if (typeof character === 'number') {
        return Number.isInteger(character) && character >= 0 && character <= 9;
    }
    if (typeof character === 'string') {
        return character.length === 1 && character >= '0' && character <= '9';
    }
    return false;
}


/**
 * Создаёт новый узел дерева с числовым значением.
 *
 * @param {string} numberStr - Строковое число.
 * @returns {TreeNode} Узел дерева.
 */
function createNodeFromNumber(numberStr) {
    return { value: Number(numberStr), children: [] };
}

/**
 * Добавляет узел как ребёнка к последнему родителю в стеке.
 *
 * @param {Array<TreeNode>} stack - Стек текущих родителей.
 * @param {TreeNode} node - Узел для добавления.
 */
function attachNode(stack, node) {
    if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.children.push(node);
    }
}

/**
 * Обрабатывает открывающую скобку '(' — управляет стеком родителей.
 *
 * @param {Array<TreeNode>} stack - Стек текущих родителей.
 * @param {TreeNode|null} root - Корень дерева.
 */
function handleOpenBracket(stack, root) {
    if (stack.length === 0 && root) {
        stack.push(root);
        return;
    }

    if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        const lastChild = parent.children[parent.children.length - 1];
        if (lastChild) stack.push(lastChild);
    }
}

/**
 * @typedef {Object} TreeNode
 * @property {number} value - Значение узла.
 * @property {TreeNode[]} children - Массив дочерних узлов.
 */
