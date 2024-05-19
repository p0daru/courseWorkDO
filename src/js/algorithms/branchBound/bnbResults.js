// Pohorila Dariia
import * as Generator from '../../generator/taskGenerator.js';
import * as bnb from './branchesAndBounds.js';
import * as calcShowResults from './calcShowResults.js';

// Результати роботи МГтМ
export function resultsBnB(numOfStudents, tau, deltaTau) {
  // Перевірка вхідних даних
  if (
    !Number.isInteger(numOfStudents) ||
    numOfStudents <= 0 ||
    numOfStudents % 2 !== 0 || // к-сть учнів - парне число
    tau < 0 ||
    deltaTau < 0
  ) {
    throw new Error(
      'Неправильні вхідні дані! Очікується ціле додатнє число numOfStudents додатне і парне , tau >= 0 та deltaTau >= 0.'
    );
  }

  console.log('ГЕНЕРАЦІЯ ІНДИВІДУАЛЬНОЇ ЗАДАЧІ...\n');
  console.log('1.ТРИВАЛІСТЬ ЗАЙНЯТЬ');
  const trainingDuration = Generator.generateLessonDuration(numOfStudents);
  console.table(trainingDuration);

  console.log('2.МАТРИЦЯ ПЕРЕНАЛАШТУВАНЬ');
  const matrix = Generator.generateMatrix(numOfStudents, tau, deltaTau);
  console.table(matrix);

  console.log('\nПОШУК РОЗВ`ЯЗКУ МГтМ...');
  console.log('\nВузли');
  let { minCostArray, lastCost } = bnb.branchAndBound(matrix);
  console.log(minCostArray);

  console.log('\nРозклад:');
  let schedule = calcShowResults.printSchedule(minCostArray);
  console.log(schedule);

  console.log('\nСума переналаштувань:', lastCost, 'хв');

  let totalDuration = calcShowResults.sumOfDurations(trainingDuration);
  console.log(`Тривалість уроків:`, totalDuration, 'хв');

  let totalWorkTime = calcShowResults.calcTrainerWorkTime(
    totalDuration,
    lastCost
  );
  console.log('Час роботи тренера:', totalWorkTime, 'хв\n');

  return { totalWorkTime, schedule };
}

const numOfStudents = 8;
const tau = 100;
const deltaTau = 10;

resultsBnB(numOfStudents, tau, deltaTau);
