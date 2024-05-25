import {
  generateMatrix,
  generateLessonDuration,
  getDefaultInputValues,
} from '../../generator/taskGenerator.js';

import {
  greedySchedule,
  calculateTotalPreparationTime,
  formatSchedule,
} from './greedy.js';

// Function to get the student label
function getStudentLabel(index) {
  return index % 2 === 0
    ? `g${Math.floor(index / 2) + 1}`
    : `b${Math.floor(index / 2) + 1}`;
}

function findNearestNeighborWithLogging(matrix, current, visited) {
  let nearest = -1;
  let minDistance = Infinity;

  for (let i = 0; i < matrix.length; i++) {
    if (!visited.has(i) && matrix[current][i] < minDistance) {
      minDistance = matrix[current][i];
      nearest = i;
    }
  }

  return nearest;
}

function greedyScheduleWithLogging(matrix) {
  let numOfStudents = matrix.length;
  let visited = new Set();
  let schedule = [];

  let current = 0; // Start with the first student as a predefined student (e.g., g1)
  schedule.push(current);
  visited.add(current);

  while (schedule.length < numOfStudents) {
    let next = findNearestNeighborWithLogging(matrix, current, visited);
    if (next === -1) break;

    schedule.push(next);
    visited.add(next);
    current = next;
  }

  return schedule;
}

export function greedyConsole(numOfStudents, tau, deltaTau) {
  const matrix = generateMatrix(numOfStudents, tau, deltaTau);
  const lessonDurations = generateLessonDuration(numOfStudents);

  console.log('Тривалості занять:');
  console.table(lessonDurations);

  console.log('Матриця переналаштувань:');
  console.table(matrix);

  const startTime = performance.now();

  const schedule = greedyScheduleWithLogging(matrix);
  const totalPreparationTime = calculateTotalPreparationTime(matrix, schedule);
  const totalLessonDuration = lessonDurations.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalTF = totalLessonDuration + totalPreparationTime;

  const endTime = performance.now();
  const executionTimeGreedy = endTime - startTime;

  console.log('Розклад: ', schedule.map(getStudentLabel).join(' -> '));
  console.log('Тривалість перерв: ', totalPreparationTime);
  console.log('Загальний час підготовки: ', totalTF);
  console.log('Час виконання жадібного алгоритму: ', executionTimeGreedy, 'ms');
}

export function greedyResult(matrix, lessonDurations) {
  const startTime = performance.now();

  let schedule = greedyScheduleWithLogging(matrix);
  const totalPreparationTime = calculateTotalPreparationTime(matrix, schedule);
  const totalLessonDuration = lessonDurations.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalTF = totalLessonDuration + totalPreparationTime;

  const endTime = performance.now();
  let scheduleFormat = schedule.map(getStudentLabel).join(' -> ');
  return { schedule, scheduleFormat, totalTF };
}

// Test Case
// try {
//   const lessonDurations = getDefaultInputValues().trainingDuration;
//   const matrix = getDefaultInputValues().matrix;

//   let greedyResults = greedyResult(matrix, lessonDurations);
//   console.log(greedyResults.scheduleFormat);
//   console.log(greedyResults.totalTF);
// } catch (error) {
//   console.error('Помилка:', error.message);
// }

// Test Case
// try {
//   const numOfStudents = 8;
//   const tau = 10;
//   const deltaTau = 5;

//   greedyConsole(numOfStudents, tau, deltaTau);
// } catch (error) {
//   console.error('Помилка:', error.message);
// }
