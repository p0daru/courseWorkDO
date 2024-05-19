function deepCopyMatrix(matrix) {
  return matrix.map(row => row.slice());
}