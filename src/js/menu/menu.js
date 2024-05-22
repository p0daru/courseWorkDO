import readline from 'readline';
import * as Generator from '../generator/taskGenerator.js';
import * as resultsBnB from '../algorithms/branchBound/bnbResults.js';

// import promptSync from 'prompt-sync';
// const prompt = promptSync();
// const result = prompt('hoe');
// prompt.start();

// Функція для вводу даних від юзера
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
  console.log('Ви обрали опцію ', option);
  console.log('==========================');

  switch (option) {
    case '1':
      await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза на 1 sec
      console.clear();
      console.log('Оберіть спосіб генерування задачі');
      console.log('1. Згенерувати випадковим чином');
      console.log('2. Скористатись дефолтними вхідними даними');

      // зчитання способу генерування від юзера
      let optionToGenerate = await askQuestion('Ввести опцію: ');

      if (optionToGenerate === '1') {
        // випадково
        console.log('\nВведіть вхідні дані');

        let numOfStudents = await askQuestion('Розмірність задачі: ');
        let tau = await askQuestion('Значення математичного сподівання: ');
        let deltaTau = await askQuestion('Значення напівінтервалу: ');

        ///// додати норм логіку валідації вхідних даних (в циклі для повторної спроби введення ??)
        const trainingDuration =
          Generator.generateLessonDuration(numOfStudents);
        const matrix = Generator.generateMatrix(numOfStudents, tau, deltaTau);

        // let res = results.calcResultsBnB(matrix, trainingDuration);
        // targetFunctions.push(res.totalWorkTimeBnB);
      } else if (optionToGenerate === '2') {
        // дефолтна матриця
        console.log('Скористатись дефолтними вхідними даними');
      } else {
        console.log('Некоректний вибір. Спробуйте ще раз.');
      }
      break;

    case '2':
      console.log('Провести експерименти');
      console.log('Обрати експеримент');
      //  логіка для експериментів
      break;

    case '3':
      console.log('Вивести дані задачі');
      break;

    case '4':
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

//   let isFinished = false;
//   while (!isFinished) {
//     console.log('==========================');
//     console.log('ГОЛОВНЕ МЕНЮ');
//     console.log('Welcome! Доступні опції:');
//     console.log('1. Розв`язати задачу всіма можливими методами');
//     console.log('2. Провести експерименти');
//     /**
//      * Всередині опції 1
//      * console.log('Обрати спосіб генерування задачі');
//      * console.log('1. Згенерувати випадковим чином');
//      * console.log('2. Скористатись дефолтними вхідними даними');
//      *
//      * Всередині опції 2
//      * console.log('Обрати експеримент');
//      *
//      */
//     console.log('2. Завершити роботу');
//     console.log('==========================');
//     // значення від користувача
//     // const rl = readline.createInterface({
//     //   input: process.stdin,
//     //   output: process.stdout,
//     // });
//     // let userInput; // Змінна для зберігання відповіді
//     // rl.question('Введіть щось: ', answer => {
//     //   console.log('Ви ввели: ' + answer);
//     //   userInput = answer; // Зберігаємо введення у змінну
//     //   rl.close();
//     // });
//     let option = await askQuestion('Ввести опцію: ');
//     switch (option) {
//       case 1:
//         console.log('Розв`язати задачу всіма можливими методами');
//         // inputIsCorrect = true;
//         break;
//       case 2:
//         console.log('Провести експерименти');
//         // inputIsCorrect = true;
//         break;
//       case 3:
//         console.log('Вивести дані задачі');
//         // inputIsCorrect = true;
//         break;
//       case 4:
//         console.log('Завершити роботу');
//         // inputIsCorrect = true;
//         break;
//       default:
//         console.log('Incorrect input. Try again!');
//       // inputIsCorrect = false;
//     }
//     // опрацювання некоректного інпуту (наприклад, введено опцію 7)
//     // while (!inputIsCorrect) {
//     //   inputIsCorrect = true;
//     // }
//     isFinished = true;
//   }
