import {createServer}  from 'http';

const port = 3000;
const host = 'localhost'

const re = /\d+/;

const server =  createServer((req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.end(`export default ${req.url.match(re)?.[0]};`);
});

server.listen(port, host, 10000, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
 