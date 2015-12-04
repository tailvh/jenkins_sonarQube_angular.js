/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
function strict() {
  "use strict";  
}
 
angular.module("myApp", [
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

_.mixin(_.string.exports());
