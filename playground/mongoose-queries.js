const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '5a86cebfa1f6b12c1061eb3c';

if (!ObjectID.isValid(id)){
  return console.log('ID not valid!');
}

//User.find({
//  _id: id
//}).then((users) => {
//  console.log('Users',users)
//});

//User.findOne({
//  _id: id
//}).then((user) => {
//  console.log('user', user);
//});

User.findById(id).then((user) => {
  if(!user){
    return console.log('User not found');
  }
  console.log('user', user);
});
