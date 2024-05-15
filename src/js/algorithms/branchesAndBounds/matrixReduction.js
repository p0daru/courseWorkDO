// Знаходження мінімальних елементів по рядкам
export function minFromRows(matrix) {
  return matrix.map(row => Math.min(...row));
}

// Віднімання мінімумів по рядках
export function subEveryRow(matrix, newMinBorderRows) {
  const mins = minFromRows(matrix);
  newMinBorderRows += mins.reduce((acc, curr) => acc + curr, 0);

  const newMatrix = matrix.map((row, i) =>
    row.map((value, j) => value - mins[i])
  );

  return { matrix: newMatrix, newMinBorderRows };
}

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
export function subEveryColumn(matrix, newMinBorderCols) {
  const mins = minFromColumns(matrix);
  newMinBorderCols += Object.values(mins).reduce((acc, curr) => acc + curr, 0);

  const newMatrix = matrix.map((row, i) =>
    row.map((value, j) => value - mins[j])
  );

  return { matrix: newMatrix, newMinBorderCols };
}

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
