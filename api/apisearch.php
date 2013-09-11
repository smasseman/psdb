<?php
include 'base.php';
$user = auth();

$sql = sprintf("select id, userid, nr, X(coords) as latitude, Y(coords) as longitude, round(GLength(LineString(coords, POINT(%s, %s)))*100000) as dist from plate order by dist;",
		mysql_real_escape_string($_REQUEST['latitude']),
		mysql_real_escape_string($_REQUEST['longitude']));

$rows = mysql_query($sql); 
if( !$rows ) {
	returnFailure("INTERNAL_ERROR", "Search failed.");
}

echo '{
"status" : "OK",
"count" : "'.mysql_num_rows($rows).'",
"plates" : [ 
';

$comma = false;
while($r = mysql_fetch_assoc($rows)) {
	if( $comma ) { 
		echo ',
';
	}
	$comma = true;
	echo '	{
		"dist" : "'.$r['dist'].'",
		"latitude" : "'.$r['latitude'].'",
		"longitude" : "'.$r['longitude'].'"
	}';
}
echo '
]
}';

cleanup();
?>