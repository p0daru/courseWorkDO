// Pohorila Dariia

// Заборона негамільтонових шляхів
export function setRowColumnInfinity(matrix, from, to) {
  // Функція для встановлення нескінченності у вказаних рядках та стовпцях
  const thisMatrix = matrix.map(row => row.slice());

  for (let i = 0; i < matrix.length; i += 1) {
    thisMatrix[from][i] = Infinity; // Встановлення нескінченності в рядку
    thisMatrix[i][to] = Infinity; // Встановлення нескінченності в стовпці
    thisMatrix[to][from] = Infinity; // Встановлення нескінченності у зворотному напрямку
    thisMatrix[to][0] = Infinity; // Встановлення нескінченності в першому елементі стовпця
  }

  return thisMatrix;
}
