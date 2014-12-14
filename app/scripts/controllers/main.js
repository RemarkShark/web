'use strict';

/**
 * @ngdoc function
 * @name annotatewithmeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the annotatewithmeApp
 */
angular.module('annotatewithmeApp')
    .controller('MainCtrl', function ($scope, $location, $timeout, Session) {

      var openSession = function (session) {
        $('head').append('<link rel="prefetch" href="'+ session["image_url"] + '">');
        sessionStorage.setItem(session.id, JSON.stringify(session));
        $timeout(function () {
          $location.path("/sessions/" + session.id);
        });
      }

      $scope.newSession = function (imageUrl) {
        if (imageUrl && imageUrl.trim().length > 0) {
          Session.create(imageUrl).then(function (createdSession) {
            openSession(createdSession.data)
          });
        }
      };

      $scope.joinSession = function (sessionId) {
        if (sessionId) {
          Session.fetch(sessionId).then(function (foundSession) {
            openSession(foundSession.data)
          });
        }
      };
    });
