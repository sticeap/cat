'use strict';

/* Services */

appServices.factory('config', function($resource, $window){
	var local =  {
		homepage : '#/home',
		googleapi : {
			clientId : '335613153987.apps.googleusercontent.com',
			apiKey : 'AIzaSyD_FtggpK_6Z2JvcGoG5pcWU8oi-uFWr2o',
			scopes : 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fusiontables https://www.googleapis.com/auth/fusiontables.readonly'
		},
		urls : {
			menus : 'data/menus.json',
			comment : 'http://192.168.1.104/catering/data/comment'
		},
		prices : [5, 9, 12, 15, 20, 30, 40],
		menus : [
			{
				name : "Home",
				src : "#/home"
			},
			{
				name : "Menus",
				src : "",
				submenu : [
					{
						name : "Complete Menu",
						src : "#/completemenu",
						type : "submenu"
					},
					{
						name : "Edit Menu",
						src : "#/editmenu",
						type : "submenu"
					},
					{
						name : "View Menu",
						src : "#/viewmenu",
						type : "submenu"
					},
					{
						name : "",
						src : "",
						type : "divider"
					},
					{
						name : "Nothing...",
						src : "",
						type : "submenu",
						icon : "icon-briefcase"
					}
				]
			},
			{
				name : "Order",
				src : "#/sidebar"
			}
		]
	}
	return local;
});