'use strict';

/* Services */

appServices.factory('$logincheck', function($resource, $window, config){
	return function(userid){
		//Perform logical user loging check either by looking at cookies or make a call to server
		if(userid > 0) 
			return true;

		return false;  
	};
});