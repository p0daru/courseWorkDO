/**
 * Обчислює штраф для кожного нуля в матриці
 * @param {number[][]} matrix - Вхідна матриця
 * @return {number[][]} - Матриця штрафів
 */
export function calculatePenalties(matrix) {
  const penalties = []; // масив для матриці штрафів

  // Проходимося по кожному рядку матриці
  for (let i = 0; i < matrix.length; i += 1) {
    penalties[i] = []; // масив для рядка матриці штрафів

    // Проходимося по кожному елементу у рядку
    for (let j = 0; j < matrix[i].length; j += 1) {
      // Якщо знаходимо нуль
      if (matrix[i][j] === 0) {
        // console.log('нуль');
        penalties[i][j] = calculatePenaltyForRowAndColumn(matrix, i, j);
      } else {
        penalties[i][j] = null; // Штраф не обчислюється для не-нульових елементів
      }
    }
  }

  return penalties;
}

/**
 * Обчислює штраф для нуля у вказаному рядку та стовпці
 * @param {number[][]} matrix - Вхідна матриця
 * @param {number} row - Номер рядка
 * @param {number} column - Номер стовпця
 * @return {number} - Штраф для нуля
 */
export function calculatePenaltyForRowAndColumn(matrix, row, column) {
  // Фільтруємо значення рядка, виключаючи поточний нуль та Infinity
  const rowValues = matrix[row].filter(
    (value, index) => index !== column && value !== Infinity
  );

  // Фільтруємо значення стовпця, виключаючи Infinity
  const columnValues = matrix
    .map(row => row[column])
    .filter(value => value !== Infinity);

  // Знаходимо мінімальне значення рядка, якщо є такі значення
  const minRowValue = rowValues.length > 0 ? Math.min(...rowValues) : 0;

  // Знаходимо мінімальне значення стовпця, якщо є такі значення
  const minColumnValue =
    columnValues.length > 0 ? Math.min(...columnValues) : 0;

  // Повертаємо суму мінімальних значень рядка та стовпця
  return minRowValue + minColumnValue;
}

/**
 * Знаходить максимальний штраф та ребро
 * @param {number[][]} penaltiesMatrix - Матриця штрафів
 * @return {object} - Об'єкт з максимальним штрафом та його координатами { value, row, column }
 */
// Початковий масив для зберігання координат ребер
export let edgesArray = [];

export function findMaxPenalty(penaltiesMatrix) {
  let maxValue = -Infinity; //  максимальне значення штрафу (на початку ініціалізуємо як нуль)
  let maxRow = null; // номера рядка максимального штрафу
  let maxColumn = null; // номера стовпця максимального штрафу

  // Проходимося по кожному елементу матриці штрафів
  for (let i = 0; i < penaltiesMatrix.length; i += 1) {
    for (let j = 0; j < penaltiesMatrix[i].length; j += 1) {
      // Якщо поточний штраф більший за максимальний
      if (penaltiesMatrix[i][j] !== null && penaltiesMatrix[i][j] > maxValue) {
        maxValue = penaltiesMatrix[i][j]; // Оновлюємо максимальне значення штрафу
        maxRow = i; // Зберігаємо номер рядка поточного максимального штрафу
        maxColumn = j; // Зберігаємо номер стовпця поточного максимального штрафу
      } else if (
        penaltiesMatrix[i][j] !== null &&
        penaltiesMatrix[i][j] === maxValue
      ) {
        // Якщо є декілька максимальних значень, вибираємо той, де менше i та j
        if (i < maxRow || (i === maxRow && j < maxColumn)) {
          // Зберігаємо номер рядка та стовпця поточного максимального штрафу
          maxRow = i;
          maxColumn = j;
        }
      }
    }
  }

  // Додаємо координати рядка та стовпця максимального штрафу до масиву ребер
  edgesArray.push([maxRow + 1, maxColumn + 1]); // Додаємо координати рядка та стовпця (+1 для збігу з порядковим номером)

  // координати задаються не індексом, а порядковим номером (+1)
  return { value: maxValue, row: maxRow + 1, column: maxColumn + 1 };
}
