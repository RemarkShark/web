'use strict';

/**
 * @ngdoc function
 * @name annotatewithmeApp.controller:AnnotationCtrl
 * @description
 * # AnnotationCtrl
 * Controller of the annotatewithmeApp
 */
angular.module('annotatewithmeApp')
  .controller('AnnotationCtrl', function ($scope, AnnotationsService, $routeParams, $q, Storage, foundSession) {

    $scope.session = foundSession;
    anno.destroy();

    $scope.annotations = [];

    var applyPhase = function () {
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    };

    var getAnnotationCallback = function (annots) {
      anno.removeAll();
      $scope.annotations = [];
      applyPhase();
      angular.forEach(annots, function (obj) {
        var annotation = obj.doc;
        $scope.annotations.push(annotation);
        anno.addAnnotation(annotation);
      });
      applyPhase();
    };

    $scope.addHighlight = function (annotation) {
      anno.highlightAnnotation(annotation);
    };

    $scope.removeHighlight = function () {
      anno.highlightAnnotation();
    };
//
//    Storage.replication.start(function () {
//      var p1 = AnnotationsService.all()
//        .then(function (results) {
//          getAnnotationCallback(results.rows);
//        });
////
////      var p2 = PouchConflict.all()
////        .then(function (results) {
////        $scope.conflicts = results;
////
////      });
//      return $q.all([p1 /*, p2*/]);
//    });

    $scope.$on("annotorious-ready", function () {
      AnnotationsService.all().then(function(response){
        getAnnotationCallback(response.rows);
      });
    });

    $scope.$on("annotations-changed", function () {
      AnnotationsService.all(getAnnotationCallback);
    });


    anno.addHandler('onAnnotationCreated', function (annotation) {
      AnnotationsService.create(annotation).then(function (response) {
        $scope.annotations.push(annotation);
        applyPhase();
      });
    });

    anno.addHandler('onAnnotationRemoved', function (annotation) {
      AnnotationsService.remove(annotation);
      $scope.annotations.splice($scope.annotations.indexOf(annotation), 1);
      applyPhase();
    });

    anno.addHandler('onAnnotationUpdated', function (annotation) {
      $scope.annotations = $scope.annotations.filter(function (item) {
        var dup_item = $.extend(true, dup_item, item);
        var dup_annotation = $.extend(true, dup_annotation, annotation);
        delete dup_item["text"];
        delete dup_annotation["text"];
        if (JSON.stringify(dup_item) == JSON.stringify(dup_annotation)) {
          AnnotationsService.update(annotation);
          return false;
        }
        return true;
      });

      $scope.annotations.push(annotation);

      applyPhase();
    });
  });
