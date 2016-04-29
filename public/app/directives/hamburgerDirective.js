module.exports = function(app){
  app.directive('navbarToggle',[function(){
    return {
      restrict:'E',
      template:require('../views/partials/navbarPartial.html'),
      replace:true,
      link:function(scope,element,attrs){
        /*refactor to see fit
        var mainView = element.parent().parent().parent(),
            mainDiv = element.parent().parent(),
            nav = mainView[0].querySelector('.drawer-nav');*/

        element.on('click',function(e){
        //  nav.classList.toggle('js-drawer-nav-open');
          alert('clicked');
          e.stopPropagation();
        });
        /*mainDiv.on('click', function(){
          nav.classList.remove('js-drawer-nav-open');
        })*/
      }
    }
  }]);
}
