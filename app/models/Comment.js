var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
  posted_by_name: String,
  posted_by_id: mongoose.SchemaTypes.ObjectId,
  comment: String,
  date: Date
});

CommentSchema.pre('remove', function(next){
  this.model('Post').update(
    {},
    {'$pull': {'comments': this._id}},
    next
  );
});

module.exports = mongoose.model('Comment', CommentSchema);
