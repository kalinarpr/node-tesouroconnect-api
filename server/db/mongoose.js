//mongoose validators & mongoose schemas
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TesouroConnect');

module.exports = {mongoose};
