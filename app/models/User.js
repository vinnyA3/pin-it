var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
  name: String,
  email: {type:String, index:{unique:true}},
  password: {type:String, select:false},
  posts: [{type: mongoose.SchemaTypes.ObjectId, ref:'Post'}]
});

//pre middleware - delete posts on user account delete
UserSchema.pre('remove', function(next){
  this.model('Posts').remove({posted_by: this._id}, next);
});

UserSchema.methods.hashPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8,null));
};

UserSchema.method.compare = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User',UserSchema);
