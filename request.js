 import * as http from 'http';
 
 
 function get(url) {
    return new Promise(resolve => {
        const req = http.request(new URL(url), res => {
            let data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => {
                resolve(data.join(''));
            });
        }).end();
    });
}
 
const times = [];

function avg(ar) {
    return Math.round(ar.reduce((a, b) => a + b, 0) / ar.length);
}

function measure(params) {
    const t0 = Date.now();
    const ar = [];

    for (let i =2; i < 500; i++) {
       
         ar.push(get(params.baseUrl + `module${i}.js`));
    }

    return Promise.all(ar).then(ar => {
        params.times.push(Date.now() - t0);
      //  console.log(params.baseUrl, params.times.length, ar.join('\n').length, params.times[params.times.length - 1]+' ms');
     // console.log(ar.join('\n'));
        return params;
    });

}

function measureUrl(baseUrl, title) {
    let p = Promise.resolve({ baseUrl, times: [], title });


    for (let i = 0; i < 11; i++) {
        p = p.then(measure).then( params => new Promise(resolve => setTimeout(()=>resolve(params), 1000)));
    }

    return p.then(params => {
        params.times.shift();
       // console.log(params.title + " at " + params.baseUrl, "-", avg(params.times)+" ms");
               console.log(params.title + " at " + params.baseUrl, "; avg="+avg(params.times)+" ms");
        console.log(params.times.join(", "));
        console.log( );
    });
}

new Promise(resolve => setTimeout(resolve, 3000))
   
    .then(() => measureUrl("http://localhost:8082/disk/", "Node.js static"))
    .then(() => measureUrl("http://localhost:8082/nodisk/", "Node.js no static"));
