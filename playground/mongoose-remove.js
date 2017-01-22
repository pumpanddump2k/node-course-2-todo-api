const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Mongoose
//Todo.remove({}) -- matches all records with the objects

// Todo.remove({}).then((result) => {
//   console.log(result);
// })
//

//find one and remove
//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findByIdAndRemove('58841626c32a1431a8160c57').then((todo) => {
console.log(todo);
});
