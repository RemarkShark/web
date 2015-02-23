'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.SessionService
 * @description
 * # SessionService
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .service('Session', function SessionService($http, $q, Storage, Config) {
    var onNewSession = function (id) {
      if (id) {
        Storage.replication.stop(); // To stop any replication if currently running...
        Storage.init(id);
      }
    };

    return {
      create: function (imageUrl) {
        var deferred = $q.defer();
        $http.post(Config.base_url + "/api/sessions", {"image_url": imageUrl}).then(function (res) {
          onNewSession(res.data.id);
          deferred.resolve(res);
        });
        return deferred.promise;
      },
      fetch: function (id) {
        var deferred = $q.defer();
        $http.get(Config.base_url + "/api/sessions/" + id).then(function (res) {
          onNewSession(id);
          deferred.resolve(res);
        });
        return deferred.promise;
      }
    }
  });
