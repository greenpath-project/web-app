angular.module('greenPathApp').directive('mzDatepicker', [function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            id : '@',
            date : '='
        },
        templateUrl: 'app/shared/datepicker/datepicker.vw.html',
        link: function(scope, element, attrs){

            scope.changeDate = function(date){
                scope.date = date;
            }

            $(element).pickadate({
                selectMonths: true,
                selectYears: 15,
                format: 'dd/mm/yyyy',
                onSet: function (e) {
                    var select = $(element).pickadate('picker').get('select');

                    if(select != null){
                        scope.$apply(function(){
                            var d = select.obj;
                            d.setDate(d.getDate() + 1);
                            scope.changeDate(select.obj);
                        });
                    }
                }
            })
        }
    };
}]);