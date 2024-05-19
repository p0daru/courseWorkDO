import * as Generator from '../generator/taskGenerator.js';
import * as resultsBnB from '../algorithms/branchBound/bnbResults.js';

// Вхідні дані
const numOfStudents = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // розмірність задачі
const tau = 100; // значення математичного сподівання
const deltaTau = 10; // значення напівінтервалу

// function timeTest(numOfStudents, tau, deltaTau) {
//   // Часи виконання алгоритмів
//   let execTimeGreedy = [];
//   let execTimeAnt = [];
//   let execTimeBnB = [];
//   let execTimePairwise = [];

//   // Середні часи виконання алгоритмів
//   let aveTimeGreedy = [];
//   let aveTimeAnt = [];
//   let aveTimeBnB = [];
//   let aveTimePairwise = [];

//   let execTimes = [];
//   let aveTimes = [];

//   for (let i = 0; i < numOfStudents.length; i += 1) {
//     execTimeGreedy = [];
//     execTimeAnt = [];
//     execTimeBnB = [];
//     execTimePairwise = [];

//     // 20 прогонів
//     for (let j = 0; j < 20; j += 1) {
//       // Генеруємо тривалості уроків
//       const trainingDuration = Generator.generateLessonDuration(
//         numOfStudents[i],
//         tau,
//         deltaTau
//       );

//       // Генеруємо матрицю переналаштувань
//       const matrix = Generator.generateMatrix(numOfStudents[i], tau, deltaTau);

//       // Обчислюємо роботи алгоритмів
//       let resBnB = resultsBnB.calcResultsBnB(matrix, trainingDuration);

//       // Додаємо часи в масив відповідного алгоритму
//       execTimeBnB.push(resBnB.executionTimeBnB);
//     }

//     const averageTimeBnB = average(execTimeBnB);
//     // Округлення до двох знаків після коми
//     aveTimeBnB.push(parseFloat(averageTimeBnB.toFixed(2)));
//   }

//   aveTimes.push(aveTimeGreedy, aveTimeAnt, aveTimeBnB, aveTimePairwise);
//   execTimes.push(execTimeGreedy, execTimeAnt, execTimeBnB, execTimePairwise);

//   return { execTimes, aveTimes };
// }

function timeTest(numOfStudents, tau, deltaTau) {
  // Часи виконання алгоритмів та середні часи виконання алгоритмів
  const execTimes = [];
  const aveTimes = [];

  for (let i = 0; i < numOfStudents.length; i += 1) {
    let execTimeBnB = [];
    let execTimeGreedy = [];
    let execTimeAnt = [];
    let execTimePairwise = [];

    // 20 прогонів
    for (let j = 0; j < 20; j += 1) {
      // Генеруємо тривалості уроків та матрицю переналаштувань
      const trainingDuration = Generator.generateLessonDuration(
        numOfStudents[i],
        tau,
        deltaTau
      );
      const matrix = Generator.generateMatrix(numOfStudents[i], tau, deltaTau);

      // Обчислюємо роботи алгоритмів
      const resBnB = resultsBnB.calcResultsBnB(matrix, trainingDuration);

      // Додаємо часи в масив відповідного алгоритму
      execTimeBnB.push(resBnB.executionTimeBnB);
      execTimeGreedy.push(resBnB.executionTimeBnB);
      execTimeAnt.push(resBnB.executionTimeBnB);
      execTimePairwise.push(resBnB.executionTimeBnB);
    }

    // Округлення до двох знаків після коми та додавання до середніх часів
    const averageTimeBnB = parseFloat(average(execTimeBnB).toFixed(2));
    const averageTimeGreedy = parseFloat(average(execTimeBnB).toFixed(2));
    const averageTimeAnt = parseFloat(average(execTimeBnB).toFixed(2));
    const averageTimePairwise = parseFloat(average(execTimeBnB).toFixed(2));

    aveTimes.push([
      [averageTimeGreedy],
      [averageTimeAnt],
      [averageTimeBnB],
      [averageTimePairwise],
    ]);
    execTimes.push([
      [execTimeGreedy],
      [execTimeAnt],
      execTimeBnB,
      [execTimePairwise],
    ]);
  }

  return { execTimes, aveTimes };
}

function average(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

console.log(timeTest(numOfStudents, tau, deltaTau));
