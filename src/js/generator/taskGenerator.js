// Об`єкт функцій
const taskGenerator = {
  /**
   * Генерує матрицю передування для заданої кількості студентів.
   * @param {number} numOfStudents - Кількість студентів.
   * @param {number} tau - Значення математичного сподівання.
   * @param {number} deltaTau - Значення напівінтервалу ∆τ.
   * @returns {number[][]} - Матриця передування.
   * @throws {Error} - Якщо неправильні вхідні дані.
   */
  generateMatrix: function (numOfStudents, tau, deltaTau) {
    // Перевірка вхідних даних
    if (
      !Number.isInteger(numOfStudents) ||
      numOfStudents <= 0 ||
      tau < 0 ||
      deltaTau < 0
    ) {
      throw new Error(
        'Неправильні вхідні дані! Очікується ціле додатнє число numOfStudents, tau >= 0 та deltaTau >= 0.'
      );
    }

    // Верхня та нижня границі для генерації випадкових значень
    const minVal = tau - deltaTau;
    const maxVal = tau + deltaTau;

    // Створення та заповнення матриці значеннями
    const matrix = Array.from({ length: numOfStudents }, () =>
      Array.from({ length: numOfStudents }, () => Infinity)
    );

    for (let i = 0; i < numOfStudents; i += 1) {
      for (let j = 0; j < numOfStudents; j += 1) {
        // Перевірка, чи парність індексів різна
        if (i % 2 !== j % 2) {
          matrix[i][j] =
            Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        }
      }
    }

    return matrix;
  },

  /**
   * Генерує тривалість зайнять.
   */
  generateLessonDuration: function (numOfStudents) {
    let times = [];
    for (let i = 0; i < numOfStudents; i += 1) {
      times.push(Math.floor(Math.random() * (120 - 45 + 1)) + 45);
    }
    return times;
  },
};

// Експорт функцій
export const generateMatrix = taskGenerator.generateMatrix;
export const generateLessonDuration = taskGenerator.generateLessonDuration;

// export const testMethod = taskGenerator.testMethod;

//===== Test case 2 ====//
// export function generateMatrix(numOfStudents, tau, deltaTau) {
//   let matrix = []; // матриця передування

//   for (let i = 0; i < numOfStudents; i += 1) {
//     matrix[i] = [];

//     for (let j = 0; j < numOfStudents; j += 1) {
//       // якщо обидва індекси парні або непарні
//       if (i % 2 === j % 2) {
//         matrix[i][j] = Infinity;
//         continue; // наступна ітерація
//       }

//       let minVal = tau - deltaTau; // нижнє значення
//       let maxVal = tau + deltaTau; // верхнє значення

//       matrix[i][j] = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
//     }
//   }

//   return matrix;
// }

// let numOfStudents = 5; // Кількість учнів
// let tau = 5; // Значення математичного сподівання
// let deltaTau = 2; // Значення напівінтервалу ∆τ
// let matrix = generateMatrix(numOfStudents, tau, deltaTau);
// console.table(matrix);

/// Матриця з прикладу курсової
// let precedenceMatrix = [
//   [NaN, 15, NaN, 20, NaN, 5, NaN, 10],
//   [5, NaN, 15, NaN, 5, NaN, 10, NaN],
//   [NaN, 20, NaN, 15, NaN, 5, NaN, 5],
//   [10, NaN, 20, NaN, 5, NaN, 10, NaN],
//   [NaN, 15, NaN, 15, NaN, 5, NaN, 5],
//   [10, NaN, 15, NaN, 10, NaN, 10, NaN],
//   [NaN, 20, NaN, 20, NaN, 10, NaN, 5],
//   [5, NaN, 15, NaN, 5, NaN, 5, NaN],
// ];
