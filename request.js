// request.js
import { request } from 'http';
import os from 'os';

function get(url) {
    return new Promise(resolve => {
        const req = request(url, res => {
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                resolve(data.join(''));
            });
        }).end();
    });
}

function average(ar) {
    return Math.round(ar.reduce((a, b) => a + b, 0) / ar.length);
}

function measure({ url, run, times }) {
    const t0 = Date.now();
    const ar = [];
    for (let i = 1; i < 5000; i++) {
        ar.push(get(url + `module${i}.js`));
    }

    return Promise.all(ar).then(ar => {
        times.unshift(Date.now() - t0);
        console.log(`${run} loaded ${ar.length} files, ${ar.join('').length} characters in ${times[0]} ms`);
        run++;
        return { url, run, times };
    });
}

console.log("CPUs", os.cpus().length);

let p = new Promise(resolve => setTimeout(() => resolve({ url: 'http://localhost:3000/', times: [], run: 0 })));

for (let i = 0; i < 11; i++) {
    p = p.then(measure);
}

p.then(({ times }) => {
    times.pop();
    console.log(`average ${average(times)} ms`);
});
 