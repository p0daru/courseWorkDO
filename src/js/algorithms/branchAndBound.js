// Pohorila Dariia
import { generateMatrix } from '/js/generator/taskGenerator';

// let matrix = generateMatrix(8, 15, 5);
// console.table(matrix);

/**
 * АЛГОРИТМ
 * 1. мінімальні по рядках
 * 2. мін по стовпцях
 * 3. зведення матриці
 *
 * 4. штрафи
 * 5. виключить даний стовпець і рядок з матриці
 * 6. заборонить гамільтоновий цикл
 */

let precedenceMatrix = [
  [Infinity, 15, Infinity, 20, Infinity, 5, Infinity, 10],
  [5, Infinity, 15, Infinity, 5, Infinity, 10, Infinity],
  [Infinity, 20, Infinity, 15, Infinity, 5, Infinity, 5],
  [10, Infinity, 20, Infinity, 5, Infinity, 10, Infinity],
  [Infinity, 15, Infinity, 15, Infinity, 5, Infinity, 5],
  [10, Infinity, 15, Infinity, 10, Infinity, 10, Infinity],
  [Infinity, 20, Infinity, 20, Infinity, 10, Infinity, 5],
  [5, Infinity, 15, Infinity, 5, Infinity, 5, Infinity],
];

console.log(precedenceMatrix);

// Знаходження мінімальних елементів по рядкам
function minFromRows(matrix) {
  return matrix.map(row => Math.min(...row));
}

let minsByRows = minFromRows(precedenceMatrix);
console.log('Мінімальні по рядкам:', minsByRows.join(' '));

// Віднімання мінімумів по рядках
// function subEveryRow(matrix, minBorder) {
//   const mins = minFromRows(matrix);
//   minBorder += mins.reduce((acc, curr) => acc + curr, 0);

//   const newMatrix = matrix.map((row, i) =>
//     row.map((value, j) => value - mins[i])
//   );

//   return { matrix: newMatrix, minBorder };
// }

// let { matrix: newMatrixRows, minBorder: newMinBorderRows } = subEveryRow(
//   precedenceMatrix,
//   0
// );
// console.log('Матриця після віднімання мінімумів по рядках:', newMatrixRows);
// console.log('Нова мінімальна границя:', newMinBorderRows);

// Знаходження мінімальних елементів по стовпцях
function minFromColumns(matrix) {
  const mins = [];
  const columns = Object.keys(matrix[0]);

  columns.forEach(column => {
    const columnValues = matrix.map(row => row[column]);
    mins[column] = Math.min(...columnValues);
  });

  return mins;
}

let minsByCols = minFromColumns(precedenceMatrix);
console.log('Мінімальні по стовпцях:', minsByCols.join(' '));

// Віднімання мінімумів по стовпцях
function subEveryColumn(matrix, minBorder) {
  const mins = minFromColumns(matrix);
  minBorder += Object.values(mins).reduce((acc, curr) => acc + curr, 0);

  const newMatrix = matrix.map((row, i) =>
    row.map((value, j) => value - mins[j])
  );

  return { matrix: newMatrix, minBorder };
}

let { matrix: newMatrixCols, minBorder: newMinBorderCols } = subEveryColumn(
  precedenceMatrix,
  0
);
console.log('Матриця після віднімання мінімумів по стовпцях:', newMatrixCols);
console.log('Нова мінімальна границя:', newMinBorderCols);

/////========= ЕТАП-2. ОБЧИСЛЕННЯ ШТРАФІВ ===========////
/**
 * Обчислює штраф для кожного нуля в матриці
 * @param {number[][]} matrix - Вхідна матриця
 * @return {number[][]} - Матриця штрафів
 */
