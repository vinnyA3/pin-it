module.exports = function(app){
  app.controller('testController', function(){
    var vm = this;
    vm.printData = [
      {title: 'Silicon Valley'},
      {title: 'Naked and Afraid'},
      {title: 'Dragon Ball Super'},
    ]
  });
}
