import { generateMatrix } from '../generator/taskGenerator.js';
import {
  getGreedyResults,
  calculateTotalPreparationTime,
} from '../algorithms/greedy/greedy.js';
import { getResultsPP } from '../algorithms/pairwisePermut/pairwisePermut.js';
import { ant } from '../algorithms/ant/ant.js';

// Show Results
// export function showPairwiseTestResult() {

// }

// showPairwiseTestResult();

// Parameters
const numOfStudents = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // Problem size
const tau = 100; // Mean value
const deltaTau = 10; // Semi-interval value

document.addEventListener('DOMContentLoaded', () => {
  // Run the test and build the charts
  const data = deviationTest(numOfStudents, tau, deltaTau);
  drawDeviationChart(data, 'deviationTest'); // Display charts

  // Average deviations for console output
  let { averageDeviationsFromAnt, averageDeviationsFromGreedy } = data;

  console.log(
    'Average deviations of TF for pairwise permutation method relative to TF obtained by ant algorithm – ',
    averageDeviationsFromAnt
  );
  console.log(
    'Average deviations of TF for pairwise permutation method relative to TF obtained by greedy algorithm – ',
    averageDeviationsFromGreedy
  );
});

// Test function for calculating deviations
function deviationTest(numOfStudents, tau, deltaTau) {
  let averageDeviationsFromAnt = [];
  let averageDeviationsFromGreedy = [];

  for (let n of numOfStudents) {
    let deviationsFromAnt = [];
    let deviationsFromGreedy = [];

    for (let i = 0; i < 20; i++) {
      // Generate individual problem P
      let P = generateMatrix(n, tau, deltaTau);

      // Solve problem P using pairwise permutations, where the initial problem P is defined by the ant algorithm
      let { result: antSchedule, result_func: antTF } = ant(n, P);

      // Solve problem P using pairwise permutations, where the initial problem P is defined by the greedy algorithm
      let { schedule: greedySchedule, executionTimeGreedy } =
        getGreedyResults(P);
      let greedyTF = calculateTotalPreparationTime(P, greedySchedule);

      // Output results of the greedy algorithm
      console.log(`Problem size: ${n}, Run: ${i + 1}`);
      console.log(
        `  Initial solution from greedy algorithm - Target function (TF): ${greedyTF}`
      );
      console.log(
        `  Initial solution from ant algorithm - Target function (TF): ${antTF}`
      );

      // Solve problem P using pairwise permutations
      let { bestTime: ppTimeFromAnt } = getResultsPP(P, antSchedule);
      let { bestTime: ppTimeFromGreedy } = getResultsPP(P, greedySchedule);

      // Output results of pairwise permutation method
      console.log(
        `  Pairwise permutations with initial solution from ant algorithm - TF: ${ppTimeFromAnt}`
      );
      console.log(
        `  Pairwise permutations with initial solution from greedy algorithm - TF: ${ppTimeFromGreedy}`
      );

      // Calculate TF deviations
      let deviationFromAnt = calculateDeviation(ppTimeFromAnt, antTF);
      let deviationFromGreedy = calculateDeviation(ppTimeFromGreedy, greedyTF);

      console.log(
        `  TF deviation for pairwise permutation method relative to TF obtained by ant algorithm: ${deviationFromAnt}`
      );
      console.log(
        `  TF deviation for pairwise permutation method relative to TF obtained by greedy algorithm: ${deviationFromGreedy}`
      );

      deviationsFromAnt.push(deviationFromAnt);
      deviationsFromGreedy.push(deviationFromGreedy);
    }

    // Determine the average TF deviation
    averageDeviationsFromAnt.push(calculateAverage(deviationsFromAnt));
    averageDeviationsFromGreedy.push(calculateAverage(deviationsFromGreedy));
  }

  return {
    labels: numOfStudents, // Labels for the chart
    averageDeviationsFromAnt,
    averageDeviationsFromGreedy,
  };
}

// Function for calculating TF deviation
function calculateDeviation(value1, value2) {
  return Math.abs(value1 - value2) / Math.min(value1, value2);
}

// Build charts
function drawDeviationChart(data, htmlElement) {
  const ctx = document.getElementById(htmlElement).getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Deviation from TF of ant algorithm',
          data: data.averageDeviationsFromAnt,
          backgroundColor: 'rgba(96, 130, 182, 0.7)',
          borderColor: 'rgba(70, 130, 180, 1)',
          borderWidth: 1,
        },
        {
          label: 'Deviation from TF of greedy algorithm',
          data: data.averageDeviationsFromGreedy,
          backgroundColor: 'rgba(182, 96, 130, 0.7)',
          borderColor: 'rgba(180, 70, 130, 1)',
          borderWidth: 1,
          type: 'line', // Use a line chart for the pink dataset
          fill: false, // Disable fill for the line chart
          pointStyle: 'circle', // Use circles for data points
          pointRadius: 5, // Increase the size of data points
          yAxisID: 'y-axis-2', // Use a secondary y-axis
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
          text: 'Average TF deviation for pairwise permutation method relative to TF of ant and greedy algorithms',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Average deviation: ${context.raw}`;
            },
          },
        },
        datalabels: {
          display: true,
          align: 'top',
          formatter: (value, context) => value.toFixed(2),
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Number of students (n)',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Average deviation',
          },
          ticks: {
            min: 0,
            max: 1,
          },
        },
        'y-axis-2': {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Deviation from TF of greedy algorithm',
          },
          position: 'right',
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            min: 0,
            max: 1,
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
