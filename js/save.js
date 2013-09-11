function posUpdate(pos) {
	debug("accuracy = " + pos.coords.accuracy);
	$(".gps_status").hide();
	if (pos.coords.accuracy > accuracyLimit) {
		$("#yellow_gps_status").show();
	} else {
		$("#green_gps_status").show();
	}
}
function handleError() {
	// Ignored
}

function startWaitSave() {
	startWait("save_number_button");
}

function stopWaitSave() {
	stopWait("save_number_button");
}

function save(pos, plate) {
	if (pos.coords.accuracy > accuracyLimit) {
		alert("Noggrannheten i din position ("
				+ pos.coords.accuracy
				+ ") är för dålig."
				+ " Detta kan bero på flera saker."
				+ " Antingen så har din GPS inte hunnit stabilisera sig och då är det bara att vänta."
				+ " Eller så har du inte tillgång till GPS och då kommer det aldrig att gå."
				+ " Läs mer under frågor och svar.");

	} else {
		var data = {
			username : username,
			password : password,
			plate : plate,
			latitude : pos.coords.latitude,
			longitude : pos.coords.longitude,
			accuracy : pos.coords.accuracy
		};
		$.ajax({
			type : 'GET',
			async : false,
			cache : false,
			url : "api/apisave.php",
			data : data,
			success : function(data) {
				if (data.status == "OK") {
					alert(plate + " är nu sparad.");
					$("#save_number_input").val("");
				} else {
					alert("Det gick inte att spara. Felkod: " + data.status);
				}
			},
			error : function(data) {
				alert("Det gick inte att spara på grund av ett fel.");
			},
			dataType : "json"
		});
	}
	stopWaitSave();
}

$(document)
		.ready(
				function() {
					$("#save_number_button")
							.click(
									function() {
										var plate = $("#save_number_input")
												.val();
										if( !validPlate(plate)) 
											return;
										if (navigator.geolocation) {
											startWaitSave();
											navigator.geolocation
													.getCurrentPosition(
															function(position) {
																save(position,
																		plate);
															},
															function(error) {
																switch (error.code) {
																case error.TIMEOUT:
																	alert("Det tog för lång tid att ta reda på din position. Försök igen lite senare.");
																	break;
																case error.POSITION_UNAVAILABLE:
																	alert("Positionering är inte tillgängligt just nu.");
																	break;
																case error.PERMISSION_DENIED:
																	alert("Du måste godkänna att psdb får ta reda på din position. Lär mer under frågor och svar.");
																	break;
																case error.UNKNOWN_ERROR:
																	alert("Ett okänt fel uppstod.");
																	break;
																default:
																	alert("Något blev knas.");
																	break;
																}
																stopWaitSave();

															}, posSettings);

										} else {
											alert("Din browser stödjer inte geo positionering och du kan därför inte använda psdb.");
											return;
										}
									});
				});