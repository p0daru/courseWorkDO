import * as Generator from '../generator/taskGenerator.js';
import {
  getGreedyResults,
  calculateTotalPreparationTime,
} from '../algorithms/greedy/greedy.js';
import { ant } from '../algorithms/ant/ant.js';
import { calcResultsBnB } from '../algorithms/branchBound/bnbResults.js';
import { getResultsPP } from '../algorithms/pairwisePermut/pairwisePermut.js';

// Show Results
// export function showAccuracyTestResult() {

// }

// showAccuracyTestResult();

// Input data
const numOfStudents = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // Problem size
const tau = 100; // Mean value
const deltaTau = 10; // Semi-interval value

// Example function call
document.addEventListener('DOMContentLoaded', () => {
  // Run the test and build the charts
  const data = accuracyTest(numOfStudents, tau, deltaTau);
  drawAccuracyChart(data, 'accuracyTest'); // Display charts

  // Average deviations for console output
  // let {
  //   averageDeviationsGreedy,
  //   averageDeviationsAnt,
  //   averageDeviationsPP,
  //   averageDeviationsBnB,
  // } = data;

  // console.log(
  //   'Average deviations of TF for greedy algorithm relative to optimal TF – ',
  //   averageDeviationsGreedy
  // );
  // console.log(
  //   'Average deviations of TF for ant algorithm relative to optimal TF – ',
  //   averageDeviationsAnt
  // );
  // console.log(
  //   'Average deviations of TF for pairwise permutation algorithm relative to optimal TF – ',
  //   averageDeviationsPP
  // );
  // console.log(
  //   'Average deviations of TF for bnb algorithm relative to optimal TF – ',
  //   averageDeviationsBnB
  // );
});

// Accuracy testing
function accuracyTest(numOfStudents, tau, deltaTau) {
  let averageDeviationsGreedy = [];
  let averageDeviationsAnt = [];
  let averageDeviationsPP = [];
  let averageDeviationsBnB = []; // added for BnB

  for (let n of numOfStudents) {
    let deviationsGreedy = [];
    let deviationsAnt = [];
    let deviationsPP = [];
    let deviationsBnB = []; // added for BnB

    for (let i = 0; i < 20; i++) {
      // Generate individual problem P
      let P = Generator.generateMatrix(n, tau, deltaTau);

      // Solve problem P using the greedy algorithm
      let { schedule: greedySchedule } = getGreedyResults(P);
      let greedyTF = calculateTotalPreparationTime(P, greedySchedule);

      // Solve problem P using the ant algorithm
      let { result: antSchedule, result_func: antTF } = ant(n, P);

      // Solve problem P using the BnB algorithm
      let {
        totalWorkTimeBnB: optimalTF,
        scheduleBnB,
        executionTimeBnB,
      } = calcResultsBnB(P, Generator.generateLessonDuration(n));

      // Log the BnB results to check if they are correct
      console.log('BnB Results:', { optimalTF, scheduleBnB, executionTimeBnB });

      // Ensure optimalTF is correctly returned
      if (typeof optimalTF === 'undefined') {
        console.error('optimalTF is undefined in calcResultsBnB', {
          scheduleBnB,
          executionTimeBnB,
        });
        continue;
      }

      // Solve problem P using the pairwise permutation algorithm
      let { bestTime: ppTF } = getResultsPP(P, greedySchedule);

      // Check if any TF value is NaN
      if (isNaN(greedyTF) || isNaN(antTF) || isNaN(optimalTF) || isNaN(ppTF)) {
        console.error('NaN encountered:', { greedyTF, antTF, optimalTF, ppTF });
        continue;
      }

      // Calculate deviations
      let deviationGreedy = calculateDeviation(greedyTF, optimalTF);
      let deviationAnt = calculateDeviation(antTF, optimalTF);
      let deviationPP = calculateDeviation(ppTF, optimalTF);
      let deviationBnB = 0; // For BnB, deviation from itself is zero

      // Store deviations
      deviationsGreedy.push(deviationGreedy);
      deviationsAnt.push(deviationAnt);
      deviationsPP.push(deviationPP);
      deviationsBnB.push(deviationBnB); // added for BnB
    }

    // Calculate average deviations
    averageDeviationsGreedy.push(calculateAverage(deviationsGreedy));
    averageDeviationsAnt.push(calculateAverage(deviationsAnt));
    averageDeviationsPP.push(calculateAverage(deviationsPP));
    averageDeviationsBnB.push(calculateAverage(deviationsBnB)); // added for BnB
  }

  return {
    labels: numOfStudents, // Labels for the chart
    averageDeviationsGreedy,
    averageDeviationsAnt,
    averageDeviationsPP,
    averageDeviationsBnB, // added for BnB
  };
}

// Function to calculate deviation
function calculateDeviation(value, optimalValue) {
  return Math.abs(value - optimalValue) / optimalValue;
}

// Draw charts
function drawAccuracyChart(data, htmlElement) {
  const ctx = document.getElementById(htmlElement).getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Greedy',
          data: data.averageDeviationsGreedy,
          backgroundColor: 'rgb(96, 130, 182)',
          borderColor: 'rgba(70, 130, 180, 1)',
          borderWidth: 1,
        },
        {
          label: 'Ant',
          data: data.averageDeviationsAnt,
          backgroundColor: 'rgb(182, 96, 130)',
          borderColor: 'rgba(180, 70, 130, 1)',
          borderWidth: 1,
        },
        {
          label: 'Pairwise',
          data: data.averageDeviationsPP,
          backgroundColor: 'rgb(130, 96, 182)',
          borderColor: 'rgba(130, 70, 180, 1)',
          borderWidth: 1,
        },
        {
          label: 'BnB',
          data: data.averageDeviationsBnB,
          backgroundColor: 'rgb(96, 182, 130)',
          borderColor: 'rgba(70, 180, 130, 1)',
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
          text: 'Average TF Deviation vs Number of Students',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Average Deviation: ${context.raw}`;
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
            text: 'Average Deviation',
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
