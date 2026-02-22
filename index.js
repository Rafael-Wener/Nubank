const express = require ('express');
const bcrypt = require ('bcrypt');
const app = express();
const mysql = require('mysql2');
const path = require('path'); // Módulo nativo do Node, não precisa instalar
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const conectar = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rafaelwk1',
    database: 'Nubank'
});

conectar.connect((err) => {
    if (err) {
        console.error('Erro ao se conectar ao banco de dados', err);
        return;
    }else{
        console.log('conectado ao banco de dados');
    }
});

//ROTA 1: MENU
app.get('/', (req, res) => {
    res.render('menu');
});

//ROTA 2: 


app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:'+port);

});
//TERMINA