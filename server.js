const express = require ('express');
//const bcrypt = require ('bcrypt');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rafaelwk1',
    database: 'nubank_db'
});

app.post('/job', (req, res) => {
    const { nome, valor, data_entrega, categoria, tipo_cobranca, descricao } = req.body;
    
    // O comando SQL precisa ter 6 interrogações (?) agora
    const sql = "INSERT INTO trabalhos (nome, valor, data_entrega, categoria, tipo_cobranca, descricao) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nome, valor, data_entrega, categoria, tipo_cobranca, descricao], (err, result) => {
        if (err) {
            console.error("Erro no MySQL:", err);
            return res.status(500).send("Erro ao salvar no banco.");
        }
        res.send({ id: result.insertId, ...req.body });
    });
});

//ROTA 1: MENU
app.get('/', (req, res) => {
    res.render('menu');
});

//ROTA 2: 
app.get('/job', (req, res) => {
    res.render('job_menu');
});

app.listen(port, () => {
    console.log('Conectado ao banco de dados MYSQL, Servidor rodando em http://localhost:' + port);
});
//TERMINA