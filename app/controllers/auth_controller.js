var User = require('../models/User'),
    config = require('../../config/config'),
    jwt = require('jwt-simple'),
    moment = require('moment');
//============ CREATE TOKEN FUNCTION ==============
function create_token(user){
  var payload = {
    sub: user._id,
    iat: moment.unix(),
    //expiration: 14 days
    exp: moment().add(14,'days').unix()
  };
  return jwt.encode(payload, config.secret);
};
//signup
exports.signup = function(req,res){
  //create the new user
  var newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = newUser.hashPassword(req.body.password);

  newUser.save(function(err,user){
    if(err){
      if(err.code === 11000){
        return res.send({success:false, message: 'A user with that email already exists!'});
      }else{
        return res.send(err);
      }
    }
    return res.send({success:true, token:create_token(user), user:user});
  });
};
//login
exports.login = function(req,res){
  //first check if the user is in the database
  User.findOne({'email':req.body.email})
    .select('email password')
    .exec(function(err,user){
      if(err){throw err;}
      if(!user){
        return res.send({success:false, message:'That user does not exist!'});
      }else if(user){
        //check if the password is valid
        var validPass = user.comparePassword(req.body.password);
        if(!validPass){
          return res.send({success:false, message:'Incorrect password!'});
        }else{
          return res.send({success:true, token:createToken(user)});
        }
      }
    });
};
