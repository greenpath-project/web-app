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
                        console.log(JSON.stringify(select));

                        var jour = "";
                        var mois = "";
                        var annee = select.year;

                        select.month++;

                        if(select.month < 10){
                            mois = '0' + select.month;
                        }
                        else{
                            mois = select.month;
                        }

                        if(select.date < 10){
                            jour = '0' + select.date;
                        }
                        else{
                            jour = select.date;
                        }

                        var date = jour + '/' + mois + '/' + annee;

                        scope.$apply(function(){
                            scope.changeDate(date);
                        });
                    }
                }
            })
        }
    };
}]);