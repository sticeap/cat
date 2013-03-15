'use strict';

/* Directives */

appDirectives.directive('searchMenu', function($timeout) {
    return function(scope, iElement, iAttrs) {
        iElement.on('keyup', function(e){
        	var menus = scope.menus,
        		search = $(this).val();

        	//console.log(search, menus);
        	angular.forEach(menus, function(el){
        		if(el.content.toLowerCase().indexOf(search.toLowerCase()) == -1){
        			el.visible = false;
        		}else{
        			el.visible = true;
        		}
        	});

        	scope.$apply();
        })
    };
});