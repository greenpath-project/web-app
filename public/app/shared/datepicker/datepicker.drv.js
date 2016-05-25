angular.module('greenPathApp').directive('mzDatepicker', ['$timeout', function($timeout){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            id : '@',
            date : '=',
            label : '@'
        },
        templateUrl: './app/shared/datepicker/datepicker.vw.html',
        link: function(scope, element, attrs){

            scope.isOpen = false;
            scope.dateTmp = null;

            scope.changeDate = function(date){
                scope.date = date;
            }

            $timeout(function(){
                var selector = 'input#' + scope.id;

                $(selector).pickadate({selectMonths: true,
                    selectYears: 15,
                    format: 'dd/mm/yyyy',
                    onSet: function (e) {
                        var select = $(selector).pickadate('picker').get('select');

                        if(select != null){
                            scope.$apply(function(){
                                var d = select.obj;
                                d.setDate(d.getDate() + 1);
                                scope.dateTmp = d;
                                scope.changeDate(d);
                            });
                        }
                    },
                    onOpen: function() {
                        scope.isOpen = true;
                    },
                    onClose: function(){
                        scope.isOpen = false;
                        if(scope.dateTmp == null){
                            $(element).find('label').removeClass('active');
                        }
                    }
                })
            })

            $(element).click(function(){
                if(!scope.isOpen){
                    $timeout(function(){
                        $(element).find('label').addClass('active');
                        $('input#' + scope.id).trigger('click');
                    })
                }
            })

        }
    };
}]);