import * as results from '../algorithms/ant/ant.js';
import * as Generator from '../generator/taskGenerator.js';

// Вхідні дані
const n = 8;
const tau = 100;
const deltaTau = 10;
const alphaArray = [1, 2, 3, 4, 5];

function test_ant(n, tau, deltaTau, alphaArray) {
  let result = [];
  let t_matrix = Generator.generateMatrix(n, tau, deltaTau);
  console.table(t_matrix);

  for (let i = 0; i < alphaArray.length; i += 1) {
    let res = results.ant(n, t_matrix, alphaArray[i]);
    result.push(res.result_func);
    console.log(result);
  }

  return result;
}
let result = test_ant(n, tau, deltaTau, alphaArray);

// Вивести результати у вигляді графіка
function drawChart(alpha, result, htmlElement) {
  const ctx = document.getElementById(htmlElement).getContext('2d');
  new Chart(ctx, {
    type: 'bar', // стовпчаста діаграма
    data: {
      labels: alphaArray,
      datasets: [
        {
          label: 'ЦФ vs a',
          data: result,
          backgroundColor: 'rgb(255, 182, 193, 0.5)',
          borderColor: 'rgba(255, 105, 180, 1)',
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
          text: 'Графік залежності ЦФ від a',
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
            text: 'Значення напівінтервалу a',
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

drawChart(alphaArray, result, 'antTest');
