//====== AUTH ROUTES ========
//auth controller
var auth = require('../controllers/auth_controller');

module.exports = function(express){
  var router = express.Router();
  //============ SIGN UP / LOGIN ROUTES =============
  //signup
  router.post('/signup', auth.signup);
  //login
  router.post('/login', auth.login);
  //return the router
  return router;
}//end exports
