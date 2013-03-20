'use strict';

/* Controllers */

cateringApp.controller('MainCtrl', ['$scope', 'commentsvc', function ($scope, commentsvc) {
	$scope.awesomeThings = [
	  'HTML5 Boilerplate',
	  'AngularJS',
	  'Testacular'
	];

	$scope.comment = commentsvc.query({id:2,limit:20,page:3},function(data){
		console.log('finish', data);
	});

	$scope.save = function(){
		commentsvc.update({id:2},function(data){
			console.log('finish', data);

		});
	}
}]);

cateringApp.controller('Menu', ['$scope', '$window', 'config', 'login', '$timeout', '$http', '$location', function($scope, $window, config, login, $timeout, $http, $location){
	var $ = angular.element;

	$window.init = function(){
        $scope.user.checkAuth();
    };
    yepnope.injectJs('https://apis.google.com/js/client.js?onload=init', function(){})

	$scope.version = "0.101";
	$scope.homepage = config.homepage;
	$scope.avatar = '';
	$scope.menu = [];
	$scope.menus = config.menus;
	$scope.loading = true;


	$scope.parseMenu = function(){
		$http({
			method : 'GET',
			url : 'data/fullmenus.json'
		}).success(function(data){
			angular.forEach(data, function(item){

				var it = item.content,
					title = "",
					desc = "";
				for(var i=0; i<it.length; i=i+2){
					var el = {};

					el.type = item.attrs.type;
					el.title = it[i].content.text;
					el.content = "";
					el.visible = true;
					if(angular.isArray(it[i+1].content)){
						angular.forEach(it[i+1].content, function(e){
							if(e.content && e.content.text){
								el.content += '' + e.content.text + "<br/>";
							}
						});
					}else{
						el.content += it[i+1].content.content.text;
					}

					$scope.menu.push(el);
				}
			});
			console.log(JSON.stringify($scope.menu));
		})
	}

	$scope.user = {
		email : '',
		logged : false,
		avatar : $scope.avatar,
		notify : false,
		login : function(){
			$scope.loading = true;
			$scope.hideloader = false;

			if(!$scope.user.logged){
				login.login(function(data){
					var config = {
						name : data.name,
						avatar : data.picture,
						email : data.email,
						logged : true,
						text : "Logout",
						data : data
					};
					angular.extend($scope.user, config);
					$scope.loading = false;
					$scope.$apply();
				});
			}else{
				login.logout(function(){
					var config = {
						name : '',
						avatar : $scope.avatar,
						email : '',
						logged : false,
						text : "Login",
						data : {}
					};
					$scope.hideloader = true;
					$scope.loading = true;
					angular.extend($scope.user, config);
				});
			}
		},
		checkAuth : function(){
			login.checkAuth(function(data){
				console.log(data);
				if(data == false){
					$scope.hideloader = true;
					$scope.$apply();
				}else{
					var config = {
						name : data.name,
						avatar : data.picture,
						email : data.email,
						logged : true,
						text : "Logout",
						data : data
					};

					angular.extend($scope.user, config);
					$scope.loading = false;
					$scope.$apply();
				}
			});
		},
		text : 'Login',
		data : {}
	};

	//$scope.user.checkAuth();


	/*$scope.notify = function(){
		var havePermission = $window.webkitNotifications.checkPermission();
		$scope.notifiedTime = $scope.getTime();

		if (havePermission == 0) {
			// 0 is PERMISSION_ALLOWED
			var notification = $window.webkitNotifications.createNotification(
				'img/mail-icon.png',
				'New SMS!',
				"Here is the notification text \n\r sdfsadf s \n sdfsfsdfsd");

			notification.onclick = function (){
				//$scope.notifiedTime = $scope.getTime();
				notification.close();
			}
			notification.show();

			$timeout(function(){
				notification.close();
			}, 5000);
		}else{
			$window.webkitNotifications.requestPermission();
		}
	};*/

}]);

cateringApp.controller('LoginCtrl', function ($scope) {
	
});