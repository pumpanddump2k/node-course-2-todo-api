var express = require('express');
var bodyParser = require('body-parser'); //allows to send JSON to a server.

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post ('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {res.send({todos});}, (e) => {
    res.status(400).send(e);
  });
});


//GET /todos/1235566
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

  //validate id to make sure its a valid id using isValid
    //not valid 404 - send back empty

  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  };

  Todo.findById(id).then((todo) => {
    if (!todo) {return res.status(404).send();}
    res.send({todo});
  }).catch((e) => res.status(400).send());

    //findById
    //success - if todo - send it back
    // if no todo - send back 404 with empty body
    //error - send back 400 and send back nothing

});

app.delete('/todos/:id', (req,res) => {

//get the id
//validate id
var id = req.params.id;

//validate id to make sure its a valid id using isValid
  //not valid 404 - send back empty

if (!ObjectID.isValid(id)) {
    return res.status(404).send();
};

//remove todo by id

Todo.findByIdAndRemove(id).then((todo) => {
  if (!todo) {return res.status(404).send();}
  res.status(200).send({todo});
}).catch((e) => res.status(400).send());


});
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
