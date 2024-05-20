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

function menu() {
  let isFinished = false;

  while (!isFinished) {
    console.log('==========================');
    console.log('ГОЛОВНЕ МЕНЮ');
    console.log('Welcome! Обери одну з доступних опцій:');
    console.log('1. Розв`язати задачу всіма можливими методами');
    console.log('2. Провести експерименти');
    console.log('3. Вивести дані задачі');
    console.log('4. Завершити роботу');
    console.log('==========================');

    // значення від користувача
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Введіть щось: ', answer => {
      console.log('Ви ввели: ' + answer);
      rl.close();
    });

    let inputIsCorrect = false;
    while (!inputIsCorrect) {
      switch (rl) {
        case 1:
          console.log('Розв`язати задачу всіма можливими методами');
          inputIsCorrect = true;
          break;
        case 2:
          console.log('Провести експерименти');
          inputIsCorrect = true;
          break;
        case 3:
          console.log('Вивести дані задачі');
          inputIsCorrect = true;
          break;
        case 4:
          console.log('Завершити роботу');
          inputIsCorrect = true;

          break;
        default:
          console.log('Incorrect input. Try again!');
          inputIsCorrect = false;
      }
    }
    isFinished = true;
  }
}

menu();
