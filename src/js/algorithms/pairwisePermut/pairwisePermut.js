import { generateMatrix } from '../../generator/taskGenerator.js';
import { greedySchedule, calculateTotalPreparationTime } from '../greedy/greedy.js';

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

  for (let i = 0; i < maxIterations; i++) {
    let newSchedule = swapPairs(schedule, schedule.length);
    let newTime = calculateTotalPreparationTime(matrix, newSchedule);

    if (newTime < bestTime) {
      bestTime = newTime;
      bestSchedule = newSchedule;
    }

    schedule = newSchedule;
  }

  return { bestSchedule, bestTime };
}

// Additional func for the timeTest
export function getResultsPP(
  matrix,
  initialSchedule = greedySchedule(matrix),
  maxIterations = 1000
) {
  const startTime = performance.now();

  let schedule = initialSchedule;
  let bestSchedule = schedule;
  let bestTime = calculateTotalPreparationTime(matrix, schedule);

  for (let i = 0; i < maxIterations; i++) {
    let newSchedule = swapPairs(schedule, schedule.length);
    let newTime = calculateTotalPreparationTime(matrix, newSchedule);

    if (newTime < bestTime) {
      bestTime = newTime;
      bestSchedule = newSchedule;
    }

    schedule = newSchedule;
  }

  const endTime = performance.now();
  const executionTimePairwise = endTime - startTime;

  return { bestSchedule, bestTime, executionTimePairwise };
}
