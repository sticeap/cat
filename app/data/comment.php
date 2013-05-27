<?php
// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Additional headers which may be sent along with the CORS request
// The X-Requested-With header allows jQuery requests to go through
header('Access-Control-Allow-Headers: accept, origin, x-requested-with, content-type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');

	$method = $_SERVER['REQUEST_METHOD'];
	$action = $_REQUEST['action'];
	$limit = $_REQUEST['limit'] ? $_REQUEST['limit'] : 5;

	if($action=="read"){
		$results = array();

		for($i=0; $i<$limit; $i++){
			$item = new STDClass();
			$item->id = $i;
			$item->name = "item nr ".$i;
			$item->description = "description of item ".$i;

			$results[] = $item;
		}
		echo json_encode($results);
	}

?>