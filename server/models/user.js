var mongoose = require('mongoose');

//new USer model emal , passwd
//email - require it, trim it, type string, min length 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required:true,
    minlength: 1,
    trim:true
  }
});


module.exports = {User};
