//require angular
var angular = require('angular');
//require satellizer
require('satellizer');
//require ui-router
require('angular-ui-router');
var app = angular.module('mainApp', ['satellizer','ui.router']);
//required directives
require('./directives/hamburgerDirective.js')(app);
//required controllers
require('./controllers/testController.js')(app);
//app routes
require('./app-routes.js')(app);
