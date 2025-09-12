const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    origin: '*',
}));

var dataList = []
var weatherData = {
    temperatura: null,
    umidade: null,
}
//res.sendFile(__dirname + 'public/index.html') ||

app.get('/', (req, res) => {
     res.send("o problema é no public");
});


app.get('/weatherData', (req, res) => {
    weatherData.temperatura = req.query.temp || 14.0;
    weatherData.umidade = req.query.umid || 80.0;

    dataList.push(weatherData);

    if(dataList.length > 5){
        dataList.shift();
    }

    res.json({clima: dataList});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`);
});