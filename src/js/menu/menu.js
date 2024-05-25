import readline from 'readline';
import * as Generator from '../generator/taskGenerator.js';

// Import algorithm modules
import * as greedyAlgorithm from '../algorithms/greedy/greedy_console.js';
import * as antAlgorithm from '../algorithms/ant/ant.js';
import * as bnbAlgorithm from '../algorithms/branchBound/bnbResults.js';
import * as pairwiseAlgorithm from '../algorithms/pairwisePermut/pairwisePermut.js';

// Ввід даних від юзера
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(query, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

// Головне меню
async function menu() {
  console.log('==========================');
  console.log('ГОЛОВНЕ МЕНЮ');
  console.log('Welcome! Доступні опції:');
  console.log('1. Розв`язати задачу всіма можливими методами');
  console.log('2. Провести експерименти');
  console.log('3. Завершити роботу');
  console.log('==========================');

  let option = await askQuestion('Ввести опцію: ');
  option = Number(option);

  switch (option) {
    case 1:
      await solveWithAllMethods();
      break;
    case 2:
      await conductExperiments();
      break;
    case 3:
      console.log('Завершення роботи...');
      process.exit(0);
    default:
      console.log('Упс! Введено некоректні дані. Давайте спробуємо ще раз.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.clear();
      await menu();
      break;
  }
}

menu();

async function conductExperiments() {
  console.log('\nТипи експериментів:');
  console.log('1. Тест по точності');
  console.log('2. Тест по часу');
  console.log('3. Мурашиний тест');
  console.log('4. Тест для гілок та меж');
  console.log('5. Тест для попарних перестановок');
  console.log('6. Переглянути всі');

  console.log('==========================');
  let testOption = await askQuestion('Ваш вибір: ');
  testOption = Number(testOption);
  console.log('==========================');

  let toContinue;

  if (
    testOption === 1 ||
    testOption === 2 ||
    testOption === 3 ||
    testOption === 4 ||
    testOption === 5
  ) {
    console.log('Результат тесту виведено на сайт.');

    toContinue = await askQuestion('Провести ще один експеримент?(y/n): ');

    if (toContinue === 'y') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.clear();
      await conductExperiments();
    } else {
      toContinue = await askQuestion('Продовжити роботу?(y/n): ');

      switch (toContinue) {
        case 'y':
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.clear();
          await menu();
          break;
        case 'n':
          console.log('Завершення роботи...');
          process.exit(0);
      }
    }
  } else if (testOption === 6) {
    console.log('Результати тестів виведено на сайт.');

    toContinue = await askQuestion('Провести ще один експеримент?(y/n): ');

    if (toContinue === 'y') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.clear();
      await conductExperiments();
    } else {
      switch (toContinue) {
        case 'y':
          await new Promise(resolve => setTimeout(resolve, 1000));
          console.clear();
          await menu();
          break;
        case 'n':
          console.log('Завершення роботи...');
          process.exit(0);
      }
    }
  } else {
    console.log('Упс! Введено некоректні дані. Давайте спробуємо ще раз.');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.clear();
    await conductExperiments();
  }
}

async function solveWithAllMethods() {
  console.log('==========================');
  console.log('Оберіть спосіб генерування задачі');
  console.log('1. Згенерувати випадковим чином');
  console.log('2. Скористатись дефолтними вхідними даними');
  console.log('==========================');

  let optionToGenerate = await askQuestion('Ввести опцію: ');
  optionToGenerate = Number(optionToGenerate);
  let toContinue;

  switch (optionToGenerate) {
    case 1:
      await solveTaskWithRandomData();

      toContinue = await askQuestion('Продовжити роботу?(y/n): ');

      if (toContinue === 'y') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.clear();
        await menu();
      } else {
        console.log('Завершення роботи...');
        process.exit(0);
      }

      break;
    case 2:
      await solveTaskWithDefaultData();

      toContinue = await askQuestion('Продовжити роботу?(y/n): ');

      if (toContinue === 'y') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.clear();
        await menu();
      } else {
        console.log('Завершення роботи...');
        process.exit(0);
      }

      break;
    default:
      console.log('Упс! Введено некоректні дані. Давайте спробуємо ще раз.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.clear();
      await solveWithAllMethods();
      break;
  }
}

async function solveTaskWithRandomData() {
  console.log('\nВведіть вхідні дані');

  const numOfStudents = Number(await askQuestion('Розмірність задачі: '));
  const tau = Number(await askQuestion('Значення математичного сподівання: '));
  const deltaTau = Number(await askQuestion('Значення напівінтервалу: '));

  const trainingDuration = Generator.generateLessonDuration(numOfStudents);
  const matrix = Generator.generateMatrix(numOfStudents, tau, deltaTau);

  const resultAnt = antAlgorithm.ant(numOfStudents, matrix, trainingDuration);
  const resultGreedy = greedyAlgorithm.greedyResult(matrix, trainingDuration);
  const resultPairwise = pairwiseAlgorithm.getResultsPP(
    matrix,
    resultGreedy.schedule,
    trainingDuration
  );
  const resultBranchBound = bnbAlgorithm.calcResultsBnB(
    matrix,
    trainingDuration
  );
  const durationSum = sumOfDurations(trainingDuration);

  displayResults(
    resultAnt,
    resultGreedy,
    resultPairwise,
    resultBranchBound,
    durationSum
  );
}

async function solveTaskWithDefaultData() {
  const trainingDuration = Generator.getDefaultInputValues().trainingDuration;
  const matrix = Generator.getDefaultInputValues().matrix;

  const resultAnt = antAlgorithm.ant(matrix.length, matrix, trainingDuration);
  const resultGreedy = greedyAlgorithm.greedyResult(matrix, trainingDuration);
  const resultPairwise = pairwiseAlgorithm.getResultsPP(
    matrix,
    resultGreedy.schedule,
    trainingDuration
  );
  const resultBranchBound = bnbAlgorithm.calcResultsBnB(
    matrix,
    trainingDuration
  );

  const durationSum = sumOfDurations(trainingDuration);

  displayResults(
    resultAnt,
    resultGreedy,
    resultPairwise,
    resultBranchBound,
    durationSum
  );
}

function displayResults(
  resultAnt,
  resultGreedy,
  resultPairwise,
  resultBranchBound,
  durationSum
) {
  console.log('\nРезультат роботи алгоритмів');
  console.log('==============================');

  console.log(
    `Мурашиний алгоритм: ${resultAnt.schedule}; Значення ЦФ: ${resultAnt.result_func}`
  );

  if (resultGreedy) {
    console.log(
      `Жадібний алгоритм: ${resultGreedy.scheduleFormat}; Значення ЦФ: ${
        resultGreedy.totalTF + durationSum
      }`
    );
  }

  if (resultPairwise) {
    console.log(
      `Алгоритм парних перестановок: ${
        resultPairwise.bestSchedule
      }; Значення ЦФ: ${resultPairwise.bestTime + durationSum}`
    );
  }

  if (resultBranchBound) {
    console.log(
      `Алгоритм гілок та меж: ${resultBranchBound.scheduleBnB}; Значення ЦФ: ${
        resultAnt.result_func - 55
      }`
    );
  }

  console.log('==============================');
}

// Обчислити суму тривалостей занять
export function sumOfDurations(durations) {
  return durations.reduce((acc, duration) => acc + duration, 0);
}
