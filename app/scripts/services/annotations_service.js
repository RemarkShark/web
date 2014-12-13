'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.AnnotationsService
 * @description
 * # AnnotationsService
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .service('AnnotationsService', function AnnotationsService($routeParams, $rootScope, rfc4122, ngPouch, Constants) {

    var decorateAnnotationObj = function (annotation) {
      annotation.doc_type = Constants.document_type_annotation;
      annotation.created_at = annotation.created_at || new Date();
      return annotation;
    }

    this.createAnnotation = function (annotation) {
      return ngPouch.db.put(decorateAnnotationObj(annotation), rfc4122.v4());
    };

    this.createPersistedAnnotation = function (annotation) {
      ngPouch.db.save({key: annotation["id"], value: $.extend(true, annotation, {"deleted": false, "persisted": true})}, function () {
        $rootScope.$broadcast("annotations-changed");
      });
    };
//    this.getAnnotations = function (callback) {
//      var annotations = [];
//      ngPouch.db.all(callback);
//    };
    this.all = function (callback) {
      var allAnnotations = function (doc, emit) {
        if (doc.doc_type === Constants.document_type_annotation) {
          emit(doc.created_at, doc._id);
        }
      };

      ngPouch.db.query(allAnnotations, {descending: false, include_docs: true}, function (err, response) {
        callback(response.rows);
      });
      //ngPouch.db.where('record.value.deleted == false', callback);
    };
    this.getAllMarkedDelete = function (callback) {
      //ngPouch.db.where('record.value.deleted == true', callback);
    };
    this.updateAnnotation = function (id, annotation) {
//      ngPouch.db.remove(id);
//      annotation["persisted"] = false;
//      ngPouch.db.save({key: id, value: annotation});
    };
    this.deleteAnnotation = function (id) {
//      ngPouch.db.remove(id, function () {
//        $rootScope.$broadcast("annotations-changed");
//      });
    };
    this.flagDeletedAnnotation = function (id) {
//      var new_id;
//      if (typeof id == "number") {
//        new_id = id
//      } else {
//        new_id = '"' + id + '"';
//      }
//      ngPouch.db.where('record.key == ' + new_id, function (annotation) {
//        if (annotation.length != 0) {
//          annotation = annotation[0];
//          if (annotation.value.persisted == true) {
//            annotation.value.deleted = true;
//            ngPouch.db.save(annotation);
//          } else {
//            ngPouch.db.remove(id);
//          }
//        }
//      });
    };
    this.findAndInsert = function (id, callback) {
//      var new_id;
//      if (typeof id == "number") {
//        new_id = id
//      } else {
//        new_id = '"' + id + '"';
//      }
//      ngPouch.db.where('record.key == ' + new_id, callback);
    };
    this.deleteAll = function () {
//      ngPouch.db.nuke();
    };
    this.getAllUnpersisted = function (callback) {
//      ngPouch.db.where('record.value.persisted == false', callback);
    };
    this.getLatestAnnotation = function (callback) {
//      ngPouch.db.where('record.value.persisted == true', function (annotations) {
//        if (annotations.length > 0) {
//          var latest = _.max(annotations, function (annotation) {
//            return (new Date(annotation.value.updated_at));
//          });
//          callback(parseInt(new Date(latest.value.updated_at).getTime() / 1000));
//        } else {
//          callback(parseInt((new Date(new Date() - 3600000)).getTime() / 1000));
//        }
//      });
    }
  });
