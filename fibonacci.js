
import os from 'os';

function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

function average(vals) {
    return vals.reduce((t, v) => t + v, 0) / vals.length;
}

function measure(func) {
    const results = [];
    for (let i = 0; i < 10; i++) {
        const start = Date.now();
        const r = func(40);
        const time = (Date.now() - start);
        results.push(time);
        console.log(i + " " + r + " in " + time);
    }
    console.log('average: ', average(results));
}

console.log("CPUs", os.cpus().length);
measure(fibonacci);
