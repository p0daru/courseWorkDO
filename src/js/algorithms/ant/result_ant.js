export function Schedule_(gender, result) {
    let schedule = ''; // Початкове значення розкладу

    // Проходимо по елементах масиву, починаючи з першого елемента

    if ((gender === 'g' && result[0] % 2 === 0) || (gender === 'b' && result[0] % 2 === 1)) {
        for (let i = 0; i < result.length; i++) {
            const isLastNode = i === result.length - 1;
            const value = result[i];
            const isEven = i % 2 === 0;
            if (isLastNode) {
                schedule += isEven ? `g${value+1}` : `b${value+1}`;
            } else {
                schedule += isEven ? `g${value+1} -> ` : `b${value+1} -> `;
            }
        }
    } else if ((gender === 'g' && result[0] % 2 === 1) || (gender === 'b' && result[0] % 2 === 0)) {
        for (let i = 0; i < result.length; i++) {
            const isLastNode = i === result.length - 1;
            const value = result[i];
            const isEven = i % 2 === 0;
            if (isLastNode) {
                schedule += isEven ? `b${value+1}` : `g${value+1}`;
            } else {
                schedule += isEven ? `b${value+1} -> ` : `g${value+1} -> `;
            }
        }
    }


    return schedule; // Повертаємо розклад
}