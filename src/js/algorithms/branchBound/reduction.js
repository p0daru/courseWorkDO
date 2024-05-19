// Pohorila Dariia

// Функція для редукції матриці (мінімізація по рядках і стовпцях)
export function reduceMatrix(matrix, index) {
  let sumMinRows = 0; // Сума мінімальних значень по рядках
  let sumMinColumns = 0; // Сума мінімальних значень по стовпцях

  //MINROW
  matrix.forEach((array, index) => {
    let min = Math.min.apply(null, array); // Знаходження мінімального значення в рядку
    if (isNaN(min) || !isFinite(min)) {
      min = 0; // Якщо значення не є числом або не є кінцевим, встановити 0
    }
    sumMinRows += min; // Додати мінімальне значення до суми
    let minimizedRow = array.map(number => {
      return (number -= min); // Відняти мінімальне значення з кожного елемента рядка
    });
    matrix[index] = minimizedRow; // Оновити рядок в матриці
  });

  //TRANSPOSED
  matrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

  //MINCOL
  matrix.forEach((array, index) => {
    let min = Math.min.apply(null, array);
    if (isNaN(min) || !isFinite(min)) {
      min = 0;
    }
    sumMinColumns += min;
    let minimizedColumn = array.map(number => {
      return (number -= min);
    });
    matrix[index] = minimizedColumn;
  });

  //DISTRAMPOSE
  matrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

  let total = sumMinRows + sumMinColumns; // Загальна вартість мінімізації

  let node = {
    index: index,
    matrix: matrix,
    cost: total,
  };

  return node;
}
