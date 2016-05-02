var User = require('../models/User'),
    Post = require('../models/Post'),
    Comment = require('../models/Comment');

// ========  UNAUTHENTICATED  ===========
exports.get_all_posts = function(req,res){
  Post.find({})
  .populate('comments')
  .exec(function(err,posts){
    if(err){
      return res.send(err);
    }
    return res.send({success:true, posts: posts});
  });
};

exports.get_post = function(req,res){
  var post_id = req.params.post_id;
  Post.find({'_id': post_id})
      .populate('comments')
      .exec(function(err,post){
          if(err){
            return res.send(err);
          }
          return res.send({success:true, post: post});
       });
};

exports.get_user_page = function(req,res){
  var user_id = req.params.user_id;
  User.find({'_id': user_id})
      .populate('posts')
      .exec(function(err,user){
         if(err){
           return res.send(err);
         }
         return res.send({success: true, user: user});
      });
};

// ========  AUTHENTICATED  ===========
exports.create_comment = function(req,res){
  var post_id = req.params.post_id,
      new_comment = new Comment();
  new_comment.posted_by_name = req.body.name;
  new_comment.posted_by_id = req.user;
  new_comment.comment = req.body.comment;
  new_comment.date = new Date();

  new_comment.save(function(err,comment){
    if(err){
      return res.send(err);
    }
    //push the new comment's id into the post
    Post.update({'_id': post_id},
         {$push: {comments: comment.id}},
          function(err){
            if(err){
              return res.send(err);
            }
            return res.send({success: true, message: 'Comment Added!'});
          });
  });
};

exports.delete_comment = function(req,res){
  var comment_id = req.params.comment_id;
  Comment.findOne({'_id': comment_id}, function(err,comment){
    if(err){
      return res.send(err);
    }
    comment.remove(function(err){
      if(err){
        return res.send(err);
      }
      return res.send({success: true, message: 'Comment deleted!'});
    });
  });
};

exports.vote = function(req,res){
  var post_id = req.params.post_id;

    Post.update({'_id': post_id},
         {$inc: {'loves': 1}},
         function(err){
           if(err){
             return res.send(err);
           }
           return res.send({success: true, message: 'Post upvoted!'});
         });
};

exports.create_post = function(req,res){
  var new_post = new Post();
  new_post.property_of = req.user;
  new_post.title = req.body.title;
  new_post.content_link = req.body.content_link;
  new_post.img_link = req.body.img_link;
  new_post.description = req.body.description;
  new_post.upvotes = 0;
  new_post.downvotes = 0;

  new_post.save(function(err,post){
    if(err){
      return res.send(err);
    }
    //push the post's id into the logged in users's posts array
    User.update({'_id':req.user},
       {$push: {posts: post.id}},
       function(err){
         if(err){
           return res.send(err);
         }
           return res.send({success: true, message: 'Created Post!'});
       });
  });
};

exports.get_user_posts = function(req,res){
  User.find({'_id': req.user})
      .populate('posts')
      .exec(function(err,user){
        if(err){
          return res.send(err);
        }
        return res.send({success:true, user:user});
      });
};

exports.delete_post = function(req,res){
  var post_id = req.params.post_id;
  Post.findOne({'_id': post_id}, function(err, post){
    if(err){
      return res.send(err);
    }
    post.remove(function(err){
      if(err){
        return res.send(err);
      }
      else{
        return res.send({success: true, message: 'Post deletion successful!'});
      }
    });
  });
};
