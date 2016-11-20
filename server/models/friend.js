console.log('friends model');
var mongoose = require('mongoose');
var friendSchema= new mongoose.Schema({
  first_name: String,
  last_name: String,
  birthday: Date
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

var Friend = mongoose.model('Friend', friendSchema);
