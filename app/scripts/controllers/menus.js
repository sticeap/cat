'use strict';

/* Controllers */

cateringApp.controller('MenusCtrl', ['$scope', '$window', 'config', '$http', function($scope, $window, config, $http){

	var $ = angular.element;

	$scope.menus = [];
	$scope.menuTypes = {};
	$scope.prices = config.prices;
	$scope.selectedPrice = $scope.prices[2];

	$http({
		method : 'GET',
		url : config.urls.menus
	}).success(function(data, status, headers, config){
		
		$scope.menus = data;
		
		angular.forEach($scope.menus, function(item){
			if(!(item.type in $scope.menuTypes))
				$scope.menuTypes[item.type] = true;
		});
	});

	$scope.selectmenu = function(menu){
		angular.forEach($scope.menus, function(item){
			item.selected = false;
		});

		menu.selected = true;

		$.Dialog({
            'title'       : 'Select day',
            'content'     : '<div class="calendar" data-role="calendar"></div>',
            'draggable'   : true,
            'overlay'     : true,
            'closeButton' : true,
            'buttonsAlign': 'right',
            'position'    : {
                'zone'    : 'center'
            },
            'buttons'     : {
                'Ok'     : {
                    'action': function(){}
                },
                'Close'     : {
                    'action': function(){}
                }
            }
        });

        $('.calendar').datepicker({initAll: true});
	};
	
    $scope.stopPropagation = function(e){
    	e.stopPropagation();
    }
}])