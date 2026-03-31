const express = require('express');
const app = express();
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com Banco de Dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rafaelwk1',
    database: 'nubank_db'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// --- ROTAS ---

// ROTA 1: MENU PRINCIPAL
app.get('/', (req, res) => {
    res.render('menu');
});

// ROTA 2: RENDERIZAR PÁGINA DE TRABALHOS (Renomeada para evitar conflito)
app.get('/jobs-page', (req, res) => {
    res.render('job_menu');
});

// ROTA 3: API PARA BUSCAR DADOS (GET)
app.get('/api/jobs', (req, res) => {
    const sql = "SELECT * FROM trabalhos ORDER BY id DESC";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao buscar trabalhos");
        }
        res.json(result); // Use res.json para APIs
    });
});

// ROTA 4: API PARA SALVAR DADOS (POST)
app.post('/job', (req, res) => {
    const { nome, valor, data_entrega, categoria, tipo_cobranca, descricao } = req.body;
    const sql = "INSERT INTO trabalhos (nome, valor, data_entrega, categoria, tipo_cobranca, descricao) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nome, valor, data_entrega, categoria, tipo_cobranca, descricao], (err, result) => {
        if (err) {
            console.error("Erro no MySQL:", err);
            return res.status(500).send("Erro ao salvar no banco.");
        }
        res.send({ id: result.insertId, ...req.body });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});