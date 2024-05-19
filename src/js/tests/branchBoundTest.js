import * as results from '../algorithms/branchBound/bnbResults.js';
import * as Generator from '../generator/taskGenerator.js';

// Вхідні дані
const numOfStudents = 8;
const tau = 100;
const deltaTauMassive = [10, 50];

function testBnb(numOfStudents, tau, deltaTauMassive) {
  let targetFunctions = [];
  const trainingDuration = Generator.generateLessonDuration(numOfStudents);

  for (let i = 0; i < deltaTauMassive.length; i += 1) {
    const matrix = Generator.generateMatrix(
      numOfStudents,
      tau,
      deltaTauMassive[i]
    );

    console.log(`\nІТЕРАЦІЯ ${i + 1}`);
    results.outputResultsBnB(matrix, trainingDuration);
    let res = results.outputResultsBnB(matrix, trainingDuration);
    targetFunctions.push(res);
  }

  return targetFunctions;
}

testBnb(numOfStudents, tau, deltaTauMassive);
let res = testBnb(numOfStudents, tau, deltaTauMassive);
console.log(res);
