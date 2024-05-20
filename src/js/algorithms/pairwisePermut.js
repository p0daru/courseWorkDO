import { generateMatrix, greedySchedule } from './greedy.js';

function calculateTotalPreparationTime(matrix, schedule) {
  let total = 0;
  for (let i = 0; i < schedule.length - 1; i++) {
    total += matrix[schedule[i]][schedule[i + 1]];
  }
  return total;
}

function swapPairs(schedule, numOfStudents) {
  let newSchedule = schedule.slice();
  let group = Math.random() < 0.5 ? 0 : 1;

  let candidates = [];
  for (let i = 0; i < numOfStudents; i++) {
    if (i % 2 === group) {
      candidates.push(i);
    }
  }

  let index1 = candidates[Math.floor(Math.random() * candidates.length)];
  let index2 = candidates[Math.floor(Math.random() * candidates.length)];
  while (index1 === index2) {
    index2 = candidates[Math.floor(Math.random() * candidates.length)];
  }

  let temp = newSchedule[index1];
  newSchedule[index1] = newSchedule[index2];
  newSchedule[index2] = temp;

  return newSchedule;
}

function optimizeSchedule(matrix, initialSchedule, maxIterations) {
  let schedule = initialSchedule;
  let bestSchedule = schedule;
  let bestTime = calculateTotalPreparationTime(matrix, schedule);

  let i = 0;
  while (i < maxIterations) {
    let newSchedule = swapPairs(schedule, schedule.length);
    let newTime = calculateTotalPreparationTime(matrix, newSchedule);

    if (newTime < bestTime) {
      bestTime = newTime;
      bestSchedule = newSchedule;
    }

    schedule = newSchedule;
    i++;
  }

  return { bestSchedule, bestTime };
}

// Usage example
// let numOfStudents = 8; // Must be even
// let tau = 15;
// let deltaTau = 5;
// let maxIterations = 10000;

// let matrix = generateMatrix(numOfStudents, tau, deltaTau);
// console.table(matrix);

// let initialSchedule = greedySchedule(matrix);
// console.log('Initial Greedy Schedule:', initialSchedule);

// let initialTime = calculateTotalPreparationTime(matrix, initialSchedule);
// console.log('Total Preparation Time for Initial Greedy Schedule:', initialTime);

// let { bestSchedule, bestTime } = optimizeSchedule(
//   matrix,
//   initialSchedule,
//   maxIterations
// );

// console.log('Optimized Schedule:', bestSchedule);
// console.log('Total Preparation Time:', bestTime);

// Additional func for the timeTest
export function getResultsPP(
  matrix,
  initialSchedule = greedySchedule(matrix),
  maxIterations = 1000
) {
  // if there is no data in parameters
  // maxIterations = 1000
  // initialSchedule = greedySchedule(matrix),

  // Початок вимірювання часу
  const startTime = performance.now();

  let schedule = initialSchedule;
  let bestSchedule = schedule;
  let bestTime = calculateTotalPreparationTime(matrix, schedule);

  let i = 0;
  while (i < maxIterations) {
    let newSchedule = swapPairs(schedule, schedule.length);
    let newTime = calculateTotalPreparationTime(matrix, newSchedule);

    if (newTime < bestTime) {
      bestTime = newTime;
      bestSchedule = newSchedule;
    }

    schedule = newSchedule;
    i++;
  }

  // Завершення вимірювання часу та виведення результату
  const endTime = performance.now();
  const executionTimePairwise = endTime - startTime;

  return { bestSchedule, bestTime, executionTimePairwise };
}
