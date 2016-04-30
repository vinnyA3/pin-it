module.exports = function(app){
  app.directive('modalDialog', [function(){
    return{
      restrict: 'AEC',
      templateUrl: '../views/partials/modalView.html',
      scope:{
        show: '='
      },
      replace: true,
      transclude: true,
      link: function(scope,element,attrs){
        //watch for scope changes
         scope.dialogStyle = {};
         if (attrs.width)
           scope.dialogStyle.width = attrs.width;
         if (attrs.height)
           scope.dialogStyle.height = attrs.height;

         scope.hideModal = function() {
           scope.show = false;
         };
      }
    }
  }]);
}
