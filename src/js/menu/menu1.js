import readline from 'readline';
import * as Generator from '../generator/taskGenerator.js';
import * as greedyAlgorithm from '../algorithms/greedy/greedy.js';
import * as resultsBnB from '../algorithms/branchBound/bnbResults.js';
import * as antAlgorithm from '../algorithms/ant/ant.js';
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

  let option = await askQuestion('Ввести опцію: ');
  option = Number(option); // Number перетворює рядок введений юзером у число
  console.log('==========================');

  switch (option) {
    // Розв`язати задачу всіма можливими методами
    case 1:
      await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза на 1 sec
      console.clear(); // очистити консоль
      console.log('==========================');
      console.log('Оберіть спосіб генерування задачі');
      console.log('1. Згенерувати випадковим чином');
      console.log('2. Скористатись дефолтними вхідними даними');

      let optionToGenerate = await askQuestion('Ввести опцію: '); // ввід опції від юзера
      console.log('==========================');
      optionToGenerate = Number(optionToGenerate);

      // Згенерувати випадковим чином
      if (optionToGenerate === 1) {
        console.log('\nВведіть вхідні дані');

        // параметри, перетворені в число
        const numOfStudents = Number(await askQuestion('Розмірність задачі: '));
        const tau = Number(
          await askQuestion('Значення математичного сподівання: ')
        );
        const deltaTau = Number(await askQuestion('Значення напівінтервалу: '));

        // випадкова генерація тривалості занять і матриці
        const trainingDuration =
          Generator.generateLessonDuration(numOfStudents);
        const matrix = Generator.generateMatrix(numOfStudents, tau, deltaTau);

        // Ant
        let resultAnt = antAlgorithm.ant(
          numOfStudents,
          matrix,
          trainingDuration
        );

        // Greedy
        let resultGreedy = greedyAlgorithm.getGreedyResults(matrix);

        // Pairwise
        let resultPairwise = pairwiseAlgorithm.getResultsPP(
          matrix,
          resultGreedy.schedule,
          trainingDuration
        );

        // BnB
        let resultBranchBound = resultsBnB.calcResultsBnB(
          matrix,
          trainingDuration
        );

        console.log(
          `\nРезультат роботи мурашиного алгоритму: ${resultAnt.schedule}; значення ЦФ: ${resultAnt.result_func}`
        );
        console.log(
          `Результат роботи жадібного алгоритму: ${resultGreedy.schedule}; значення ЦФ: ${resultGreedy.totalPreparationTime}`
        );
        console.log(
          `Результат роботи алгоритму попарних перестановок: ${resultPairwise.bestSchedule}; значення ЦФ: ${resultPairwise.bestTime}`
        );
        console.log(
          `Результат роботи алгоритму гілок та меж: ${resultBranchBound.scheduleBnB}; значення ЦФ: ${resultBranchBound.totalWorkTimeBnB}`
        );

        console.log('==============================');
      } else if (optionToGenerate === 2) {
        // Скористатись дефолтними вхідними даними
        const trainingDuration =
          Generator.getDefaultInputValues().trainingDuration;
        const matrix = Generator.getDefaultInputValues().matrix;

        // Ant
        let resultAnt = antAlgorithm.ant(
          matrix.length,
          matrix,
          trainingDuration
        );

        // BnB
        let resultsBranchBound = resultsBnB.calcResultsBnB(
          matrix,
          trainingDuration
        );

        // вивести розв`язок
        console.log('\nРозв`язок задачі всіма алгоритмами');
        console.log('==============================');
        console.log(
          `Результат роботи мурашиного алгоритму: ${resultAnt.schedule}; значення ЦФ: ${resultAnt.result_func}`
        );
        console.log(
          `Результат роботи алгоритму гілок та меж: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
        );
        console.log('==============================');
      } else {
        console.log('Некоректний вибір. Спробуйте ще раз.');
      }
      break;

    //
    case 2:
      //   console.log('Типи експериментів:');
      //   console.log('1. Тест по точності');
      //   console.log('2. Тест по часу');
      //   console.log('3. Мурашиний тест');
      //   console.log('4. Тест для гілок та меж');
      //   console.log('5. Тест для попарних перестановок');
      //   console.log('6. Переглянути всі');

      //   let testOption = await askQuestion('Обрати експеримент: ');
      //   testOption = Number(testOption);

      break;

    case 3:
      console.log('Завершити роботу');
      break;

    default:
      // console.log('');
      console.log('Упс! Введено некоректні дані. Давайте спробуємо ще раз.');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза на 1 sec
      console.clear();
      menu(); // Перезапустити меню у випадку неправильного вводу
      break;
  }
}

menu();
