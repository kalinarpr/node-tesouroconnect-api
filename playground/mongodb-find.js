const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/tesouroconnect',(err,db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  var doc = {titulo:"Gamification na STN",
              resumo: "Gamification na STN",
              dataInicio: new Date("2018-02-15"),
              dataTermino: new Date("2018-03-15")};


  //db.collection('desafios').insertOne(doc,(err,res) => {
  //  if(err) throw err;
  //  console.log("1 document inserted");
  //});

  //db.collection('desafios').find({dataInicio: new Date("2018-02-15")}).count().then((count) => {
  //  console.log(`Desafios count ${count}`);
  //}, (err) => {
  //  console.log('unable to fetch Desafios');
  //});

  db.collection('desafios').find({dataInicio: new Date("2018-02-15")}).toArray().then((docs) => {
    console.log("Desafios");
    console.log(JSON.stringify(docs,undefined,2));
  }, (err) => {
    console.log('unable to fetch Desafios');
  });

//  db.close();


});
