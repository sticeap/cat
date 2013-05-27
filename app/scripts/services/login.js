'use strict';

/* Services */

appServices.factory('login', function($resource, $window, config){

	// Use a button to handle authentication the first time.
	var isLogged = false,
		data = {},
		eventHandlers = {},
		checkAuth = function(callback, force){
			gapi.client.setApiKey(config.googleapi.apiKey);
			gapi.auth.authorize({client_id: config.googleapi.clientId, scope: config.googleapi.scopes, hd : 'xivic.com', immediate: true}, function(authResult){
				if (authResult && !authResult.error) {
					isLogged = true;
					makeApiCall(callback);
					/*console.log(eventHandlers);
					angular.forEach(eventHandlers, function(el){
						console.log(el);
						el();
					});*/
				}else{
					isLogged = false;
					if(typeof callback == 'function' && force){
						callback();
					}else if(typeof callback == 'function'){
						callback(false);
					}
				}
			});
		},
		// Load the API and make an API call.  Display the results on the screen.
		makeApiCall = function(callback) {
			gapi.client.setApiKey(config.googleapi.apiKey);
			gapi.client.load('oauth2', 'v2', function() {
				var request = gapi.client.oauth2.userinfo.get();
				request.execute(function(resp) {
					//data = resp;
					api.data = resp;
					if(typeof callback == 'function'){
						callback(resp);
					}
				});
			});
		},
		logout = function(callback){
			if(typeof callback == 'function'){
				isLogged = false;
				callback();
			}
		},
		login = function(callback){
			checkAuth(function(){
				gapi.client.setApiKey(config.googleapi.apiKey);
				gapi.auth.authorize({client_id: config.googleapi.clientId, scope: config.googleapi.scopes, hd : 'xivic.com', immediate: (isLogged ? true : false)},
					function(authResult){
						if (authResult && !authResult.error) {
							makeApiCall(callback);
						}
				});
			}, true);

		},
		api = {
			login : login,
			logout : logout,
			checkAuth : checkAuth
		};

	return api;

});