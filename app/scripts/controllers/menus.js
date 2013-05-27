'use strict';

/* Controllers */

cateringApp.controller('MenusCtrl', ['$scope', '$window', 'config', '$http', '$timeout', 'commentsvc', 'login', function($scope, $window, config, $http, $timeout, commentsvc, login){

	var $ = angular.element;

	$scope.menus = [];
	$scope.menuTypes = {};
	$scope.prices = config.prices;
	$scope.selectedPrice = $scope.prices[2];
	$scope.menu = {};

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

	var init = function(){
		$scope.comment = commentsvc.select({userid:login.data.id},function(data){
			angular.forEach(data, function(el){
				$scope.events.push({
					EventID : el.order_id,
					StartDateTime : el.order_date,
					Title : el.order_name,
					CssClass : 'Meeting'
				});
				
			});
		});
	};

	$scope.$on('login',function(){
		init();
	});

	$scope.events = [];

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
			if($('.more-events-show').length > 0)
				return false;
			event.preventDefault();
			event.stopPropagation();
			console.log(event.data, $scope.menu);
			var args = {
				userid : login.data.id,
				ordername : $scope.menu.name,
				orderdate : event.data.Date.toString('yyyy-MM-dd'),
				menuid : $scope.menu.name.split('. ')[1] //TODO: modify with id menu from database
			};

			$scope.comment = commentsvc.create(args, function(data){
				console.log(arguments);
				console.log(data);
				var ev = {
					EventID : data.order_id,
					StartDateTime : data.order_date,
					Title : data.order_name,
					CssClass : 'Meeting'
				};
				$.jMonthCalendar.AddEvents(ev);

				$scope.events.push(ev);
			});

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

	$scope.selectmenu = function(menu){
		angular.forEach($scope.menus, function(item){
			item.selected = false;
		});

		console.log(menu);


		menu.selected = true;
		$scope.menu = menu;

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
			
		$.jMonthCalendar.Initialize(options, $scope.events);
	};
	
    $scope.stopPropagation = function(e){
    	e.stopPropagation();
    }
}])