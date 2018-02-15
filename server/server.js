var mongoose = require('mongoose');
var fs = require('fs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TesouroConnect');

var User = mongoose.model('User',{
  login:{
    type: String
  },
  senha:{
    type: String
  },
  nome: {
    type: String
  },
  area: {
    type: String
  },
  funcao:{
    type: String
  },
  foto: {
    data: Buffer,
    contentType: String
  }
});

var newUser = new User({
  login: "kalinarpr@gmail.com",
  senha: "12345",
  nome: "Kalina Porto",
  area: "COSIS",
  funcao: ""
});

newUser.foto.data = fs.readFileSync("C:/Users/kalina.porto.STN/Documents/GERAN/projetos/node.js/node-tesouroconnect-api/images/mulher_icon.gif");
newUser.foto.contentType = "image/gif";

newUser.save().then((doc) => {
  console.log("saved user",doc);
}, (e) => {
  console.log("unable to save user");
});
