'use strict';

/**
 * @ngdoc overview
 * @name annotatewithmeApp
 * @description
 * # annotatewithmeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('annotatewithmeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
    'app.ngPouch',
    'ngStorage',
    'uuid'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/sessions/:sessionId', {
      templateUrl: 'views/annotate.html',
      controller: 'AnnotationCtrl',
      resolve: {
        foundSession: function ($q, $route, Session) {
          var deferred = $q.defer();
          var sessionId = $route.current.params.sessionId;
          Session.fetch(sessionId).then(function (foundSession) {
            $('head').append('<link rel="prefetch" href="' + foundSession.data["image_url"] + '">');
            deferred.resolve(foundSession.data);
          });

          return deferred.promise;
        }
      }})
    .otherwise({
      redirectTo: '/'
    });
});

//app.run(["Syncmanager", function(Syncmanager){}]);
