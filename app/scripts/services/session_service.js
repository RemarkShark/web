'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.SessionService
 * @description
 * # SessionService
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .service('Session', function SessionService($q, ngPouch, Constants) {
    var onNewSession = function (id) {
      ngPouch.saveSettings({database: Constants.couchdb_url + id,
        stayConnected: true });
    };

    return {
      create: function (imageUrl) {
        var deferred = $q.defer();
        deferred.resolve({"data": {"uniq_hash": "asd-asd-asd", "img_src": imageUrl}});
        onNewSession("asd-asd-asd");
        return deferred.promise;
        //return $http.post("/api/v1/sessions", {"img_src": imageUrl});
      },
      fetch: function (id) {
        //return $http.get("/api/v1/sessions/" + id);
      }
    }
  });
