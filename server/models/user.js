const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema(
{
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

//Instance methods

//override do método. Devolve um objeto json somente
//com as propriedades que queremos enviar ao user.
//FALTA A FOTO!
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj,['_id','login','nome','area','funcao'])
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(),access},'abc123');

  user.tokens = user.tokens.concat({access},{token});

  return user.save().then(() =>{
    return token;
  })
};

//Class methods
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,'abc123');
  }catch(e){
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(login,senha){
  var User = this;

  return User.findOne({login}).then((user) => {
    if (!user) {
      Promise.reject();
    }
    return new Promise((resolve,reject) => {
      if (user.senha === senha){
        resolve(user);
      } else {
        reject();
      }
    });
  });
};

var User = mongoose.model('User',UserSchema);

/*User.statics.findByCredentials = function (email,pwd) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      if (user.senha == pwd){
            resolve(user);
        } else {
          reject();
        }
      });
    });
}*/

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
