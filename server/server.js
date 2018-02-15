const express = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Challenge} = require('./models/challenge');

var app = express();
//middleware
app.use(bodyParser.json());

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

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
