import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv'
import { contatoModel, contatoModelUpdate } from './check.js';

dotenv.config()

const { Pool } = pg;
const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});


const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM contato';
        const contatos = await db.query(sql);

        res.status(200).send(contatos.rows);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ erro: 'Um erro ocorreu' });
    }

});

app.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'SELECT * FROM contato WHERE id = ' + id;
        const contatos = await db.query(sql);

        res.status(200).send(contatos.rows);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ erro: 'Um erro ocorreu' });
    }
});

app.post('/', async (req, res) => {
    try {
        const { error } = contatoModel.validate(req.body);
        if (error) {
            res.status(400).send({ mens: error.details[0].message });
            return;
        }
        const { nome, telefone, email, nota, ativo } = req.body;
        const values = [nome, telefone, email, nota, ativo];
        const sql = 'INSERT INTO contato(nome, telefone, email, nota, ativo) VALUES ($1, $2, $3, $4, $5)';

        const r = await db.query(sql, values);
        res.status(201).send(r);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ erro: 'Um erro ocorreu' });
    }
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const contatoAlterar = req.body;

    const {error} = contatoModelUpdate.validate(contatoAlterar);
    if (error){
        res.status(400).send({mens: error.details[0].message});
        return;
    }

    var sqlTemp = ['UPDATE contato']; // UPDATE contatos
    sqlTemp.push('SET'); // UPDATE contatos SET
    var temp = [];

    const col = Object.keys(contatoAlterar);
    col.forEach((c, i) => {
        temp.push(c + ' = $' + (i + 1));
    })

    sqlTemp.push(temp.join(', ')); // UPDATE contatos SET nome = $1, telefone = $2
    sqlTemp.push('WHERE id = ' + id + ' RETURNING *'); // UPDATE contatos SET nome = $1, telefone = $2 WHERE id = 1 RETURNING *
    const sql = sqlTemp.join(' ');

    var atributos = col.map((c) => {
        return contatoAlterar[c];
    })

    try {
        const r = await db.query(sql, atributos);
        res.status(200).send(r.rows);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ erro: 'Um erro ocorreu' });
    }
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const sql = 'DELETE FROM contato WHERE id = $1';
        const r = db.query(sql, [id]);
        res.status(200).send({ mensagem: 'Contato removido' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ erro: 'Um erro ocorreu' });
    }

});


app.listen(process.env.APP_PORT, () => console.log('AGENDA - API WEB executando'));