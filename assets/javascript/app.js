 // Add credentials and Initialize Firebase
 var config = {
 	apiKey: "AIzaSyB7b7KghGXKr5VvPEDwo2x10aZ4iQOWiMw",
 	authDomain: "first-firebase-a5f92.firebaseapp.com",
 	databaseURL: "https://first-firebase-a5f92.firebaseio.com",
 	storageBucket: "first-firebase-a5f92.appspot.com",
 	messagingSenderId: "359006842396"
 };
 firebase.initializeApp(config);
 var database = firebase.database();

 function reset() {
 	var trainName = "";
 	var destination = "";
 	var firstTime = "";
 	var frequency = 0;
 }
 reset();
 //when user clicks submit
 $("#add-train").on("click", function(event) {
 	event.preventDefault();
 	trainName = $("#train-name-input").val().trim();
 	destination = $("#destination-input").val().trim();
 	firstTime = $("#first-input").val().trim();
 	frequency = $("#frequency-input").val().trim();
 	//construct obj for database
 	database.ref().push({
 		trainName: trainName,
 		destination: destination,
 		firstTime: firstTime,
 		frequency: frequency
 	});
 	reset();
 });
 //when push to database is successful 
 database.ref().on("child_added", function(snapshot) {
 	var firstTime = snapshot.val().firstTime;
 	var frequency = snapshot.val().frequency;
 	var trainName = snapshot.val().trainName;
 	var destination = snapshot.val().destination;
 	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
 	// Current Time
 	var currentTime = moment();
 	// Difference between the times
 	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 	// Time apart (remainder)
 	var remainder = diffTime % frequency;
 	var minArrival = frequency - remainder;
 	var timeArrival = moment().add(minArrival, "minutes");
 	var tbody = $("tbody");
 	var tr = $("<tr>");
 	var rowText = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(timeArrival).format("HH:mm") + "</td><td>" + minArrival + "</td></tr>";
 	$("table tbody").append(rowText);
 }, function(errorObject) {
 	console.log("You have this error: " + errorObject.code);
 });