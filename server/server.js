const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Challenge} = require('./models/challenge');

var app = express();
//middleware
app.use(bodyParser.json());

// POST /desafio
app.post('/desafio', (req,res) => {
  var desafio = new Challenge({
    titulo:req.body.titulo,
    resumo:req.body.resumo,
    dataCriacao: Date.now(),
    dataTermino:req.body.dataTermino,
    desafiante:req.body.desafiante
  });
  desafio.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// POST /user/login {email,senha}
app.post('/user/login', (req,res) => {
  var body = _.pick(req.body,['email','pwd']);

  res.send(body);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = {app};
