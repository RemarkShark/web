'use strict';

/**
 * @ngdoc function
 * @name annotatewithmeApp.controller:AnnotationCtrl
 * @description
 * # AnnotationCtrl
 * Controller of the annotatewithmeApp
 */
angular.module('annotatewithmeApp')
    .controller('AnnotationCtrl', ["$scope", "AnnotationsService", "$routeParams", "$timeout", function ($scope, AnnotationsService, $routeParams, $timeout) {

      anno.destroy();

      $scope.session = JSON.parse(sessionStorage.getItem($routeParams.sessionId));

      $scope.session.imgSrc = $scope.session["img_src"];

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

      $scope.addHighlight = function(annotation){
      	anno.highlightAnnotation(annotation);
      };

      $scope.removeHighlight = function(){
      	anno.highlightAnnotation();
      };

      $scope.$on("annotorious-ready", function () {
      	AnnotationsService.all(getAnnotationCallback);
      });

      $scope.$on("annotations-changed", function () {
        AnnotationsService.all(getAnnotationCallback);
      });
      

      anno.addHandler('onAnnotationCreated', function (annotation) {
        AnnotationsService.createAnnotation(annotation).then(function (response) {
          console.log(response);
          $scope.annotations.push(annotation);
          applyPhase();
        });
      });

      anno.addHandler('onAnnotationRemoved', function (annotation) {
        AnnotationsService.flagDeletedAnnotation(annotation["id"]);
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
            AnnotationsService.updateAnnotation(item["id"], annotation);
            return false;
          }
          return true;
        });

        $scope.annotations.push(annotation);

        applyPhase();
      });
    }]);
