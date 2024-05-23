// Kovalenko Kateryna
import * as Generator from '../../generator/taskGenerator.js';
import * as results from '../ant/result_ant.js';

export function ant_console(n, t_matrix, less_matrix = Generator.generateLessonDuration(n), alpha = 1) {
    // Вимірювання часу виконання алгоритму
    const startTime = performance.now();
    // Параметри алгоритму
    let beta = 1;
    let tay_0 = 0.7;
    let p = 0.1;

    ///
    let tay_matrix = [];
    let lMax = 10;
    let result = [];
    let result_func;
    let repr = 0;
    let shedule = '';

    //Обираємо хто буде першим в матриці хлопчик чи дівчинка
    let gender = 'g'

    let t_use = t_matrix.slice().map(row => row.slice());
    //Матриця тривалостей уроків
    //let less_matrix = Generator.generateLessonDuration(n);

    console.log('Тривалості занять:');
    console.table(less_matrix);

    console.log('Матриця переналаштувань:');
    console.table(t_matrix);

    // Зведення матриці переналаштувань
    // console.log("Зведення матриці переналаштувань та знаходження нижньої межі:");

    function minFromRows(matrix) {
        return matrix.map(row => Math.min(...row));
    }

    let minsByRows = minFromRows(t_use);
    // console.log('Мінімальні по рядкам:', minsByRows.join(' '));

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
    // console.log('Матриця після віднімання мінімумів по рядках:', newMatrixRows);
    // console.log('Нова мінімальна границя:', newMinBorderRows);

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
    // console.log('Мінімальні по стовпцях:', minsByCols.join(' '));

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
    // console.log('Матриця після віднімання мінімумів по стовпцях:', newMatrixCols);
    // console.log('Нижня границя:', newMinBorderCols);

    let min_res = newMinBorderCols + newMinBorderRows;

    // Заповнення матриці ферамонів
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

    console.log('Матриця ферамонів:');
    console.table(tay_matrix); // Основна частина програми
    for (let k = 1; k <= lMax; k++) {
        let student = Math.floor(Math.random() * n); // Довільним чином обираємо першого учня на кожній ітерації
        console.log('ІТЕРАЦІЯ', k);
        console.log('Перший учень: ', student);
        let iteration_matrix = t_matrix.slice().map(row => row.slice());
        let result_it = []; // змінна з результатами кожної ітерації
        let result_it_func = 0;
        let repr_it = 0;
        let visited_array = Array.from({ length: n }, () => Array(n).fill(0));
        result_it.push(student);
        while (result_it.length < n) {
            for (let x = 0; x < n; x++) iteration_matrix[x][student] = Infinity;
            // console.log(iteration_matrix);
            // Обчислення знаменника з формули 1
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

            console.log('Проміжний результат: ', res_set);
            let randomNumber = parseFloat(Math.random()).toFixed(4); // Генерує випадкове число від 0 до 1
            console.log('Згенероване число: ', randomNumber);

            for (let [key, value] of res_set.entries()) {
                if (parseFloat(randomNumber) <= parseFloat(value)) {
                    student = key;
                    result_it.push(student);
                    break;
                }
            }

            console.log('Наступний учень : ', student);
            console.log('Поточний розклад: ');
            shedule = results.Schedule_(gender, result_it);
            console.log(shedule);
            console.log();
        }
        // Обчислення ЦФ :

        for (let i = 0; i < result_it.length - 1; i++) {
            const currentStudent = result_it[i];
            const nextStudent = result_it[i + 1];
            result_it_func +=
                parseFloat(t_matrix[currentStudent][nextStudent]) + less_matrix[i];
            repr_it += parseFloat(t_matrix[currentStudent][nextStudent]);
            visited_array[currentStudent][nextStudent] = 1;
        }
        console.table(t_matrix);
        console.log('Матриця проведених занять: ');
        console.table(visited_array);
        console.log('Результат ітерації', k, ': ');
        shedule = results.Schedule_(gender, result_it);
        console.log(shedule);
        console.log('Значення ЦФ: ', result_it_func);
        let delta_tay = min_res / result_it_func;
        // Оновлення матриці феромонів
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (t_matrix[i][j] != Infinity) {
                    if (visited_array[i][j] === 1)
                        tay_matrix[i][j] = parseFloat(
                            (1 - p) * tay_matrix[i][j] + delta_tay).toFixed(4);
                    else
                        tay_matrix[i][j] = parseFloat((1 - p) * tay_matrix[i][j]).toFixed(4);
                }
            }
        }
        console.log('Матриця феромонів: ');
        console.table(tay_matrix);
        if (k === 1) {
            result = result_it;
            result_func = result_it_func;
            repr = repr_it;
        } else if (result_func > result_it_func) {
            result = result_it;
            result_func = result_it_func;
            repr = repr_it;
        }
    }
    //////
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log();
    console.log('------------------------------------------------------');

    ;
    console.log('Кінцевий результат: ');
    shedule = results.Schedule_(gender, result);
    console.log(shedule);
    // console.log(result);
    console.log('Час переналаштувань: ', repr);
    console.log('Значення ЦФ: ', result_func);
    console.log('ExecutionTime: ', executionTime);
    return { shedule, result, result_func, executionTime };
}

// Test Case
try {
    // let t_matrix = generateMatrix(8, 10, 5);

    const n = 8;
    let t_matrix = [
        [Infinity, 15, Infinity, 20, Infinity, 5, Infinity, 10],
        [5, Infinity, 15, Infinity, 5, Infinity, 10, Infinity],
        [Infinity, 20, Infinity, 15, Infinity, 5, Infinity, 5],
        [10, Infinity, 20, Infinity, 5, Infinity, 10, Infinity],
        [Infinity, 15, Infinity, 15, Infinity, 5, Infinity, 5],
        [10, Infinity, 15, Infinity, 10, Infinity, 10, Infinity],
        [Infinity, 20, Infinity, 20, Infinity, 10, Infinity, 5],
        [5, Infinity, 15, Infinity, 5, Infinity, 5, Infinity],
    ];
    ant_console(n, t_matrix);
} catch (error) {
    console.error('Помилка:', error.message);
}