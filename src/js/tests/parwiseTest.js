import { generateMatrix, getGreedyResults, calculateTotalPreparationTime } from '../algorithms/greedy.js';
import { getResultsPP } from '../algorithms/pairwisePermut.js';
import { ant } from '../algorithms/ant/ant.js';

// Параметри
const numOfStudents = [4, 6, 8, 10, 12, 14, 16, 18, 20]; // Розмірність задачі
const tau = 100; // Значення математичного сподівання
const deltaTau = 10; // Значення напівінтервалу

document.addEventListener('DOMContentLoaded', () => {
    // Запуск тесту та побудова діаграм
    const data = deviationTest(numOfStudents, tau, deltaTau);
    drawDeviationChart(data, 'deviationTest'); // Відображення діаграм

    // Середні відхилення для виведення в консоль
    let { averageDeviationsFromAnt, averageDeviationsFromGreedy } = deviationTest(numOfStudents, tau, deltaTau);

    console.log('Середні відхилення ЦФ для методу попарних перестановок відносно ЦФ отриманої за допомогою мурашиного алгоритму – ', averageDeviationsFromAnt);
    console.log('Середні відхилення ЦФ для методу попарних перестановок відносно ЦФ отриманої за допомогою жадібного алгоритму – ', averageDeviationsFromGreedy);
});

// Тестова функція для розрахунку відхилень
function deviationTest(numOfStudents, tau, deltaTau) {
    let averageDeviationsFromAnt = [];
    let averageDeviationsFromGreedy = [];

    for (let n of numOfStudents) {
        let deviationsFromAnt = [];
        let deviationsFromGreedy = [];

        for (let i = 0; i < 20; i++) {
            // Згенерувати індивідуальну задачу P
            let P = generateMatrix(n, tau, deltaTau);

            // Розв’язати задачу P методом попарних перестановок, де початкова задача P визначена мурашиним алгоритмом
            let { result: antSchedule, result_func: antTF } = ant(n, P);

            // Розв’язати задачу P методом попарних перестановок, де початкова задача P визначена жадібним алгоритмом
            let { schedule: greedySchedule } = getGreedyResults(P);
            let greedyTF = calculateTotalPreparationTime(P, greedySchedule);

            // Вивід результатів жадібного алгоритму
            console.log(`Розмірність задачі: ${n}, Запуск: ${i + 1}`);
            console.log(`  Початковий розв’язок з жадібного алгоритму - Цільова функція (ЦФ): ${greedyTF}`);
            console.log(`  Початковий розв’язок з мурашиного алгоритму - Цільова функція (ЦФ): ${antTF}`);

            // Розв’язати задачу P методом попарних перестановок
            let { bestTime: ppTimeFromAnt } = getResultsPP(P, antSchedule);
            let { bestTime: ppTimeFromGreedy } = getResultsPP(P, greedySchedule);

            // Вивід результатів методу попарних перестановок
            console.log(`  Попарні перестановки з початковим розв’язком з мурашиного алгоритму - ЦФ: ${ppTimeFromAnt}`);
            console.log(`  Попарні перестановки з початковим розв’язком з жадібного алгоритму - ЦФ: ${ppTimeFromGreedy}`);

            // Розрахувати відхилення ЦФ
            let deviationFromAnt = calculateDeviation(ppTimeFromAnt, antTF);
            let deviationFromGreedy = calculateDeviation(ppTimeFromGreedy, greedyTF);

            console.log(`  Відхилення ЦФ для методу попарних перестановок відносно ЦФ отриманої за допомогою мурашиного алгоритму: ${deviationFromAnt}`);
            console.log(`  Відхилення ЦФ для методу попарних перестановок відносно ЦФ отриманої за допомогою жадібного алгоритму: ${deviationFromGreedy}`);

            deviationsFromAnt.push(deviationFromAnt);
            deviationsFromGreedy.push(deviationFromGreedy);
        }

        // Визначити середнє відхилення ЦФ
        averageDeviationsFromAnt.push(calculateAverage(deviationsFromAnt));
        averageDeviationsFromGreedy.push(calculateAverage(deviationsFromGreedy));
    }

    return {
        labels: numOfStudents, // Мітки для діаграми
        averageDeviationsFromAnt,
        averageDeviationsFromGreedy,
    };
}

// Функція для розрахунку відхилення ЦФ
function calculateDeviation(value1, value2) {
    return Math.abs(value1 - value2) / Math.min(value1, value2);
}

// Побудова діаграм
function drawDeviationChart(data, htmlElement) {
    const ctx = document.getElementById(htmlElement).getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                    label: 'Відхилення від ЦФ мурашиного алгоритму',
                    data: data.averageDeviationsFromAnt,
                    backgroundColor: 'rgb(96, 130, 182)',
                    borderColor: 'rgba(70, 130, 180, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Відхилення від ЦФ жадібного алгоритму',
                    data: data.averageDeviationsFromGreedy,
                    backgroundColor: 'rgb(182, 96, 130)',
                    borderColor: 'rgba(180, 70, 130, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Середнє відхилення ЦФ для методу попарних перестановок відносно ЦФ мурашиного та жадібного алгоритмів',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Середнє відхилення: ${context.raw}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Кількість студентів (n)',
                    },
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Середнє відхилення',
                    },
                },
            },
            layout: {
                backgroundColor: 'rgba(211, 211, 211, 1)',
            },
        },
    });
}

// Розрахунок середнього значення масиву
function calculateAverage(arr) {
    if (arr.length === 0) {
        return 0; // Повернути 0, якщо масив пустий
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum / arr.length;
}