// Заміна значень рядка та стовпця на Infinity
export function replaceRowAndColumnWithInfinity(matrix, row, column) {
  return matrix.map((r, i) =>
    r.map((value, j) => (i === row - 1 || j === column - 1 ? Infinity : value))
  );

  // row - 1 -> оскільки беремо індекс, а не порядковий номер (maxPenalty.row = maxPenalty.index+1)
}

export function preventCycles(matrix, edges) {
  for (const [start, end] of edges) {
    // Заборонити перехід між симетричними координатами
    if (matrix[end - 1][start - 1] !== Infinity) {
      matrix[end - 1][start - 1] = Infinity;
      console.log(`Симетричний перехід (${end}, ${start}) заборонено`);
    }

    for (const [otherStart, otherEnd] of edges) {
      if (
        start !== otherStart &&
        start !== otherEnd &&
        end !== otherEnd &&
        end !== otherStart
      ) {
        console.log(
          'Знайдено цикл (координати не мають однакових значень)',
          [start, end],
          [otherStart, otherEnd]
        );

        const transitions = new Set([
          [start, otherStart],
          [start, otherEnd],
          [end, otherStart],
          [end, otherEnd],
          [otherStart, start],
          [otherStart, end],
          [otherEnd, start],
          [otherEnd, end],
        ]);

        for (const [vertex1, vertex2] of transitions) {
          if (
            !edges.some(edge => edge[0] === vertex1 && edge[1] === vertex2) &&
            matrix[vertex1 - 1][vertex2 - 1] !== Infinity
          ) {
            matrix[vertex1 - 1][vertex2 - 1] = Infinity;
            console.log(`Заборонено перехід (${vertex1}, ${vertex2})`);
          }
        }
      }
    }
  }

  return matrix;
}

// function doOperations(modifiedMatrix, minBorder) {
//   console.log(subEveryRow(modifiedMatrix, minBorder));
//   console.log(subEveryColumn(modifiedMatrix, minBorder));
// }

// doOperations(modifiedMatrix, newMinBorderCols);

///////////////////////  NOTES
// CASE-1. Not Bad ;))
// function forbidNonHamiltonianCycles(matrix, edges) {
//   for (let i = 0; i < edges.length; i += 1) {
//     const start = edges[i][0];
//     const end = edges[i][1];

//     // Заборонити перехід між симетричними координатами
//     if (matrix[end - 1][start - 1] !== Infinity) {
//       matrix[end - 1][start - 1] = Infinity;
//       console.log(
//         `Симетричний перехід від вершини ${end} до вершини ${start} заборонено`
//       );
//     }

//     for (let j = 0; j < edges.length; j += 1) {
//       if (i !== j) {
//         const otherStart = edges[j][0];
//         const otherEnd = edges[j][1];

//         if (
//           start !== otherStart &&
//           start !== otherEnd &&
//           end !== otherEnd &&
//           end !== otherStart
//         ) {
//           console.log(
//             'Знайдено цикл (координати не мають однакових значень)',
//             [start, end],
//             [otherStart, otherEnd]
//           );

//           const transitions = [
//             [start, otherStart],
//             [start, otherEnd],
//             [end, otherStart],
//             [end, otherEnd],
//             [otherStart, start],
//             [otherStart, end],
//             [otherEnd, start],
//             [otherEnd, end],
//           ];

//           transitions.forEach(([vertex1, vertex2]) => {
//             if (
//               !edges.some(edge => edge[0] === vertex1 && edge[1] === vertex2)
//             ) {
//               matrix[vertex1 - 1][vertex2 - 1] = Infinity;
//               console.log(
//                 `Заборонено перехід від вершини ${vertex1} до вершини ${vertex2}`
//               );
//             }
//           });
//         }
//       }
//     }
//   }

//   return matrix;
// }

// CASE-2. REFERENCE
// Заборона негамільтонових циклів
// /**
//  * Предотвращение негамильтоновых контуров (циклов)
//  * Изменяет path
//  * @param {number[][]} matrix - Вхідна матриця
//  * @param {number[][]} path - Матриця шляхів
//  * @return {number[][]} - Матриця зі зміненими значеннями
//  */
// export function preventCycle(matrix, path) {
//   // console.log('Поиск циклов');
//   let paths = path;
//   let pathCopy = [...path];
//   for (let row in paths) {
//     let column = paths[row];
//     if (matrix[column][row] !== undefined) {
//       matrix[column][row] = Infinity;
//     }
//     for (let rowCopy in pathCopy) {
//       let columnCopy = pathCopy[rowCopy];
//       if (row === columnCopy) {
//         paths[rowCopy] = column;
//         delete paths[row];
//         if (matrix[rowCopy][column] !== undefined) {
//           matrix[rowCopy][column] = Infinity;
//         }
//         if (matrix[column][rowCopy] !== undefined) {
//           matrix[column][rowCopy] = Infinity;
//         }
//         console.log(`Цикл найден. уничтожен [${rowCopy}][${column}]`);
//         return preventCycle(matrix, paths);
//       }
//     }
//   }
//   console.log('Цикл не найден');
//   return matrix;
// }

// CASE-3. PREVENT ONLY SYMMETRIC
// function forbidNonHamiltonianCycles(matrix, edges) {
//   // Перевіряємо кожне ребро з масиву ребер
//   //   for (const [start, end] of edgesArray) {
//   //     // Забороняємо перехід від start до end
//   //     matrix[end - 1][start - 1] = Infinity;
//   //     console.log(end - 1, start - 1);
//   //   }

//   for (let i = 0; i < edges.length; i += 1) {
//     console.log(edges[i]);
//     const start = edges[i][0];
//     const end = edges[i][1];

//     // Забороняємо перехід від start до end
//     matrix[end - 1][start - 1] = Infinity;
//   }

//   //   return matrix;
// }
