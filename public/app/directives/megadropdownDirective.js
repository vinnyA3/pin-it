module.exports = function(app){
  app.directive('megaDropdown', function(){
    return{
      restrict:'E',
      template:require('../views/partials/megadropdownPartial.html'),
      replace:true
    }
  });
}