function calculatePenalties(matrix) {
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
function calculatePenaltyForRowAndColumn(matrix, row, column) {
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

// Приклад використання
let penaltiesMatrix = calculatePenalties(newMatrixCols);
console.log('Матриця штрафів для нулів:', penaltiesMatrix);

/**
 * ПОШУК МАКСИМАЛЬНОГО ШТРАФУ
 * @param {number[][]} penaltiesMatrix - Матриця штрафів
 * @return {object} - Об'єкт з максимальним штрафом та його координатами { value, row, column }
 */
function findMaxPenalty(penaltiesMatrix) {
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

  // координати задаються порядковим номером
  return { value: maxValue, row: maxRow + 1, column: maxColumn + 1 };
}

// Приклад використання
let maxPenalty = findMaxPenalty(penaltiesMatrix);
console.log('Максимальний штраф:', maxPenalty.value);
console.log(`Координати: (${maxPenalty.row}, ${maxPenalty.column})`);

/**
 * Заміна значень рядка та стовпця на Infinity
 * @param {number[][]} matrix - Вхідна матриця
 * @param {number} row - Номер рядка
 * @param {number} column - Номер стовпця
 * @return {number[][]} - Матриця зі зміненими значеннями
 */
function replaceRowAndColumnWithInfinity(matrix, row, column) {
  const newMatrix = matrix.map((r, i) =>
    r.map((value, j) => (i === row || j === column ? Infinity : value))
  );
  return newMatrix;
}

// Приклад використання
let modifiedMatrix = replaceRowAndColumnWithInfinity(
  newMatrixCols,
  maxPenalty.row - 1,
  maxPenalty.column - 1
);
console.log('Матриця після заміни на Infinity:', modifiedMatrix);

// function doOperations(modifiedMatrix, minBorder) {
//   console.log(subEveryRow(modifiedMatrix, minBorder));
//   console.log(subEveryColumn(modifiedMatrix, minBorder));
// }

// doOperations(modifiedMatrix, newMinBorderCols);

/**
 * Предотвращение негамильтоновых контуров (циклов)
 * Изменяет path
 * @param {number[][]} matrix - Вхідна матриця
 * @param {number[][]} path - Матриця шляхів
 * @return {number[][]} - Матриця зі зміненими значеннями
 */
function preventCycle(matrix, path) {
  // console.log('Поиск циклов');
  let paths = path;
  let pathCopy = [...path];
  for (let row in paths) {
    let column = paths[row];
    if (matrix[column][row] !== undefined) {
      matrix[column][row] = Infinity;
    }
    for (let rowCopy in pathCopy) {
      let columnCopy = pathCopy[rowCopy];
      if (row === columnCopy) {
        paths[rowCopy] = column;
        delete paths[row];
        if (matrix[rowCopy][column] !== undefined) {
          matrix[rowCopy][column] = Infinity;
        }
        if (matrix[column][rowCopy] !== undefined) {
          matrix[column][rowCopy] = Infinity;
        }
        console.log(`Цикл найден. уничтожен [${rowCopy}][${column}]`);
        return preventCycle(matrix, paths);
      }
    }
  }
  console.log('Цикл не найден');
  return matrix;
}

let path = {
  4: 5,
};

let resultMatrix = preventCycle(modifiedMatrix, path);
console.log('Матриця після уникнення циклів:', resultMatrix);

// //// НЕГАМІЛЬТОНОВІ ЦИКЛИ
// /**
//  * Предотвращение негамильтоновых контуров (циклов)
//  * изменяет path
//  * @param {number[][]} table
//  * @param {number[]} path
//  * @return {number[][]}
//  */
// function preventCycle(table, path) {
//   console.log('Поиск циклов');
//   let paths = path.slice();
//   let pathCopy = path.slice();

//   for (let row = 0; row < paths.length; row++) {
//     let column = paths[row];

//     if (table[column][row] !== undefined) {
//       table[column][row] = Infinity;
//     }

//     for (let rowCopy = 0; rowCopy < pathCopy.length; rowCopy++) {
//       let columnCopy = pathCopy[rowCopy];

//       if (row === columnCopy) {
//         paths[rowCopy] = column;
//         paths.splice(row, 1);

//         if (table[rowCopy][column] !== undefined) {
//           table[rowCopy][column] = Infinity;
//         }
//         if (table[column][rowCopy] !== undefined) {
//           table[column][rowCopy] = Infinity;
//         }

//         console.log('Цикл найден. Уничтожен [' + rowCopy + '][' + column + ']');
//         return preventCycle(table, paths);
//       }
//     }
//   }

//   console.log('Цикл не найден');
//   return table;
// }

//============ELSE ELSE ELSE==========================
/**
 * Подсчитывает штрафы у нулей
 * Возвращает максимальное значение
 * и массив с координатами нулей и их штрафами
 * @return array
 */
// function zeroDegreeMax(matrix) {
//   console.log('Начало подсчета штрафов у нулей');
//   let sumsArr = [];
//   for (let i = 0; i < matrix.length; i += 1) {
//     sumsArr[i] = [];
//     for (let j = 0; j < matrix[i].length; j += 1) {
//       if (matrix[i][j] === 0) {
//         sumsArr[i][j] = sumMinRowColumn(matrix, i, j);
//       }
//     }
//   }
//   let str = 'Подсчитанные степени у нулей:';
//   sumsArr.forEach((row, i) => {
//     row.forEach((value, j) => {
//       str += `<br>(${i}:${j})=${value}`;
//     });
//   });
//   console.log(str);
//   console.log('Конец подсчета штрафов у нулей');
//   let max = sumsArr.map(row => Math.max(...row));
//   console.log('Максимумы по строкам:' + max.join(' '));
//   return [Math.max(...max), sumsArr];
// }

// /**
//  * Подсчитывает штраф нуля с координатами row:column
//  * @param {number} row
//  * @param {number} column
//  * @return {number}
//  */
// function sumMinRowColumn(matrix, row, column) {
//   let rowArr = matrix[row];
//   let columnArr = [];
//   const columns = Object.keys(matrix[0]);

//   for (let i = 0; i < matrix.length; i++) {
//     if (i !== row) {
//       columnArr.push(matrix[i][column]);
//     }
//   }

//   delete rowArr[column];
//   return Math.min(...rowArr) + Math.min(...columnArr);
// }

// console.log(zeroDegreeMax(newMatrixCols));

//=======================================
// function zeroDegreeMax(matrix) {
//   const sumsArr = matrix.map((row, i) =>
//     row.map((_, j) =>
//       matrix[i][j] === 0 ? sumMinRowColumn(matrix, i, j) : undefined
//     )
//   );

//   const max = sumsArr.map(row =>
//     Math.max(...row.filter(val => val !== undefined))
//   );
//   return [Math.max(...max), sumsArr];
// }

// console.log(zeroDegreeMax(precedenceMatrix));

// function zeroDegreePosition(matrix) {
//   const [max, sumsArr] = zeroDegreeMax(matrix);
//   const coords = [];
//   sumsArr.forEach((row, i) =>
//     row.forEach((value, j) => {
//       if (value === max) {
//         coords.push({ row: i, column: j });
//       }
//     })
//   );
//   return coords;
// }

// let zeroDegreePositions = zeroDegreePosition(precedenceMatrix);
// console.log(
//   `Максимальна степень 0 находятся на позициях ${zeroDegreePositions
//     .map(coord => `(${coord.row},${coord.column})`)
//     .join(' ')}`
// );
