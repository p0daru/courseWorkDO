import * as results from '../algorithms/branchBound/bnbResults.js';
import * as Generator from '../generator/taskGenerator.js';

// Input data
const numOfStudents = 8; // problem size
const tau = 100; // mean value
const deltaTauValues = [10, 50]; // semi-interval values

// Example function call
const targetFunctions = testBnb(numOfStudents, tau, deltaTauValues);
drawChart(deltaTauValues, targetFunctions, 'bnbTest'); // draw histograms
// console.log(targetFunctions);

// Calculate the average target functions for different deltaTau values
function testBnb(numOfStudents, tau, deltaTauValues) {
  let averageTargetFuncs = [];

  for (let i = 0; i < deltaTauValues.length; i += 1) {
    // Array to store target functions for current deltaTau
    let targetFunctions = [];

    for (let j = 0; j < 20; j += 1) {
      // Generate lesson durations and transition matrix
      const trainingDuration = Generator.generateLessonDuration(numOfStudents);
      const matrix = Generator.generateMatrix(
        numOfStudents,
        tau,
        deltaTauValues[i]
      );

      // Calculate target function using Branch and Bound results
      let targetFunc = results.calcResultsBnB(
        matrix,
        trainingDuration
      ).totalWorkTimeBnB;

      // Add target funcs to the array
      targetFunctions.push(targetFunc);
    }
    // Calculate and store the average target function for the current deltaTau
    averageTargetFuncs.push(calculateAverage(targetFunctions));
  }

  return averageTargetFuncs;
}

// Draw histograms
function drawChart(deltaTauValues, targetFunctions, htmlElement) {
  const ctx = document.getElementById(htmlElement).getContext('2d');
  new Chart(ctx, {
    type: 'bar', // histograms
    data: {
      labels: deltaTauValues,
      datasets: [
        {
          label: 'ЦФ vs ∆τ',
          data: targetFunctions,
          backgroundColor: 'rgb(96, 130, 182)',
          borderColor: 'rgba(70, 130, 180, 1)',
          borderWidth: 0,
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
          text: 'Графік залежності ЦФ від ∆τ',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Цільова Функція: ${context.raw}`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Значення напівінтервалу ∆τ',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Цільова Функція',
          },
        },
      },
    },
  });
}

// Calculate the average value of an array
function calculateAverage(arr) {
  if (arr.length === 0) {
    return 0; // Return 0 if the array is empty
  }

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum / arr.length;
}

// Обчислення ЦФ для різних ∆τ. Один прогон
// function testBnb(numOfStudents, tau, deltaTauValues) {
//   let targetFunctions = [];
//   const trainingDuration = Generator.generateLessonDuration(numOfStudents);

//   for (let i = 0; i < deltaTauValues.length; i += 1) {
//     const matrix = Generator.generateMatrix(
//       numOfStudents,
//       tau,
//       deltaTauValues[i]
//     );

//     let res = results.calcResultsBnB(matrix, trainingDuration);
//     targetFunctions.push(res.totalWorkTimeBnB);
//   }

//   return targetFunctions;
// }
