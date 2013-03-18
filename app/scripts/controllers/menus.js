'use strict';

/* Controllers */

cateringApp.controller('MenusCtrl', ['$scope', '$window', 'config', '$http', '$timeout', function($scope, $window, config, $http, $timeout){

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

	$scope.events = [ 	{ "EventID": 12, "StartDateTime": "new Date(2013, 2, 1)", "Title": "Meniu nr. 9", "URL": "", "Description": "This is a sample event description", "CssClass": "Birthday" },
						{ "EventID": 1, "StartDateTime": new Date(2013, 2, 12), "Title": "Meniu nr. 6", "URL": "", "Description": "This is a sample event description", "CssClass": "Birthday" },
						{ "EventID": 2, "StartDateTime": "2013-03-28T00:00:00.0000000", "Title": "Meniu nr. 180", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" },
						{ "EventID": 3, "StartDateTime": "2013-03-31", "Title": "Meniu nr. 63", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" },
						{ "EventID": 4, "StartDateTime": "2013-03-14", "Title": "Meniu nr. 6", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" },
						{ "EventID": 42, "StartDateTime": "2013-03-14", "Title": "Meniu nr. 6", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" },
						{ "EventID": 43, "StartDateTime": "2013-03-14", "Title": "Meniu nr. 6", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" },
						{ "EventID": 44, "StartDateTime": "2013-03-14", "Title": "Meniu nr. 6", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" },
						{ "EventID": 45, "StartDateTime": "2013-03-14", "Title": "Meniu nr. 6", "URL": "", "Description": "This is a sample event description", "CssClass": "Meeting" }
		];

	$scope.selectmenu = function(menu){
		angular.forEach($scope.menus, function(item){
			item.selected = false;
		});

		console.log(menu);


		menu.selected = true;

		$.Dialog({
            'title'       : 'Select day',
            'content'     : '<div id="jMonthCalendar" style="width:700px; height:400px;"></div>',
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
                }
            }
        });

        var options = {
				height: 400,
				width: 700,
				navHeight: 25,
				labelHeight: 25,
				dragableEvents: false,
				dragHoverClass: 'DateBoxOver',
				navLinks: {
					enableToday: true,
					enableNextYear: false,
					enablePrevYear: false,
					p:'Prev', 
					n:'Next', 
					t:'Today',
					showMore:'Show More'
				},
				onMonthChanging: function(dateIn) {
					//this could be an Ajax call to the backend to get this months events
					//var events = [ 	{ "EventID": 7, "StartDate": new Date(2009, 1, 1), "Title": "10:00 pm - EventTitle1", "URL": "#", "Description": "This is a sample event description", "CssClass": "Birthday" },
					//				{ "EventID": 8, "StartDate": new Date(2009, 1, 2), "Title": "9:30 pm - this is a much longer title", "URL": "#", "Description": "This is a sample event description", "CssClass": "Meeting" }
					//];
					//$.jMonthCalendar.ReplaceEventCollection($scope.events);
					if(options.dateLimitMin && options.dateLimitMin > dateIn){
						return true;
					}
				},
				onEventLinkClick: function(event) {
					//alert("event link click");
					return true; 
				},
				onEventBlockClick: function(event) { 
					if($('.more-events-show').length>0)
						return false;
					console.log('now event',event)
					event.preventDefault();
					event.stopPropagation();
					return true; 
				},
				onEventBlockOver: function(event) {
					//alert(event.Title + " - " + event.Description);
					return true;
				},
				onEventBlockOut: function(event) {

					return true;
				},
				onDayLinkClick: function(event) { 
					//alert("day link: "+date.toLocaleDateString());
					return true; 
				},
				onDayCellClick: function(event) { 
					if($('.more-events-show').length>0)
						return false;

					var ev = { "EventID": ($scope.events.length + 1), "StartDateTime": event.data.Date, "Title": menu.name, "URL": "", "Description": "", "CssClass": "Birthday" };
					$.jMonthCalendar.AddEvents(ev);
					
					$scope.events.push(ev);
					$scope.$apply();

					event.preventDefault();
					event.stopPropagation();
					return true; 
				},
				onEventDropped: function(event, newDate) {
					angular.forEach($scope.events, function(el){
						if(el.EventID == event.EventID)
							el.StartDateTime = new Date(newDate);
					});
					$scope.$apply();
					return true;
				},
				onShowMoreClick: function(events, event) {
					var offsetX = event.currentTarget.offsetLeft,
						offsetY = event.currentTarget.offsetTop + 16,
						child = $('<div class="more-events-show" tabindex="1000"></div>');
					
					child
						.css({
							top : offsetY, 
							left : offsetX
						})
						.on('blur', function(){
							var _that = $(this);
							$timeout(function(){ _that.remove(); }, 100);
						})
					angular.forEach(events, function(el){
						child.append('<div class="'+el.CssClass+'">'+el.Title+'</div>');
					})
					$('#jMonthCalendar').append(child);
					child.focus();
				},
				removeEventClick : function(event){
					event.preventDefault();
					event.stopPropagation();
					angular.forEach($scope.events, function(el, i){
						if(el.EventID == event.data.Event.EventID){
							$scope.events.splice(i, 1);
							$scope.$apply();
						}
					});
					$.jMonthCalendar.ReplaceEventCollection($scope.events);
				}
			};
			
			$.jMonthCalendar.Initialize(options, $scope.events);
	};
	
    $scope.stopPropagation = function(e){
    	e.stopPropagation();
    }
}])