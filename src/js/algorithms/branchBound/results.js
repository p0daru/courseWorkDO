// export function printSchedule(minCostArray) {
//   let schedule = ''; // Початкове значення розкладу

//   // Проходимо по елементах масиву minCostArray, починаючи з другого елемента
//   for (let i = 0; i < minCostArray.length; i++) {
//     if (i === minCostArray.length - 1) {
//       if (i % 2 === 0) {
//         schedule += `g${minCostArray[i].Node}`;
//       } else if (i % 2 !== 0) {
//         schedule += `b${minCostArray[i].Node}`;
//       }
//     } else {
//       if (i % 2 === 0) {
//         schedule += `g${minCostArray[i].Node} -> `; // Додаємо номер вузла до розкладу
//       } else if (i % 2 !== 0) {
//         schedule += `b${minCostArray[i].Node} -> `;
//       }
//     }
//   }
//   return schedule; // Повертаємо розклад
// }

export function printSchedule(minCostArray) {
  let schedule = ''; // Початкове значення розкладу

  // Проходимо по елементах масиву minCostArray, починаючи з другого елемента
  for (let i = 0; i < minCostArray.length; i++) {
    const isLastNode = i === minCostArray.length - 1;
    const node = minCostArray[i].Node;
    const isEven = i % 2 === 0;

    if (isLastNode) {
      schedule += isEven ? `g${node}` : `b${node}`;
    } else {
      schedule += isEven ? `g${node} -> ` : `b${node} -> `;
    }
  }

  return schedule; // Повертаємо розклад
}

export function sumOfDurations(durations) {
  return durations.reduce((acc, duration) => acc + duration, 0);
}

export function calcTrainerWorkTime(totalDuration, lastCost) {
  return totalDuration + lastCost;
}
