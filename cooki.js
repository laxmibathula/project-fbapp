const express = require('express')
const app = express();
var STATIC_DIR = __dirname;


app.use(express.static(STATIC_DIR));
console.log( __dirname);

const port = 3000;

app.get('/cookie', (req, res) => {
    res.sendFile(STATIC_DIR + '/spinner.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});