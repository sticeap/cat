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
                },
                'Close'     : {
                    'action': function(){}
                }
            }
        });

        var options = {
				height: 400,
				width: 700,
				navHeight: 25,
				labelHeight: 25,
				dragableEvents: true,
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
					console.log(event);
					alert(event.data.Event.Title + " - " + event.data.Event.Description);
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
					//alert("day cell: " + date.toLocaleDateString());
					var ev = { "EventID": ($scope.events.length + 1), "StartDateTime": event.data.Date, "Title": menu.name, "URL": "", "Description": "", "CssClass": "Birthday" };
					$.jMonthCalendar.AddEvents(ev);
					
					$scope.events.push(ev);
					$scope.$apply();

					event.preventDefault();
					event.stopPropagation();
					console.log(event.data, ev);
					//console.log("DayCell", event);
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
				onShowMoreClick: function(events) {
					console.log(events);
				}
			};
			
			var newoptions = { };
			var newevents = [ ];
			//$.jMonthCalendar.Initialize(newoptions, newevents);

			
			$.jMonthCalendar.Initialize(options, $scope.events);
			//$.jMonthCalendar.DrawCalendar();
			
			
			
			var extraEvents = [	{ "EventID": 5, "StartDateTime": new Date(2013, 3, 11), "Title": "10:00 pm - EventTitle1", "URL": "#", "Description": "This is a sample event description", "CssClass": "Birthday" },
								{ "EventID": 6, "StartDateTime": new Date(2013, 3, 20), "Title": "9:30 pm - this is a much longer title", "URL": "#", "Description": "This is a sample event description", "CssClass": "Meeting" }
			];
			
			$("#Button").click(function() {					
				$.jMonthCalendar.AddEvents(extraEvents);
			});
			
			$("#ChangeMonth").click(function() {
				$.jMonthCalendar.ChangeMonth(new Date(2008, 4, 7));
			});
	};
	
    $scope.stopPropagation = function(e){
    	e.stopPropagation();
    }
}])