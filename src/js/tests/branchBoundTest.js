// Pohorila Dariia
// Дослідження впливу часу роботи МГтМ на значення ЦФ.
import * as results from '../algorithms/branchBound/bnbResults.js';

// Ініціалізувати вхідні дані
const numOfStudents = 8;
const tau = 100;
const deltaTauMassive = [10, 50];

for (let i = 0; i < deltaTauMassive.length; i += 1) {
  console.log(`\nІТЕРАЦІЯ ${i + 1}`);
  results.resultsBnB(numOfStudents, tau, deltaTauMassive[i]);
}
