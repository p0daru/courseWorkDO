import { generateMatrix } from '../../generator/taskGenerator.js';

function findNearestNeighbor(matrix, current, visited) {
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

export function greedySchedule(matrix) {
  let numOfStudents = matrix.length;
  let visited = new Set();
  let schedule = [];

  let current = Math.floor(Math.random() * numOfStudents);
  schedule.push(current);
  visited.add(current);

  while (schedule.length < numOfStudents) {
    let next = findNearestNeighbor(matrix, current, visited);
    if (next === -1) break;

    schedule.push(next);
    visited.add(next);
    current = next;
  }

  return schedule;
}

// Additional function for the timeTest
export function getGreedyResults(matrix) {
  const startTime = performance.now();

  let numOfStudents = matrix.length;
  let visited = new Set();
  let schedule = [];

  let current = Math.floor(Math.random() * numOfStudents);
  schedule.push(current);
  visited.add(current);

  while (schedule.length < numOfStudents) {
    let next = findNearestNeighbor(matrix, current, visited);
    if (next === -1) break;

    schedule.push(next);
    visited.add(next);
    current = next;
  }

  const endTime = performance.now();
  const executionTimeGreedy = endTime - startTime;

  const totalPreparationTime = calculateTotalPreparationTime(matrix, schedule);
  // let scheduleFormat = formatSchedule(schedule);
  let scheduleFormat = schedule.map(getStudentLabel).join(' -> ');
  // console.log(`Greedy Schedule: ${schedule}`);
  // console.log(`Greedy TF: ${totalPreparationTime}`);

  return {
    schedule,
    scheduleFormat,
    totalPreparationTime,
    executionTimeGreedy,
  };
}

export function calculateTotalPreparationTime(matrix, schedule) {
  let total = 0;
  for (let i = 0; i < schedule.length - 1; i++) {
    total += matrix[schedule[i]][schedule[i + 1]];
  }
  return total;
}

function getStudentLabel(index) {
  return index % 2 === 0
    ? `b${Math.floor(index / 2) + 1}`
    : `g${Math.floor(index / 2) + 1}`;
}

// Function to format the schedule
export function formatSchedule(result) {
  let schedule = '';
  if (result[0] % 2 === 0) {
    for (let i = 0; i < result.length; i++) {
      const isLastNode = i === result.length - 1;
      const value = result[i];
      const isEven = i % 2 === 0;
      if (isLastNode) {
        schedule += isEven ? `g${value + 1}` : `b${value + 1}`;
      } else {
        schedule += isEven ? `g${value + 1} -> ` : `b${value + 1} -> `;
      }
    }
  } else {
    for (let i = 0; i < result.length; i++) {
      const isLastNode = i === result.length - 1;
      const value = result[i];
      const isEven = i % 2 === 0;
      if (isLastNode) {
        schedule += isEven ? `b${value + 1}` : `g${value + 1}`;
      } else {
        schedule += isEven ? `b${value + 1} -> ` : `g${value + 1} -> `;
      }
    }
  }
  return schedule;
}

// Function to format the schedule
// export function formatSchedule(schedule) {
//   return schedule
//     .map((student, index) => `${index % 2 === 0 ? 'b' : 'g'}${student + 1}`)
//     .join(' -> ');
// }
// Function to format the schedule
