// Pohorila Dariia
import * as Generator from '../../generator/taskGenerator.js';
import * as matrixReduction from './reduction.js';
import * as preventCycle from './preventCycle.js';

// МАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ
console.log('\nМАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ');
let matrix = Generator.generateMatrix(8, 15, 5);
console.table(matrix);

// let matrix = [
//   [Infinity, 15, Infinity, 20, Infinity, 5, Infinity, 10],
//   [5, Infinity, 15, Infinity, 5, Infinity, 10, Infinity],
//   [Infinity, 20, Infinity, 15, Infinity, 5, Infinity, 5],
//   [10, Infinity, 20, Infinity, 5, Infinity, 10, Infinity],
//   [Infinity, 15, Infinity, 15, Infinity, 5, Infinity, 5],
//   [10, Infinity, 15, Infinity, 10, Infinity, 10, Infinity],
//   [Infinity, 20, Infinity, 20, Infinity, 10, Infinity, 5],
//   [5, Infinity, 15, Infinity, 5, Infinity, 5, Infinity],
// ];

// Метод границь і меж
function branchAndBound(matrixData) {
  // Встановлення нескінченності на діагоналі матриці
  for (let i = 0; i < matrixData.length; i += 1) {
    for (let j = 0; j < matrixData.length; j += 1) {
      if (i == j) {
        matrixData[i][j] = Infinity;
      }
    }
  }

  const minCostArray = []; // Масив для збереження мінімальної вартості
  const objRoot = matrixReduction.reduceMatrix(matrixData, 0); // Початкова редукція матриці
  minCostArray.push({
    index: objRoot.index,
    cost: objRoot.cost,
  });

  let row = objRoot.index; // Початковий рядок
  let prevMatrix = objRoot.matrix.map(row => row.slice());
  let prevCost = objRoot.cost; // Початкова вартість

  // Прохід по всіх рядках матриці
  for (let index = 0; index < matrixData.length - 1; index++) {
    let objArrayTemp = []; // Тимчасовий масив для збереження вузлів
    for (let column = 1; column < matrixData.length; column++) {
      const infRowColumn = preventCycle.setRowColumnInfinity(
        prevMatrix,
        row,
        column
      ); // Встановлення нескінченності у рядках та стовпцях
      const objNode = matrixReduction.reduceMatrix(infRowColumn, column); // Редукція нової матриці

      objNode.cost = objNode.cost + prevCost + prevMatrix[row][column]; // Оновлення вартості вузла
      objArrayTemp.push(objNode); // Додавання вузла до тимчасового масиву
      //   console.log("Node: %d - Cost: %d", objNode.index, objNode.cost);
    }

    // Знаходження вузла з мінімальною вартістю
    let objMinCost = objArrayTemp.reduce(function (prev, curr) {
      return prev.cost < curr.cost ? prev : curr;
    });
    console.log(' Node: %d - Cost: %d ', objMinCost.index + 1, objMinCost.cost);

    minCostArray.push({
      index: objMinCost.index,
      cost: objMinCost.cost,
    });

    row = objMinCost.index;
    prevMatrix = objMinCost.matrix.map(row => row.slice());
    prevCost = objMinCost.cost;
  }

  // Витяг останнього значення cost з масиву minCostArray
  const lastCost = minCostArray[minCostArray.length - 1].cost;
  // console.log('Сума переналаштувань:', lastCost);

  return { minCostArray, lastCost };
}

console.log('\nВУЗЛИ');
const { minCostArray, lastCost } = branchAndBound(matrix);

console.log('\nminCostArray:\n');
minCostArray.forEach((item, index) => {
  console.log(`Index: ${index}, Cost: ${item.cost}`);
});

console.log('\nСума переналаштувань:', lastCost);

// ТРИВАЛОСТІ УРОКІВ
function sumOfDurations(durations) {
  return durations.reduce((acc, duration) => acc + duration, 0);
}

const trainingDuration = [40, 120, 90, 90, 60, 50, 60, 40];
const totalDuration = sumOfDurations(trainingDuration);
console.log(`Тривалість уроків: `, totalDuration); // Total duration: 550 minutes

function calcTrainerWorkTime(totalDuration, lastCost) {
  return totalDuration + lastCost;
}

const totalWorkTime = calcTrainerWorkTime(totalDuration, lastCost);
console.log('Загальний час роботи тренера', totalWorkTime, '\n');
