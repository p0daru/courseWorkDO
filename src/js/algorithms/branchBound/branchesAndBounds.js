// Pohorila Dariia
import * as matrixReduction from './reduction.js';
import * as preventCycle from './preventCycle.js';
// import * as setRowColumnInfinityJs from './setRowColumnInfinity.js';

// МЕТОД ГРАНИЦЬ І МЕЖ
export function branchAndBound(matrixData) {
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
    Node: objRoot.index + 1,
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
    // console.log(' Node: %d - Cost: %d ', objMinCost.index + 1, objMinCost.cost);

    minCostArray.push({
      Node: objMinCost.index + 1,
      cost: objMinCost.cost,
    });

    row = objMinCost.index;
    prevMatrix = objMinCost.matrix.map(row => row.slice());
    prevCost = objMinCost.cost;
  }

  // Витяг останнього значення cost з масиву minCostArray
  const lastCost = minCostArray[minCostArray.length - 1].cost;

  return { minCostArray, lastCost };
}

////// OUTPUT
////// DATA
// ТРИВАЛОСТІ УРОКІВ
// const trainingDuration = Generator.generateLessonDuration(numOfStudents);
// const trainingDuration = [40, 120, 90, 90, 60, 50, 60, 40];

// МАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ
// let matrix = Generator.generateMatrix(numOfStudents, tau, deltaTau);
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

// console.log('\nМАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ');
// console.table(matrix);

// console.log('\nВУЗЛИ');
// const { minCostArray, lastCost } = branchAndBound(matrix);
// console.log(minCostArray);

// console.log('\nРОЗКЛАД:');
// let schedule = results.printSchedule(minCostArray);
// console.log(schedule);

// console.log('\nСума переналаштувань:', lastCost, 'хв');

// const totalDuration = results.sumOfDurations(trainingDuration);
// console.log(`Тривалість уроків:`, totalDuration, 'хв');

// const totalWorkTime = results.calcTrainerWorkTime(totalDuration, lastCost);
// console.log('ЧАС РОБОТИ ТРЕНЕРА:', totalWorkTime, 'хв\n');
