angular.directive('blacklist', function (){ 
   return {
      require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {
          var blacklist = attr.blacklist.split(',');
          ngModel.$parsers.unshift(function (value) {
            console.log(value);
             ngModel.$setValidity('blacklist', blacklist.indexOf(value) === -1);
             return value;
          });
      }
   };
});
