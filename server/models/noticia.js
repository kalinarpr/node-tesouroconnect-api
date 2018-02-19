const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

var NewsSchema = new mongoose.Schema({
  autor:{
    type: String,//ObjectID,
    required: true
  },
  tipo:{
    type: String,
    enum: ['curtiu','criou','respondeu','conquistou'],
    required: true
  },
  objeto: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    required: true
  },
  fotoAutor: {
    data: Buffer,
    contentType: String
  },
  fotoObjeto:{
    data: Buffer,
    contentType: String
  }
});

var News = mongoose.model("News",NewsSchema);
module.exports = {News};
