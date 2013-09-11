<?php
$sql = "";

function returnFailure($status, $msg) {
	global $sql;
	echo '{
	"status" : '.json_encode($status).',
	"message" : '.json_encode($msg).',
	"sql" : '.json_encode($sql).',
	"mysql_error" : '.json_encode(mysql_error()).'
}';
	cleanup();
	die();
}

function cleanup() {
	global $con;
	if(isset($con) && $con) {
		//echo "close con";
		mysql_close($con);
	} else {
		//echo "No open con";
	}
}

function customError($errno, $errstr)
{
	returnFailure("INTERNAL_ERROR", $errstr);
}

set_error_handler("customError");
include 'opendb.php';
include 'auth.php';
?>