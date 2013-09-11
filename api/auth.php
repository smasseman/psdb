<?php
function auth() {
	$sql = sprintf("SELECT * FROM user where username = '%s'",
			mysql_real_escape_string($_REQUEST['username']));
	$result = mysql_query($sql);

	while($row = mysql_fetch_array($result))
	{
		$user = $row;
	}
	if( !isset($user)) {
		returnFailure("BAD_CREDENTIALS", "Auth failed.");
		die();
	}
	if( $user['password'] != $_REQUEST['password']) {
		returnFailure("BAD_CREDENTIALS", "Auth failed");
		die();
	}
	return $user;
}
?>