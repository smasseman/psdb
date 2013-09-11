<?php
include 'base.php'; 
$user = auth();
echo '{
"status" : "OK",
"message" : "Login ok"
}';
cleanup();
?>