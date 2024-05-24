import * as Generator from '../../generator/taskGenerator.js';
import * as results from '../ant/result_ant.js';

    // Measure algorithm execution time
export function ant(
  n,
  t_matrix,
  less_matrix = Generator.generateLessonDuration(n),
  alpha = 1
) {
  // Measure algorithm execution time
  const startTime = performance.now();

  // Algorithm parameters
  let beta = 1;
  let tay_0 = 0.7;
  let p = 0.1;

  let tay_matrix = [];
  let lMax = 10;
  let result = [];
  let result_func;
  let schedule = '';

  // Choose who will be first in the matrix, boy or girl
  let gender = 'g';

  let t_use = t_matrix.slice().map(row => row.slice());

  // Reduce matrix preparation
  function minFromRows(matrix) {
    return matrix.map(row => Math.min(...row));
  }

  let minsByRows = minFromRows(t_use);

  function subEveryRow(matrix, minBorder) {
    const mins = minFromRows(matrix);
    minBorder += mins.reduce((acc, curr) => acc + curr, 0);

    const newMatrix = matrix.map((row, i) =>
      row.map((value, j) => value - mins[i])
    );

    return { matrix: newMatrix, minBorder };
  }

  let { matrix: newMatrixRows, minBorder: newMinBorderRows } = subEveryRow(
    t_use,
    0
  );

  function minFromColumns(matrix) {
    const mins = [];
    const columns = Object.keys(matrix[0]);

    columns.forEach(column => {
      const columnValues = matrix.map(row => row[column]);
      mins[column] = Math.min(...columnValues);
    });

    return mins;
  }

  let minsByCols = minFromColumns(t_use);

  function subEveryColumn(matrix, minBorder) {
    const mins = minFromColumns(matrix);
    minBorder += Object.values(mins).reduce((acc, curr) => acc + curr, 0);

    const newMatrix = matrix.map((row, i) =>
      row.map((value, j) => value - mins[j])
    );

    return { matrix: newMatrix, minBorder };
  }

  let { matrix: newMatrixCols, minBorder: newMinBorderCols } = subEveryColumn(
    t_use,
    0
  );

  let min_res = newMinBorderCols + newMinBorderRows;

  // Fill pheromone matrix
  for (let i = 0; i < n; ++i) {
    tay_matrix[i] = [];
    for (let j = 0; j < n; ++j) {
      if (t_matrix[i][j] != Infinity) {
        tay_matrix[i][j] = tay_0;
      } else {
        tay_matrix[i][j] = Infinity;
      }
    }
  }

  // Main part of the program
  for (let k = 1; k <= lMax; k++) {
    let student = Math.floor(Math.random() * n); // Randomly choose the first student in each iteration
    let iteration_matrix = t_matrix.slice().map(row => row.slice());
    let result_it = []; // variable with results of each iteration
    let result_it_func = 0;
    let visited_array = Array.from({ length: n }, () => Array(n).fill(0));
    result_it.push(student);

    while (result_it.length < n) {
      for (let x = 0; x < n; x++) iteration_matrix[x][student] = Infinity;

      // Calculate denominator from formula 1
      let formula_denominator = 0;
      let res_set = new Map();
      for (let i = 0; i < n; i++) {
        if (iteration_matrix[student][i] != Infinity) {
          formula_denominator +=
            parseFloat(tay_matrix[student][i] ** alpha) *
            (1 / t_matrix[student][i]) ** beta;
        }
      }
      for (let i = 0; i < n; i++) {
        let it = 0;
        if (iteration_matrix[student][i] != Infinity) {
          it = parseFloat(
            (tay_matrix[student][i] ** alpha *
              (1 / t_matrix[student][i]) ** beta) /
              formula_denominator
          ).toFixed(4);
          if (res_set.size === 0) res_set.set(i, parseFloat(it));
          else {
            let lastValue = Array.from(res_set.values()).pop();
            it = parseFloat(parseFloat(it) + parseFloat(lastValue)).toFixed(4);
            res_set.set(i, parseFloat(it));
          }
        }
      }

      let randomNumber = parseFloat(Math.random()).toFixed(4); // Generate a random number from 0 to 1

      for (let [key, value] of res_set.entries()) {
        if (parseFloat(randomNumber) <= parseFloat(value)) {
          student = key;
          result_it.push(student);
          break;
        }
      }
    }

    // Calculate TF:
    for (let i = 0; i < result_it.length - 1; i++) {
      const currentStudent = result_it[i];
      const nextStudent = result_it[i + 1];
      result_it_func +=
        parseFloat(t_matrix[currentStudent][nextStudent]) + less_matrix[i];
      visited_array[currentStudent][nextStudent] = 1;
    }

    let delta_tay = min_res / result_it_func;
    // Update pheromone matrix
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (t_matrix[i][j] != Infinity) {
          if (visited_array[i][j] === 1)
            tay_matrix[i][j] = parseFloat(
              (1 - p) * tay_matrix[i][j] + delta_tay
            ).toFixed(4);
          else
            tay_matrix[i][j] = parseFloat((1 - p) * tay_matrix[i][j]).toFixed(
              4
            );
        }
      }
    }

    if (k === 1) {
      result = result_it;
      result_func = result_it_func;
    } else if (result_func > result_it_func) {
      result = result_it;
      result_func = result_it_func;
    }
  }

  const endTime = performance.now();
  const executionTime = endTime - startTime;
  // console.log('Schedule: ');
  schedule = results.Schedule_(gender, result);
  // console.log(schedule);
  // console.log('TF: ', result_func);
  // console.log('ExecutionTime: ', executionTime);

  return { schedule, result, result_func, executionTime };
}
