// Об`єкт функцій для генерації вхідних даних
const taskGenerator = {
  /**
   * Генерує матрицю передування для заданої кількості студентів.
   * @param {number} numOfStudents - Кількість студентів.
   * @param {number} tau - Значення математичного сподівання.
   * @param {number} deltaTau - Значення напівінтервалу ∆τ.
   * @returns {number[][]} - Матриця передування.
   */
  generateMatrix: function (numOfStudents, tau, deltaTau) {
    // Перевірка вхідних даних
    validateInputs(numOfStudents, tau, deltaTau, true);

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
   * Генерує тривалість занять для заданої кількості студентів.
   * @param {number} numOfStudents - Кількість студентів.
   * @returns {number[]} - Массив з тривалостями занять.
   */
  generateLessonDuration: function (numOfStudents) {
    // Перевірка вхідних даних
    validateInputs(numOfStudents);

    // Генерація тривалостей занять у діапазоні від 45 до 120 хвилин
    const times = Array.from(
      { length: numOfStudents },
      () => Math.floor(Math.random() * (120 - 45 + 1)) + 45
    );

    return times;
  },
};

/**
 * Перевірка вхідних даних.
 * @param {number} numOfStudents - Кількість студентів.
 * @param {number} [tau] - Значення математичного сподівання.
 * @param {number} [deltaTau] - Значення напівінтервалу ∆τ.
 * @param {boolean} [checkTauDeltaTau=false] - Флаг для перевірки tau та deltaTau.
 * @throws {Error} - Якщо неправильні вхідні дані.
 */
export function validateInputs(
  numOfStudents,
  tau,
  deltaTau,
  checkTauDeltaTau = false
) {
  if (
    !Number.isInteger(numOfStudents) ||
    numOfStudents <= 0 ||
    numOfStudents % 2 !== 0 // Кількість студентів повинна бути парною
  ) {
    throw new Error(
      'Неправильні вхідні дані! Очікується ціле додатнє парне число для numOfStudents.'
    );
  }

  if (checkTauDeltaTau) {
    if (tau < 0 || deltaTau < 0) {
      throw new Error(
        'Неправильні вхідні дані! Очікуються не від’ємні значення для tau і deltaTau.'
      );
    }
  }
}

// Приклад використання
// try {
//   const matrix = taskGenerator.generateMatrix(4, 50, 10);
//   console.log('Матриця передування:', matrix);

//   const lessonDurations = taskGenerator.generateLessonDuration(4);
//   console.log('Тривалості занять:', lessonDurations);
// } catch (error) {
//   console.error(error.message);
// }

// Експорт функцій
export const generateMatrix = taskGenerator.generateMatrix;
export const generateLessonDuration = taskGenerator.generateLessonDuration;

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
