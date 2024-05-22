import { generateMatrix, generateLessonDuration } from '../../generator/taskGenerator.js';
import { greedySchedule, calculateTotalPreparationTime, formatSchedule } from '../greedy/greedy.js';
import { getResultsPP } from './pairwisePermut.js';

// Function to get the student label
function getStudentLabel(index) {
  return index % 2 === 0 ? `b${Math.floor(index / 2) + 1}` : `g${Math.floor(index / 2) + 1}`;
}

function swapPairsWithLogging(schedule, numOfStudents) {
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

  return { newSchedule, index1, index2 };
}

function optimizeScheduleWithLogging(matrix, initialSchedule, maxIterations) {
  let schedule = initialSchedule;
  let bestSchedule = schedule;
  let bestTime = calculateTotalPreparationTime(matrix, schedule);
  let foundImprovement = false;
  let i = 0;

  for (; i < maxIterations; i++) {
    let { newSchedule, index1, index2 } = swapPairsWithLogging(schedule, schedule.length);
    let newTime = calculateTotalPreparationTime(matrix, newSchedule);

    if (newTime < bestTime) {
      bestTime = newTime;
      bestSchedule = newSchedule;
      console.log(`ІТЕРАЦІЯ ${i + 1}: Перестановка студента ${getStudentLabel(index1)} та студента ${getStudentLabel(index2)}, Найкраща поточна ЦФ = ${bestTime}`);
      foundImprovement = true;
      break;
    }

    console.log(`ІТЕРАЦІЯ ${i + 1}: Перестановка студента ${getStudentLabel(index1)} та студента ${getStudentLabel(index2)}, Best time = ${bestTime}`);
    schedule = newSchedule;
  }

  if (foundImprovement) {
    console.log('REST OF ITERATIONS');
  }

  // Continue with the rest of the iterations without logging
  for (let j = i + 1; j < maxIterations; j++) {
    let { newSchedule, index1, index2 } = swapPairsWithLogging(schedule, schedule.length);
    let newTime = calculateTotalPreparationTime(matrix, newSchedule);

    if (newTime < bestTime) {
      bestTime = newTime;
      bestSchedule = newSchedule;
    }

    schedule = newSchedule;
  }

  console.log(`Final best time after ${maxIterations} iterations: ${bestTime}`);
  return { bestSchedule, bestTime };
}

export function pairwiseConsole(numOfStudents, tau, deltaTau, maxIterations = 1000) {
  const matrix = generateMatrix(numOfStudents, tau, deltaTau);
  const lessonDurations = generateLessonDuration(numOfStudents);

  console.log('Тривалості занять:');
  console.table(lessonDurations);

  console.log('Матриця переналаштувань:');
  console.table(matrix);

  const initialSchedule = greedySchedule(matrix);
  console.log('Initial greedy schedule:', formatSchedule(initialSchedule));

  const startTime = performance.now();

  const { bestSchedule, bestTime } = optimizeScheduleWithLogging(matrix, initialSchedule, maxIterations);
  const totalLessonDuration = lessonDurations.reduce((acc, val) => acc + val, 0);
  const totalTF = totalLessonDuration + bestTime;

  const endTime = performance.now();
  const executionTimePairwise = endTime - startTime;

  console.log('Best schedule:', formatSchedule(bestSchedule));
  console.log('Best preparation time:', bestTime);
  console.log('Total preparation time:', totalTF);
  console.log('Execution time of pairwise algorithm:', executionTimePairwise, 'ms');
}

// Test Case
try {
  const numOfStudents = 8;
  const tau = 10;
  const deltaTau = 5;

  pairwiseConsole(numOfStudents, tau, deltaTau);
} catch (error) {
  console.error('Помилка:', error.message);
}
