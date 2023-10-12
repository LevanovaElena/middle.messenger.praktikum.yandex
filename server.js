// server.js
const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();


app.use(express.static(`${__dirname}/dist/`));

app.listen(PORT, function () {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT} ${__dirname}`);
});

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('*', express.static(path.join(__dirname, 'dist/index.html')));
