import * as Generator from '../generator/taskGenerator.js';
import { getGreedyResults } from '../algorithms/greedy/greedy.js';
import { ant } from '../algorithms/ant/ant.js';
import { calcResultsBnB } from '../algorithms/branchBound/bnbResults.js';
import { getResultsPP } from '../algorithms/pairwisePermut/pairwisePermut.js';

// Input data
const numOfStudents = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // problem size
const tau = 100; // mean value
const deltaTau = 10; // semi-interval value

// Example function call
const data = timeTest(numOfStudents, tau, deltaTau);
drawTimeChart(data, 'timeTest'); // draw histograms

// Testing
function timeTest(numOfStudents, tau, deltaTau) {
  // Execution times and average execution times of the algorithms
  let averageTimesGreedy = [];
  let averageTimesAnt = [];
  let averageTimesBnB = [];
  let averageTimesPP = [];

  for (let i = 0; i < numOfStudents.length; i++) {
    // 20 runs
    let execTimesGreedy = [];
    let execTimesAnt = [];
    let execTimesBnB = [];
    let execTimesPP = [];

    for (let j = 0; j < 20; j++) {
      // Generate lesson durations and transition matrix
      const trainingDuration = Generator.generateLessonDuration(numOfStudents[i], tau, deltaTau);
      const matrix = Generator.generateMatrix(numOfStudents[i], tau, deltaTau);

      // Calculate algorithm executions
      const step = 0.1;

      // Greedy
      const resGreedy = getGreedyResults(matrix);
      const execTimeGreedy = resGreedy.executionTimeGreedy + step;

      // Ant
      const resAnt = ant(numOfStudents[i], matrix);
      const execTimeAnt = resAnt.executionTime + step;

      // BnB
      const resBnB = calcResultsBnB(matrix, trainingDuration);
      const execTimeBnB = resBnB.executionTimeBnB + step;

      // Pairwise
      const resPP = getResultsPP(matrix, resGreedy.schedule);
      const execTimePP = resPP.executionTimePairwise + step;

      // Add times to the corresponding algorithm array
      execTimesGreedy.push(execTimeGreedy);
      execTimesAnt.push(execTimeAnt);
      execTimesBnB.push(execTimeBnB);
      execTimesPP.push(execTimePP);
    }

    // Calculate average times and add to the corresponding algorithm array
    averageTimesGreedy.push(calculateAverage(execTimesGreedy));
    averageTimesAnt.push(calculateAverage(execTimesAnt));
    averageTimesBnB.push(calculateAverage(execTimesBnB));
    averageTimesPP.push(calculateAverage(execTimesPP));
  }

  return {
    labels: numOfStudents, // horizontal axis labels
    averageTimesGreedy,
    averageTimesAnt,
    averageTimesBnB,
    averageTimesPP,
  };
}

// Draw histograms
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
          beginAtZero: true,
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
