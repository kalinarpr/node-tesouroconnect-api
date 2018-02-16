const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Challenge} = require('./models/challenge');
var {authenticate} = require('./middleware/authenticate');

var app = express();
//middleware
app.use(bodyParser.json());

// POST /desafio
app.post('/desafio', (req,res) => {
  var body = _.pick(req.body,['titulo','resumo','dataTermino','desafiante']);
  body.dataCriacao = Date.now();
  var desafio = new Challenge(body);

  desafio.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// POST /user
// Registra um novo usuário
app.post('/user', (req,res) => {
  var body = _.pick(req.body,['login','senha','nome','area','funcao']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// POST /user/login {email,senha}
app.post('/user/login', (req,res) => {
  var body = _.pick(req.body,['email','pwd']);

  res.send(body);
});

// GET /desafios
app.get('/desafios', (req,res) => {
  Challenge.find().then((desafios) => {
    res.send({desafios});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /desafios/:id
app.get('/desafios/:id',(req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Challenge.findById(id).then((desafio) => {
    if(!desafio){
      return res.status(404).send();
    }
    res.send(desafio);
  }).catch((e) => {
      res.status(400).send(e);
  });
});

//private paths
app.get('/user/me', authenticate, (req,res) => {
    res.send(req.user);

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = {app};
