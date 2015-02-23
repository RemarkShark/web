angular.module('annotatewithmeApp')
  .service('Storage', function SessionService(pouchDB, Config) {
    var sessionId = null;
    var db = null;
    var sync = null;

    return {
      init: function (id) {
        if (id) {
          sessionId = id;
          db = pouchDB(sessionId);
          this.replication.start();
        }
      },
      db: function () {
        return db;
      },
      replication: {
        start: function () {
          var opts = {
            live: true
          };

          var sync = PouchDB.sync(sessionId, Config.couchdb_url + sessionId, {live: true})
            .on('error', function (err) {
              console.log(err);
            });
        },
        stop: function () {
          if (sync) {
            sync.cancel();
            sync = null;
          }
          db = null;
          sessionId = null;
        }
      }
    };
  });
