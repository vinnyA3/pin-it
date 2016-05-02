var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
  property_of: mongoose.SchemaTypes.ObjectId,
  title: String,
  content_link: String,
  img_link: String,
  description: String,
  comments: [{type: mongoose.SchemaTypes.ObjectId, ref:'Comment'}],
  loves: Number
});

PostSchema.pre('remove', function(next){
  this.model('User').update(
    {},
    {"$pull": {"posts": this._id}},
    next
  );
});

module.exports = mongoose.model('Post', PostSchema);
