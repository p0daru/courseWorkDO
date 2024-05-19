import * as Generator from '../../generator/taskGenerator.js';
import * as bnb from './branchesAndBounds.js';
import * as calcShowResults from './calcShowResults.js';

//////// РОЗВ`ЯЗОК ЗАДАЧІ МГтМ ТА ВИВЕДЕННЯ РЕЗУЛЬТАТІВ РОБОТИ АЛГОРИТМУ
export function calcResultsBnB(matrix, trainingDuration) {
  // Початок вимірювання часу
  const startTime = performance.now();

  // Виконання алгоритму гілок та границь
  let { minCostArray, lastCost } = bnb.branchAndBound(matrix);

  // Обчислення розкладу та часу роботи тренера
  let schedule = calcShowResults.printSchedule(minCostArray);
  let totalDuration = calcShowResults.sumOfDurations(trainingDuration);
  let totalWorkTime = calcShowResults.calcTrainerWorkTime(
    totalDuration,
    lastCost
  );

  // Завершення вимірювання часу та виведення результату
  const endTime = performance.now();
  const executionTimeBnB = endTime - startTime;

  return {
    totalWorkTimeBnB: totalWorkTime,
    scheduleBnB: schedule,
    executionTimeBnB,
  };
}

/**
 * Обчислює результати для заданих параметрів.
 * @param {number} numOfStudents - Кількість студентів.
 * @param {number} tau - Значення математичного сподівання.
 * @param {number} deltaTau - Значення напівінтервалу ∆τ.
 * @returns {Object} - Об'єкт з результатами.
 */
export function getResults(matrix, trainingDuration) {
  // Виконання алгоритму гілок та границь
  let { minCostArray, lastCost } = bnb.branchAndBound(matrix);

  // Обчислення розкладу та часу роботи тренера
  let schedule = calcShowResults.printSchedule(minCostArray);
  let totalDuration = calcShowResults.sumOfDurations(trainingDuration);
  let totalWorkTime = calcShowResults.calcTrainerWorkTime(
    totalDuration,
    lastCost
  );

  // Повернення об'єкта з усіма результатами
  return {
    trainingDuration,
    matrix,
    minCostArray,
    lastCost,
    schedule,
    totalDuration,
    totalWorkTime,
  };
}

/**
 * Виводить результати на консоль для заданих параметрів.
 * @param {number} numOfStudents - Кількість студентів.
 * @param {number} tau - Значення математичного сподівання.
 * @param {number} deltaTau - Значення напівінтервалу ∆τ.
 */
export function outputResultsBnB(matrix, trainingDuration) {
  // Отримання результатів
  const results = getResults(matrix, trainingDuration);

  // Виведення результатів на консоль
  console.log('ГЕНЕРАЦІЯ ІНДИВІДУАЛЬНОЇ ЗАДАЧІ...\n');
  console.log('1.ТРИВАЛІСТЬ ЗАЙНЯТЬ');
  console.table(results.trainingDuration);

  console.log('2.МАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ');
  console.table(results.matrix);

  console.log('\nПОШУК РОЗВ`ЯЗКУ МГтМ...');
  console.log('\nВузли');
  console.log(results.minCostArray);

  console.log('\nРозклад:');
  console.log(results.schedule);

  console.log('\nСума переналаштувань:', results.lastCost, 'хв');
  console.log('Тривалість уроків:', results.totalDuration, 'хв');
  console.log('Час роботи тренера:', results.totalWorkTime, 'хв\n');

  return results.totalWorkTime;
}

// Test Case
// try {
//   const numOfStudents = 8;
//   const tau = 50;
//   const deltaTau = 10;

//   // outputResultsBnB(numOfStudents, tau, deltaTau);
//   // let results = getResults(numOfStudents, tau, deltaTau);
//   // console.log(results);
// } catch (error) {
//   console.error('Помилка:', error.message);
// }
