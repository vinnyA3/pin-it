module.exports = function(app){
  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider){
    $stateProvider
      .state('home',{
        url:'/',
        views:{
          //main - home - all pins page
          '': {templateUrl: './pages/home.html'}
        }
      })
      .state('single-post',{
        url: '/post',
        views:{
          '':{templateUrl: './pages/single-post.html'}
        }
      })
      .state('logged-in-user-page',{
        url:'/dash',
        views:{
          '':{templateUrl: './pages/logged-in-user.html'}
        }
      });
      //set base href to /
      $locationProvider.html5Mode(true);
  }]);
}
