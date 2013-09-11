function validPlate(plate) {
	if (!(plate > 0 && plate < 1000)) {
		alert("Felaktigt nummer.");
		return false;
	}
	return true;
}

function showPage(id) {
	$(".page_div").hide();
	showInfo("");
	if (("search" == id || "myaccount" == id || "save" == id)
			&& username == null) {
		showInfo("Innan du kan gå hit så måste du logga in.");
		next_page = id;
		$("#login_div").show();
	} else {
		$("#" + id + "_div").show();
	}
}

function showInfo(txt) {
	$("#info_div").html(txt);
}

function debug(msg) {
	$("#debug_info_text").append(msg + "<br/>");
}

function updateLoginInfo() {
	username = window.localStorage.getItem("psdb_username");
	password = window.localStorage.getItem("psdb_password");
	if (username == null) {
		$("#login_info_div").html("Du är inte inloggad.");
	} else {
		$("#login_info_div").html("Inloggad som " + username);
	}
}

function startWait(id) {
	$("#" + id).hide();
	$("#" + id + "_wait").show();
}

function stopWait(id) {
	$("#" + id).show();
	$("#" + id + "_wait").hide();
}

$(document)
		.ready(
				function() {
					if (window.localStorage) {
						updateLoginInfo();
					} else {
						alert("Din webläsare är så gammal att den här sidan inte funkar. Stöd för local storage saknas.");
					}

					navigator.geolocation.watchPosition(posUpdate, handleError,
							{
								enableHighAccuracy : true,
								maximumAge : 0
							});

					$("#login_button")
							.click(
									function() {
										username = $("#username").val();
										password = $("#password").val();
										var data = {
											username : username,
											password : password
										};
										$
												.ajax({
													type : 'GET',
													async : false,
													cache : false,
													url : "api/login.php",
													data : data,
													success : function(data) {
														if (data.status == "OK") {
															window.localStorage
																	.setItem(
																			"psdb_username",
																			username);
															window.localStorage
																	.setItem(
																			"psdb_password",
																			password);
															$("#username").val(
																	"");
															$("#password").val(
																	"");
															showPage(next_page);

														} else if (data.status == "BAD_CREDENTIALS") {
															alert("Inloggningen misslyckades. Fel användare eller lösenord.");
														} else {
															alert("Något gick fel. Felkod #6542");
														}
													},
													error : function(data) {
														alert("Något gick knasigt. Felkod #7384");
													},
													dataType : "json"
												});
										updateLoginInfo();

									});

					$("#logout_button").click(function() {
						username = null;
						password = null;
						window.localStorage.removeItem("psdb_username");
						window.localStorage.removeItem("psdb_password");
						updateLoginInfo();
						showPage("none");
					});

				});
