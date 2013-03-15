'use strict';

/* Filters */

appFilters
	.filter('menutype', function($window) {
		return function(input, types, price) {
			return $window.$.grep(input, function(el){
				return types[el.type] && (parseFloat(el.price) <= price);
			});
		};
	});
