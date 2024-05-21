/**
 * Welcome! Обери опцію:
 *
 * 1. Розв`язати задачу всіма можливими методами
 * 2. Провести експерименти
 * 3. Вивести дані задачі
 * 4. Завершити роботу
 */

import * as resultsBnB from '../algorithms/branchBound/bnbResults.js';
import readline from 'readline';

// import promptSync from 'prompt-sync';
// const prompt = promptSync();
// const result = prompt('hoe');
// prompt.start();

async function menu() {
  let isFinished = false;

  while (!isFinished) {
    console.log('==========================');
    console.log('ГОЛОВНЕ МЕНЮ');
    console.log('Welcome! Доступні опції:');
    console.log('1. Розв`язати задачу всіма можливими методами');
    console.log('2. Провести експерименти');

    /**
     * Всередині опції 1
     * console.log('Обрати спосіб генерування задачі');
     * console.log('1.2 Згенерувати випадковим чином');
     * console.log('2.2 Скористатись дефолтними вхідними даними');
     *
     */

    console.log('2. Завершити роботу');
    console.log('==========================');

    // значення від користувача
    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    // });

    // let userInput; // Змінна для зберігання відповіді

    // rl.question('Введіть щось: ', answer => {
    //   console.log('Ви ввели: ' + answer);
    //   userInput = answer; // Зберігаємо введення у змінну
    //   rl.close();
    // });

    let option = await askQuestion('Ввести опцію: ');

    // let inputIsCorrect = false;
    switch (option) {
      case 1:
        console.log('Розв`язати задачу всіма можливими методами');
        // inputIsCorrect = true;
        break;
      case 2:
        console.log('Провести експерименти');
        // inputIsCorrect = true;
        break;
      case 3:
        console.log('Вивести дані задачі');
        // inputIsCorrect = true;
        break;
      case 4:
        console.log('Завершити роботу');
        // inputIsCorrect = true;
        break;
      default:
        console.log('Incorrect input. Try again!');
      // inputIsCorrect = false;
    }

    // опрацювання некоректного інпуту (наприклад, введено опцію 7)
    // while (!inputIsCorrect) {
    //   inputIsCorrect = true;

    // }
    // isFinished = true;
  }
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(query, answer => {
      resolve(answer);
    });
  });
}
menu();
