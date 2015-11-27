/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
function strict() {
  "use strict";
}

angular.module("myApp.filters", []).filter("titleize", function() {
  return function(/** String */ input) {
    return _.titleize(input);
  };
});
