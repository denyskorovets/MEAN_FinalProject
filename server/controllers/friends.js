console.log('friends controller');
var mongoose = require('mongoose');
var Friend =  mongoose.model('Friend');

function FriendsController(){
  this.index = function(req,res){
      Friend.find({}, function (err, friends) {
          if (err) {
              console.log(err);
              console.log("We got error(s) while finding all friends!");
              res.json({placeholder: err});
          } else {
              res.json({friends});
          }
      })
  };

  this.create = function(req, res){
      console.log("POST DATA", req.body);
      // create a new Friend
      var friend = new Friend({first_name: req.body.first_name, last_name: req.body.last_name, birthday: req.body.birthday});
      // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
      friend.save(function (err) {
          // if there is an error console.log that something went wrong!
          if (err) {
              console.log('something went wrong');
              res.json({placeholder: "Failed attempting to create a Friend!"});
          } else {
              res.json({placeholder: "Success creating a new friend!"});
          }
      })
  };

  this.update = function(req, res){
      id = req.params.id;
      Friend.update({_id: id}, {first_name: req.body.first_name, last_name: req.body.last_name, birthday: req.body.birthday}, function (err, friends) {
          if (err) {
              console.log("FRIEND'S ID WASN'T FOUND");
              res.redirect('/');
          } else{
              console.log("FRIEND WAS UPDATED");
              res.json({placeholder:'friend updated'});
          }
      })
  };

  this.delete = function(req, res){
      id = req.params.id;
      console.log("id is: " + id);
      Friend.remove({_id: id}, function (err) {
          if (err) {
              res.json({placeholder: 'error while deleting'});
          }
          else {
              res.json({placeholder: 'Friend Deleted!'});
          }
      })
  };

  this.show = function(req,res){
      Friend.findOne({_id: req.params.id}, function(err, friend){
          if(err) {
              console.log("Error While showing");
              res.json({err});
          }
          else{
              res.json({friend});
          }
      })
  };
}
module.exports = new FriendsController(); // what does this export?