require('./config/config');
const express = require('express');
const bodyParser = require('body-parser'); //allows to send JSON to a server.
const _=require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT;

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
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
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
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

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

app.patch('/todos/:id', (req,res) => {
  //get the id
  //validate id
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);


  //validate id to make sure its a valid id using isValid
    //not valid 404 - send back empty

  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  };

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});
app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
