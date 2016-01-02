/*jslint node: true */
/*global angular */
function strict() {
  "use strict";
}

angular.module("myApp.directives", [])
.directive("rating", function() {
  var directive = { };
  directive.restrict = 'AE';
  
  directive.scope = {
    score: '=score',
    max: '=max'
  };

  directive.templateUrl = "app/templates/rating.html";
  
  directive.link = function(scope, elements, attr) { // "elements", "atts" is unused
    
    scope.updateStars = function() {
      var idx = 0;
      scope.stars = [ ];
      for (idx = 0; idx < scope.max; idx += 1) {
        scope.stars.push({
          full: scope.score > idx
        });
      }
    };
    
    scope.hover = function(/** Integer */ idx) {
      scope.hoverIdx = idx;
    };
    
    scope.stopHover = function() {
      scope.hoverIdx = -1;
    };
    
    scope.starColor = function(/** Integer */ idx) {
      var starClass = 'rating-normal';
      if (idx <= scope.hoverIdx) {
       starClass = 'rating-highlight'; 
      }
      return starClass;
    };
    
    scope.starClass = function(/** Star */ star, /** Integer */ idx) {
      var starClass = 'fa-star-o';
      if (star.full || idx <= scope.hoverIdx) {
        starClass = 'fa-star';
      }
      return starClass;
    };
    
    scope.setRating = function(idx) {
      scope.score = idx + 1;
      scope.stopHover();
    };
    
    scope.$watch('score', function(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        scope.updateStars();
      }
    });
  };
  
  return directive;
})
.directive('youtube', ['youtubeEmbed', '$window', '$interval', function(youtubeEmbed, $window, $interval){
  return {
    restrict: 'E',
    template: '<div id="player"></div>',
    scope: {
        state: '=',
        currentTime: '='
    },
    link: function(scope, element, attrs){
      //scope.playerState = 
      scope.currentTime = 0;
      youtubeEmbed.yt().then(function(yt){
        $window.onYouTubePlayerAPIReady = function(){
          scope.createPlayer = function(attrs){
            if(scope.player) 
              scope.player.destroy();
            var controls = (attrs.controls) ? attrs.controls : 1;
            var autoplay = (attrs.autoplay) ? attrs.autoplay : 1;
            var player = new YT.Player('player', {
              height: attrs.height,
              width: attrs.width,
              videoId: attrs.id,
              playerVars: { 'autoplay': autoplay, 'controls': controls },
            });
            player.addEventListener("onStateChange", function(state){
              if(state.data==1){
                scope.timer = function(){
                  if(scope.player)
                    scope.currentTime = player.getCurrentTime();
                };
              }else{
                if(scope.timer){
                  $interval.cancel(scope.timer);
                }
              }
            });
            return player;
          };
          scope.player = scope.createPlayer(attrs);

          scope.$watch(function(){ return attrs.id;}, function(newVal){
            var videoId = newVal;
            scope.player = scope.createPlayer(attrs);
          });

          scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                if(scope.timer){
                  $interval.cancel(scope.timer);
                  scope.timer = null;
                }
              });

        };
      });
    }
  };
}]);
