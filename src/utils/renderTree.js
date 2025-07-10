/**
 * Рендерит дерево в текстовом виде.
 * @param {TreeNode} root
 * @returns {string}
 */
export function renderTree(root) {
    const maxLens = [];
    calculateMaxLens(root, 0, maxLens);

    const lines = [];
    traverseAndRender(root, [], true, lines, 0, maxLens);
    return lines.join('\n');
}

/**
 * Рекурсивно собирает максимальную длину значения узлов на каждом уровне.
 * @param {TreeNode} node
 * @param {number} depth
 * @param {number[]} maxLens
 */
function calculateMaxLens(node, depth, maxLens) {
    const len = String(node.value).length;
    maxLens[depth] = Math.max(maxLens[depth] || 0, len);
    for (const child of node.children) {
        calculateMaxLens(child, depth + 1, maxLens);
    }
}

/**
 * Формирует префикс из вертикальных линий и пробелов.
 * @param {boolean[]} verticals - массив флагов по уровням
 * @param {number[]} maxLens - массив максимальных длин по уровням
 * @returns {string}
 */
function buildPrefix(verticals, maxLens) {
    const DASHES = 3;
    return verticals
        .map((drawLine, i) => {
            const width = maxLens[i] + DASHES;
            return drawLine ? '|' + ' '.repeat(width - 1) : ' '.repeat(width);
        })
        .join('');
}

/**
 * Рекурсивно обходит дерево и формирует строки.
 * @param {TreeNode} node
 * @param {boolean[]} verticals
 * @param {boolean} isLast
 * @param {string[]} lines
 * @param {number} depth
 * @param {number[]} maxLens
 */
function traverseAndRender(node, verticals, isLast, lines, depth, maxLens) {
    const valueStr = String(node.value);
    const maxLen = maxLens[depth];
    const DASHES = 3;

    const connectorLen = maxLen + DASHES - valueStr.length;
    const connector = node.children.length ? '-'.repeat(connectorLen) + '+' : '';

    const prefix = buildPrefix(verticals, maxLens);
    lines.push(`${prefix}${valueStr}${connector}`);

    const nextVerticals = [...verticals, !isLast];
    node.children.forEach((child, i) => {
        const childIsLast = i === node.children.length - 1;
        traverseAndRender(child, nextVerticals, childIsLast, lines, depth + 1, maxLens);
    });
}
