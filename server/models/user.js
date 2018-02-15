const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User',{
  login:{
    type: String,
    required: true,
    trim:true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  senha:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: false//true
    },
    token: {
      type: String,
      required: false//true
    }
  }],
  nome: {
    type: String
  },
  area: {
    type: String,
    required: true
  },
  funcao:{
    type: String
  },
  foto: {
    data: Buffer,
    contentType: String
  }
});

module.exports = {User};

//Codigo modelo
//var fs = require('fs');
//var user = new User({
//  login: "kalinarpr@gmail.com",
//  senha: "123456",
//  nome: "Kalina Porto",
//  area: "COSIS",
 //funcao: ""
//});

//user.foto.data = fs.readFileSync("../images/mulher_icon.gif");
//user.foto.contentType = "image/gif";

//user.save().then((doc) => {
//  console.log("saved user",doc);
//}, (e) => {
//  console.log("unable to save user", e);
//});
