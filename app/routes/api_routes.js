var api = require('../controllers/api_controller'),
    auth = require('../middlewares/auth_middleware');

module.exports = function(express){
   var router = express.Router();
   //================== API ROUTES ===================
   //======== UNAUTHENTICATED ROUTES ==========
   //get all posts
   router.get('/posts', api.get_all_posts);
   //get individual post
   router.get('/posts/:post_id', api.get_post);
   //get a specific user's page / posts
   router.get('/user/:user_id', api.get_user_page);
   //======== PROTECTED/AUTHENTICATED ROUTES =========
   //create a comment
   router.post('/posts/:post_id', auth.ensure_authenticated, api.create_comment)
   //upvote/downvote post
         .put('/posts/:post_id', auth.ensure_authenticated, api.vote);
   //delete comment
   router.delete('/comment/:comment_id', auth.ensure_authenticated, api.delete_comment);
   //== User Posts/Account ==
   //get logged in user's posts
   router.get('/user-posts', auth.ensure_authenticated, api.get_user_posts)
   //create a post
         .post('/user-posts', auth.ensure_authenticated, api.create_post);
   //delete a post
   router.delete('/user-posts/:post_id', auth.ensure_authenticated, api.delete_post);
   //return router
   return router;
};//end exports function
