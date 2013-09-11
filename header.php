<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>PSDB - PlateSpottingDataBasen - För dig som håller på med platespotting</title>
 	<link rel="stylesheet" href="css/main.css" />
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="js/main.js"></script>
	<script src="js/save.js"></script>
	<script src="js/search.js"></script>
		  
  </head>

  <script>
    var username, 
    	password, 
		next_page, 
		accuracyLimit=100, 
		posSettings = {
			enableHighAccuracy : true,
			timeout : 10*1000,
			maximumAge : 100*10*1000
		};
  </script>
  <body>
	<span id="top"></span>
	<div id="info_div"></div>