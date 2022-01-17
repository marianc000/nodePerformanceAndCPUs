import express from 'express';
import * as http from 'http';

const app = express();
const port = 8082;
const staticRoot = 'static';

app.use(function (req, res, next) {
    res.header('Cache-Control', 'no-store');
    const origin = req.get('Origin');
    if (origin) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
});

app.use(express.static(staticRoot));

const re = /\d+/;
app.get('/nodisk/:name', function (req, res) {

    const { name } = req.params;
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
    res.send("export default " + name.match(re)[0] + ";");
})

const server = http.createServer(app).listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
