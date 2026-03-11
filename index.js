const express = require ('express');
//const bcrypt = require ('bcrypt');
const app = express();
//const mysql = require('mysql2');
const path = require('path');
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//ROTA 1: MENU
app.get('/', (req, res) => {
    res.render('menu');
});

//ROTA 2: 
app.get('/job', (req, res) => {
    res.render('job_menu');
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:' + port);
});
//TERMINA