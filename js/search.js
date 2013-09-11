function startWaitSearch() {
	startWait("search_number_button");
}

function stopWaitSearch() {
	stopWait("search_number_button");
}

function printSearchResult(data) {
	var html = "Number of found plates: " + data.count;
	html += "<br/>";
	html += "<table>";
	for(i=0; i<data.plates.length; i++) {
		html += "<tr>";
		html += "<td>" + data.plates[i].dist + "</td>";
		html += "</tr>";
	}
	html += "</table>";
	$("#search_result_div").html(html);
}

function search(pos, plate) {
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
		url : "api/apisearch.php",
		data : data,
		success : function(data) {
			if (data.status == "OK") {
				printSearchResult(data);
			} else {
				alert("Det gick inte att spara. Felkod: " + data.status);
			}
		},
		error : function(data) {
			alert("Det gick inte att söka på grund av ett fel.");
		},
		dataType : "json"
	});
	stopWaitSearch();
}

$(document)
		.ready(
				function() {
					$("#search_number_button")
							.click(
									function() {
										var plate = $("#save_number_input")
												.val();
										if (!validPlate(plate))
											return;
										if (navigator.geolocation) {
											startWaitSearch();
											navigator.geolocation
													.getCurrentPosition(
															function(position) {
																search(
																		position,
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
																stopWaitSearch();

															}, posSettings = {
																	timeout : 10*1000,
																	maximumAge : 100*10*1000
																});

										} else {
											alert("Din browser stödjer inte geo positionering och du kan därför inte använda psdb.");
											return;
										}

									});
				});