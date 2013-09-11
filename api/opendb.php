<?php
$db_username="psdbuser";
$db_password="55lX9NOpNc";
$db_name="psdb";
$db_host="192.168.2.11";

$con = mysql_connect($db_host,$db_username,$db_password);
mysql_select_db($db_name, $con);

?>