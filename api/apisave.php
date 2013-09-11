<?php
include 'base.php';
$user = auth();

$sql = sprintf("INSERT INTO plate set userid = '%s', nr = '%s', coords = POINT(%s, %s);",
		mysql_real_escape_string($user['id']),
		mysql_real_escape_string($_REQUEST['plate']),
		mysql_real_escape_string($_REQUEST['latitude']),
		mysql_real_escape_string($_REQUEST['longitude']));

//echo 'sql='.$sql;

if( !mysql_query($sql) ) {
	returnFailure("INTERNAL_ERROR", "Save failed.");
}

echo '{
"status" : "OK",
"message" : "Plate saved."
}';

cleanup();
?>