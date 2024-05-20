import * as Generator from '../generator/taskGenerator.js';
import * as resultsGreedy from '../algorithms/greedy.js';
import * as resultsBnB from '../algorithms/branchBound/bnbResults.js';
import * as resultsPP from '../algorithms/pairwisePermut.js';

// Вхідні дані
const numOfStudents = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // розмірність задачі
const tau = 100; // значення математичного сподівання
const deltaTau = 10; // значення напівінтервалу

// Приклад виклику функції
const data = timeTest(numOfStudents, tau, deltaTau);
drawTimeChart(data, 'timeTest'); // вивід гістограм

// середні часи для відображення в консолі
let { averageTimesGreedy, averageTimesAnt, averageTimesBnB, averageTimesPP } =
  timeTest(numOfStudents, tau, deltaTau);

console.log('averageTimesGreedy – ', averageTimesGreedy);
console.log('averageTimesAnt – ', averageTimesAnt);
console.log('averageTimesBnB – ', averageTimesBnB);
console.log('averageTimesPP – ', averageTimesPP);

// console.log([
//   0.0028103500000007386, 0.002972900000001033, 0.004435449999999008,
//   0.003060350000001222, 0.004820950000004131, 0.0057521000000008374,
//   0.006731249999998567, 0.00821250000000191, 0.009808300000005942,
// ]);

// Тестування
function timeTest(numOfStudents, tau, deltaTau) {
  // Часи виконання алгоритмів та середні часи виконання алгоритмів
  let averageTimesGreedy = [];
  let averageTimesAnt = [];
  let averageTimesBnB = [];
  let averageTimesPP = [];

  for (let i = 0; i < numOfStudents.length; i += 1) {
    // 20 прогонів
    let execTimesGreedy = [];
    let execTimesAnt = [];
    let execTimesBnB = [];
    let execTimesPP = [];

    for (let j = 0; j < 20; j += 1) {
      // Генеруємо тривалості уроків та матрицю переналаштувань
      const trainingDuration = Generator.generateLessonDuration(
        numOfStudents[i],
        tau,
        deltaTau
      );
      const matrix = Generator.generateMatrix(numOfStudents[i], tau, deltaTau);

      // Обчислюємо роботи алгоритмів
      // жадібний
      const resGreedy =
        resultsGreedy.getGreedyResults(matrix).executionTimeGreedy;
      // мурахи
      //   const resAnt = resultsPP.getResultsPP(matrix).executionTimePairwise;
      // МГтМ
      const resBnB = resultsBnB.calcResultsBnB(
        matrix,
        trainingDuration
      ).executionTimeBnB;

      // перестановки
      const resPP = resultsPP.getResultsPP(matrix).executionTimePairwise;

      // Додаємо часи в масив відповідного алгоритму
      execTimesGreedy.push(resGreedy);
      execTimesBnB.push(resBnB);
      execTimesPP.push(resPP);
      execTimesAnt.push(resPP);
    }

    // Обчислюємо середні часи та додаємо до масиву відповідного алгоритму
    averageTimesGreedy.push(calculateAverage(execTimesGreedy));
    averageTimesBnB.push(calculateAverage(execTimesBnB));
    averageTimesPP.push(calculateAverage(execTimesPP));
    averageTimesAnt.push(calculateAverage(execTimesAnt));
  }

  return {
    labels: numOfStudents, // мітки графіка по горизонталі
    averageTimesGreedy,
    averageTimesAnt,
    averageTimesBnB,
    averageTimesPP,
  };
}

// Виводимо гістограми
function drawTimeChart(data, htmlElement) {
  const ctx = document.getElementById(htmlElement).getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Greedy',
          data: data.averageTimesGreedy,
          backgroundColor: 'rgb(96, 130, 182)',
          borderColor: 'rgba(70, 130, 180, 1)',
          borderWidth: 1,
        },
        {
          label: 'Ant',
          data: data.averageTimesAnt,
          backgroundColor: 'rgb(182, 96, 130)',
          borderColor: 'rgba(180, 70, 130, 1)',
          borderWidth: 1,
        },
        {
          label: 'BnB',
          data: data.averageTimesBnB,
          backgroundColor: 'rgb(96, 182, 130)',
          borderColor: 'rgba(70, 180, 130, 1)',
          borderWidth: 1,
        },
        {
          label: 'Pairwise',
          data: data.averageTimesPP,
          backgroundColor: 'rgb(130, 96, 182)',
          borderColor: 'rgba(130, 70, 180, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Average Execution Time vs Number of Students',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Average Execution Time: ${context.raw}`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Number of Students (n)',
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Average Execution Time (ms)',
          },
        },
      },
      layout: {
        backgroundColor: 'rgba(211, 211, 211, 1)',
      },
    },
  });
}

// Обчислити середнє значення масиву
function calculateAverage(arr) {
  if (arr.length === 0) {
    return 0; // Повертаємо 0, якщо масив пустий
  }

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
}

///////// OTHER
// function drawTimeChart(averageTimesGreedy, labels, htmlElement) {
//   const ctx = document.getElementById(htmlElement).getContext('2d');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Greedy',
//           data: averageTimesGreedy,
//           backgroundColor: 'rgb(96, 130, 182)',
//           borderColor: 'rgba(70, 130, 180, 1)',
//           borderWidth: 0,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }

// function drawTimeChart(data, htmlElement) {
//   const ctx = document.getElementById(htmlElement).getContext('2d');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: data.averageTimesGreedy, // Горизонтальна вісь: час виконання
//       datasets: [
//         {
//           label: 'Greedy',
//           data: data.labels, // Вертикальна вісь: кількість студентів
//           backgroundColor: 'rgb(96, 130, 182)',
//           borderColor: 'rgba(70, 130, 180, 1)',
//           borderWidth: 0,
//         },
//         {
//           label: 'Ant',
//           data: data.averageTimesAnt,
//           backgroundColor: 'rgb(182, 96, 130)',
//           borderColor: 'rgba(180, 70, 130, 1)',
//           borderWidth: 0,
//         },
//         {
//           label: 'BnB',
//           data: data.averageTimesBnB,
//           backgroundColor: 'rgb(96, 182, 130)',
//           borderColor: 'rgba(70, 180, 130, 1)',
//           borderWidth: 0,
//         },
//         {
//           label: 'Pairwise',
//           data: data.averageTimesPairwise,
//           backgroundColor: 'rgb(130, 96, 182)',
//           borderColor: 'rgba(130, 70, 180, 1)',
//           borderWidth: 0,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         },
//         title: {
//           display: true,
//           text: 'Average Execution Time vs Number of Students',
//         },
//         tooltip: {
//           callbacks: {
//             label: function (context) {
//               return `Average Execution Time: ${context.raw}`;
//             },
//           },
//         },
//       },
//       scales: {
//         x: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Average Execution Time',
//           },
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Number of Students (n)',
//           },
//         },
//       },
//       layout: {
//         backgroundColor: 'rgba(211, 211, 211, 1)',
//       },
//     },
//   });
// }

/**
 * Результати:
 * для різних ен виводимо середній час роботи одного і того ж алгоритма
 */

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
