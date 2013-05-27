'use strict';

/* Services */

appServices.factory('commentsvc', function ($resource, config) {
    return $resource(
    	config.urls.orders + '?:actionkey:action:idkey:id:pagekey:page:useridkey:userid:ordernamekey:ordername:orderdatekey:orderdate:menuidkey:menuid', 
    	{
            //callback: 'JSON_CALLBACK'
    	}, 
    	{
    		'initialize' : {
    			params: {
                    actionkey: 'action=',
    				action : 'initialize'
    			},
    			isArray : true
    		},
    		'create': { 
                method : 'POST',
    			params: { 
                    actionkey: 'action=',
    				action: 'create',
                    useridkey : '&userid=',
                    userid : '@userid',
                    ordernamekey : '&ordername=',
                    ordername : '@ordername',
                    orderdatekey : '&orderdate=',
                    orderdate : '@orderdate',
                    menuidkey : '&menuid=',
                    menuid : '@menuid'
    			}
    		},
    		'select' : {
                method : 'POST',
    			params: { 
                    actionkey: 'action=',
    				action : 'select',
                    useridkey : '&user_id=',
                    userid : '@userid'
    			},
    			isArray : true 
    		},
    		'update': {
    			params: {
                    actionkey: 'action=',
    				action: 'update'
    			} 
    		}
    	});
});