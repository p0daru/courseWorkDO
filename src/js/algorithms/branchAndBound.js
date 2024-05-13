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

// Віднімання мінімумів по рядках
function subEveryRow(matrix, minBorder) {
  const mins = minFromRows(matrix);
  minBorder += mins.reduce((acc, curr) => acc + curr, 0);

  const newMatrix = matrix.map((row, i) =>
    row.map((value, j) => value - mins[i])
  );

  return { matrix: newMatrix, minBorder };
}

let { matrix: newMatrixRows, minBorder: newMinBorderRows } = subEveryRow(
  precedenceMatrix,
  0
);
console.log('Матриця після віднімання мінімумів по рядках:', newMatrixRows);
console.log('Нова мінімальна границя:', newMinBorderRows);

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

///// штрафи
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
