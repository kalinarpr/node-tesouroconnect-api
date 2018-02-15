const mongoose = require('mongoose');
const validator = require('validator');

var Challenge = mongoose.model('Challenge',{
  titulo:{
    type: String,
    required: true,
    trim: true
  },
  resumo:{
    type: String,
    required: true,
  },
  dataCriacao:{
    type: Date,
    required: true
  },
  dataTermino:{
    type: Date,
    required: true
  },
  desafiante:{
    type: String,
    required: true
  }
});

module.exports = {Challenge};
