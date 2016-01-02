/*jslint node: true */
/*global angular, localStorage */
function strict() {
  "use strict";  
}

angular.module("myApp.services", [])
.factory("songService", function() {
  var STORAGE_ID = 'myApp.songs', factory = { };
  
  factory.get = function() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  };
  
  factory.put = function(songs) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(songs));
  };
  
  return factory;
})
.factory('youtubeEmbed', ['$document', '$q', '$rootScope', function($document, $q, $rootScope){

	var y = $q.defer();

	function onScriptLoad(){
		y.resolve(window.yt);
	}

	var scriptTag = $document[0].createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.async = true;
	scriptTag.src = 'https://www.youtube.com/player_api';
	scriptTag.onreadystatechange = function(){
		if(this.readyState == 'complete')
			onScriptLoad();
	};
	
	scriptTag.onload = onScriptLoad();

	var s = $document[0].getElementsByTagName('body')[0];
	s.appendChild(scriptTag);

	return {
		yt: function(){ return y.promise; }
	};

}]);

