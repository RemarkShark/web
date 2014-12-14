'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.SessionService
 * @description
 * # SessionService
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .service('Session', function SessionService($http, $q, ngPouch, Constants) {
    var BASE_URL = "http://localhost:8080";
    var onNewSession = function (id) {
      ngPouch.saveSettings({database: Constants.couchdb_url + id,
        stayConnected: true });
    };

    var operation = function (type) {
      if (type == 'get') {

      } else if (type == 'post') {

      }
    }
    return {
      create: function (imageUrl) {
        var deferred = $q.defer();
        $http.post(BASE_URL + "/api/sessions", {"image_url": imageUrl}).then(function (res) {
          onNewSession(res.data.id);
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      fetch: function (id) {
        var deferred = $q.defer();
        $http.get(BASE_URL + "/api/sessions/" + id).then(function (res) {
          onNewSession(res.data.id);
          deferred.resolve(res);
        });
        return deferred.promise;
      }
    }
  });
