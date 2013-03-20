'use strict';

/* Services */

appServices.factory('commentsvc', function ($resource, config) {
    return $resource(
    	config.urls.comment + '?:actionkey:action&id=:id:pagekey:page&limit=:limit', 
    	{
    		id:'@id',
    		limit: '@limit',
        actionkey: 'action='
    	}, 
    	{
    		'initialize' : { 
    			method: 'GET',
    			params: {
    				action : 'initialize'
    			},
    			isArray : true
    		},
    		'save': { 
    			method: 'POST',
    			params: { 
    				action: 'create'
    			}
    		},
    		'query' : {
    			method: 'POST', 
    			params: { 
    				action : 'read',
            page : '@page',
            pagekey : '&page='
    			},
    			isArray : true 
    		},
    		'update': { 
    			method: 'PUT', 
    			params: {
    				action: 'update'
    			} 
    		}
    	});
});