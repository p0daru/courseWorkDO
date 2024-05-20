import * as results from '../algorithms/branchBound/bnbResults.js';
import * as Generator from '../generator/taskGenerator.js';

// Вхідні дані
const numOfStudents = 8;
const tau = 100;
const deltaTauMassive = [10, 50];

// Обчислення ЦФ для різних ∆τ
function testBnb(numOfStudents, tau, deltaTauMassive) {
  let targetFunctions = [];
  const trainingDuration = Generator.generateLessonDuration(numOfStudents);

  for (let i = 0; i < deltaTauMassive.length; i += 1) {
    const matrix = Generator.generateMatrix(
      numOfStudents,
      tau,
      deltaTauMassive[i]
    );

    let res = results.calcResultsBnB(matrix, trainingDuration);
    targetFunctions.push(res.totalWorkTimeBnB);
  }

  return targetFunctions;
}

let targetFunctions = testBnb(numOfStudents, tau, deltaTauMassive);
console.log(targetFunctions);

// Вивести результати у вигляді графіка
function drawChart(deltaTauMassive, targetFunctions, htmlElement) {
  const ctx = document.getElementById(htmlElement).getContext('2d');
  new Chart(ctx, {
    type: 'bar', // стовпчаста діаграма
    data: {
      labels: deltaTauMassive,
      datasets: [
        {
          label: 'ЦФ vs ∆τ',
          data: targetFunctions,
          backgroundColor: 'rgb(96, 130, 182)', // Блакитний колір для стовпців
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
              return `Цільова функція: ${context.raw}`;
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

drawChart(deltaTauMassive, targetFunctions, 'bnbTest');
