const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectID} = require('mongodb');

var ChallengeSchema = new mongoose.Schema(
{
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
    type: String,//ObjectID,
    required: true
  },
  foto: {
    data: Buffer,
    contentType: String
  }
});

var Challenge = mongoose.model('Challenge',ChallengeSchema);
module.exports = {Challenge};
