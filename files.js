import { readFile } from 'fs/promises';
import { readdirSync } from 'fs';
import { argv } from 'process';
import os from 'os';
import { join } from 'path';
 
function loadAllFiles(run, files) {
    const start = Date.now();
    const contents = files.map(file => readFile(file, { encoding: 'utf8' }));
    return Promise.all(contents).then(contents => {
        const time = Date.now() - start;
        const totalChars = contents.join('').length;
        console.log(`${run} loaded ${contents.length} files, ${totalChars} characters in ${time} ms`);
        return time;
    });
}

function average(vals) {
  return Math.floor(vals.reduce((t, v) => t + v, 0) / vals.length);
}

console.log("CPUs", os.cpus().length);

const folderPath = argv[2];
const repeats = parseInt(argv[3]);

const files = readdirSync(folderPath).map(file => join(folderPath, file));

const times = [];

for (let c = 0; c < repeats; c++) {
    times.push(await loadAllFiles(c, files));
}
console.log(`average ${average(times)} ms`);
