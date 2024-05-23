import readline from 'readline';
import * as Generator from '../generator/taskGenerator.js';
import * as resultsBnB from '../algorithms/branchBound/bnbResults.js';
import * as resultAnt from '../algorithms/ant/ant.js';

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
    option = Number(option); // Number перетворює рядок введений юзером у число
    console.log('==========================');

    switch (option) {
        case 1:
            await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза на 1 sec
            console.clear(); // очистити консоль
            console.log('==========================');
            console.log('Оберіть спосіб генерування задачі');
            console.log('1. Згенерувати випадковим чином');
            console.log('2. Скористатись дефолтними вхідними даними');

            // зчитання способу генерування від юзера
            let optionToGenerate = await askQuestion('Ввести опцію: ');
            console.log('==========================');
            optionToGenerate = Number(optionToGenerate);

            if (optionToGenerate === 1) {
                // випадково
                console.log('\nВведіть вхідні дані');

                // Number перетворює рядок введений юзером у число
                let numOfStudents = Number(await askQuestion('Розмірність задачі: '));
                let tau = Number(
                    await askQuestion('Значення математичного сподівання: ')
                );
                let deltaTau = Number(await askQuestion('Значення напівінтервалу: '));

                ///// додати норм логіку валідації вхідних даних (в циклі для повторної спроби введення ??)

                const trainingDuration =
                    Generator.generateLessonDuration(numOfStudents);
                const matrix = Generator.generateMatrix(numOfStudents, tau, deltaTau);

                // результати роботи алгоритмів
                let resultsBranchBound = resultsBnB.calcResultsBnB(
                    matrix,
                    trainingDuration
                );
                // let result_Ant = resultAnt.ant(numOfStudents, matrix, trainingDuration);


                console.log('\nРозв`язок задачі всіма алгоритмами');
                console.log('==============================');

                console.log(
                    `Результат роботи алгоритму гілок та меж: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
                );
                // console.log(
                //   `Результат роботи жадібного алгоритму: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
                // );
                // console.log(
                //     `Результат роботи мурашиного алгоритму: ${result_Ant.shedule}; значення ЦФ: ${result_Ant.result_func}`
                // );

                // console.log(
                //   `Результат роботи алгоритму попарних перестановок: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
                // );

                console.log('==============================');
            } else if (optionToGenerate === 2) {
                // дефолтна матриця
                console.log('Скористатись дефолтними вхідними даними');

                const trainingDuration =
                    Generator.getDefaultInputValues().trainingDuration;
                const matrix = Generator.getDefaultInputValues().matrix;

                // результати роботи алгоритмів
                let resultsBranchBound = resultsBnB.calcResultsBnB(
                    matrix,
                    trainingDuration
                );

                // let result_Ant = resultAnt.ant(numOfStudents, matrix, trainingDuration);


                console.log('\nРозв`язок задачі всіма алгоритмами');
                console.log('==============================');

                console.log(
                    `Результат роботи алгоритму гілок та меж: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
                );
                // console.log(
                //   `Результат роботи жадібного алгоритму: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
                // );
                // console.log(
                //     `Результат роботи мурашиного алгоритму: ${result_Ant.shedule}; значення ЦФ: ${result_Ant.result_func}`
                // );

                // console.log(
                //   `Результат роботи алгоритму попарних перестановок: ${resultsBranchBound.scheduleBnB}; значення ЦФ: ${resultsBranchBound.totalWorkTimeBnB}`
                // );

                console.log('==============================');
            } else {
                console.log('Некоректний вибір. Спробуйте ще раз.');
            }
            break;

        case 2:
            console.log('Провести експерименти');
            console.log('Обрати експеримент');
            //  логіка для експериментів
            break;

        case 3:
            console.log('Вивести дані задачі');
            break;

        case 4:
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