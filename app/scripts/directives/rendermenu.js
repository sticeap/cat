'use strict';

/* Directives */

appDirectives.directive('renderMenu', function ($parse, $timeout) {
    return function (scope, element, attr) {
        //console.log(scope, element, attr);
        //console.log(element.hasClass('dropdown'));
        

        $timeout(function(){
            var hasSubmenu = element.hasClass('dropdown');
            if(hasSubmenu){
                element.attr('data-role', 'dropdown');
                element.Dropdown();
                //element.children('.menu_link').attr('href', '');
            }else{
                element.find('ul').remove();
            }
        }, 0);
        //element.val("value=" + (scope.$eval(attr.myDirective)));
    }
});