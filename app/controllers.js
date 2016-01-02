/*jslint node: true */
/*jslint nomen: true */
/*global angular, _ */
function strict() {
  "use strict";  
}

angular.module("myApp.controllers", []).controller("songCtrl", function($scope, songService, youtubeEmbed) {
  
  $scope.width = 640;
  $scope.height = 360;
  $scope.index = 0;
  $scope.songs = songService.get(); 
  $scope.newSong = {};
  $scope.viewSong = $scope.songs[0];

  $scope.addSong = function(/** String */ artist, /** String */ title, /** String */ id) {
    $scope.songs.push({
      artist: artist,
      title: title,
      id: id,
      score: 0
    });
    $scope.newSong.title = "";
    $scope.newSong.artist = "";
  };
  
  $scope.deleteSong = function(/** Song */ song) {
    var idx = $scope.songs.indexOf(song);
    if (idx >= 0) {
      $scope.songs.splice(idx, 1);
    }
  };

  $scope.viewSongFunc = function (/** Song */ song) {
    $scope.viewSong = song;   
    console.log(song);
  };
  
  $scope.isEmpty = function(/** String */ str) {
    return _.isBlank(str);
  };
  
  $scope.$watch('songs', function (/** Songs */ newValue ,/** Songs */ oldValue ) { // "oldValue" is unused
    if (newValue !== oldValue) {
      songService.put($scope.songs);
    }
  }, true);

  $scope.go = function(){
    $scope.nextVideo();
  };

  $scope.videoID = function(){
    return $scope.viewSong.id;
  };

  $scope.nextVideo = function(){
    $scope.index = ($scope.index + 1) % $scope.songs.length;
    $scope.viewSong = $scope.songs[$scope.index];
  };

  $scope.code = function(){
    return '<youtube id="' + $scope.viewSong.id + '" width="400" height="360" current-time="time" controls="1"></youtube>';
  };
});
