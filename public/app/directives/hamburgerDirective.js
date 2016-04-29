module.exports = function(app){
  app.directive('navbarToggle',[function(){
    return {
      restrict:'E',
      template:require('../views/partials/navbarPartial.html'),
      replace:true,
      link:function(scope,element,attrs){
        //main div/body/document, and megadropdown
        var doc = element.parent().parent().parent(),
            dropdown = element.parent().children()[1];
        console.log(doc);
        element.on('click',function(e){
          dropdown.classList.toggle('is-active');
          e.stopPropagation();
        });
        doc.on('click', function(){
          dropdown.classList.remove('is-active');
        });
      }
    }
  }]);
}
