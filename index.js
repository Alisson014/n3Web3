const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors({
    origin: '*',
}));

var dataList = []
var weatherData = {
    temperatura: null,
    umidade: null,
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/RegisterWeatherData', (req, res) => {
    weatherData.temperatura = req.query.temp || 14.0;
    weatherData.umidade = req.query.umid || 80.0;

    dataList.push(weatherData);

    if(dataList.length > 5){
        dataList.shift();
    }

    res.json({message: "registrado com sucesso!"});
});

app.get('/weatherData', (req, res) => {
    res.json({ data: dataList });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Rodando em http://localhost:${port}`);
});