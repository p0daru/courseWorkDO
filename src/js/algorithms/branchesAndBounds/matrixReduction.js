// Знаходження мінімальних елементів по стовпцях
export function minFromColumns(matrix) {
  const mins = [];
  const columns = Object.keys(matrix[0]);

  columns.forEach(column => {
    const columnValues = matrix.map(row => row[column]);
    mins[column] = Math.min(...columnValues);
  });

  return mins;
}

// Віднімання мінімумів по стовпцях
export function subEveryColumn(matrix) {
  const mins = minFromColumns(matrix);

  return matrix.map(row =>
    row.map((value, j) => {
      if (mins[j] === Infinity) {
        return value;
      } else {
        return value - mins[j];
      }
    })
  );
}

// var-1 columns
// export function subEveryColumn(matrix, newMinBorderCols) {
//   const mins = minFromColumns(matrix);
//   newMinBorderCols += Object.values(mins).reduce((acc, curr) => acc + curr, 0);

//   const newMatrix = matrix.map((row, i) =>
//     row.map((value, j) => value - mins[j])
//   );

//   return { matrix: newMatrix, newMinBorderCols };
// }

// var-2 columns
// export function subEveryColumn(matrix, newMinBorderCols) {
//   const mins = minFromColumns(matrix);

//   const newMatrix = matrix.map(row =>
//     row.map((value, j) => {
//       if (mins[j] === Infinity) {
//         return value;
//       } else {
//         return value - mins[j];
//       }
//     })
//   );

//   const validMins = Object.values(mins).filter(min => min !== Infinity);
//   newMinBorderCols += validMins.reduce((acc, curr) => acc + curr, 0);

//   return { matrix: newMatrix, newMinBorderCols };
// }

// Знаходження мінімальних елементів по рядкам
export function minFromRows(matrix) {
  return matrix.map(row => Math.min(...row));
}

// Віднімання мінімумів по рядках
// var3
export function subEveryRow(matrix) {
  const mins = minFromRows(matrix);

  return matrix.map((row, i) => {
    if (mins[i] === Infinity) {
      return row;
    } else {
      return row.map(value => value - mins[i]);
    }
  });
}

// var1
// export function subEveryRow(matrix, newMinBorderRows) {
//   const mins = minFromRows(matrix);
//   newMinBorderRows += mins.reduce((acc, curr) => acc + curr, 0);

//   const newMatrix = matrix.map((row, i) =>
//     row.map((value, j) => value - mins[i])
//   );

//   return { matrix: newMatrix, newMinBorderRows };
// }

// var2 check Infinity
// export function subEveryRow(matrix, newMinBorderRows) {
//   const mins = minFromRows(matrix);

//   const newMatrix = matrix.map((row, i) => {
//     if (mins[i] === Infinity) {
//       return row;
//     } else {
//       return row.map(value => value - mins[i]);
//     }
//   });

//   const validMins = mins.filter(min => min !== Infinity);
//   newMinBorderRows += validMins.reduce((acc, curr) => acc + curr, 0);

//   return { matrix: newMatrix, newMinBorderRows };
// }

// Сума констант зведення
export function sumOfReducedElements(minsByCols, minsByRows) {
  let totalSum = 0;
  for (let i = 0; i < minsByCols.length; i += 1) {
    totalSum += minsByCols[i];
  }

  for (let i = 0; i < minsByRows.length; i += 1) {
    totalSum += minsByRows[i];
  }

  return totalSum;
}

// export function sumMins(matrix) {
//   let sum = 0;

//   const mins = minFromRows(matrix);
//   const validMins = mins.filter(min => min !== Infinity);
//   sum += validMins.reduce((acc, curr) => acc + curr, 0);

//   const colsMins = minFromColumns(matrix);
//   const validColsMins = Object.values(colsMins).filter(min => min !== Infinity);
//   sum += validColsMins.reduce((acc, curr) => acc + curr, 0);

//   return sum;
// }

export function sumOfMins(minFromRows, minFromColumns) {
  const sumValidMins = mins =>
    mins.filter(min => min !== Infinity).reduce((acc, curr) => acc + curr, 0);

  // const sumRows = sumValidMins(minFromRows(matrix));
  // const sumCols = sumValidMins(Object.values(minFromColumns(matrix)));

  const sumRows = sumValidMins(minFromRows);
  const sumCols = sumValidMins(minFromColumns);

  return sumRows + sumCols;
}
