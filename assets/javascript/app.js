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


	var trainName = "";
	var destination = "";
	var firstTime = "";
	var frequency = 0;


	//when user clicks submit
	$("#add-train").on("click", function(event){
		event.preventDefault();
	//they've added strings in train name, and destination, 
	if(trainName.length === 0){
		alert("Your train doesn't have a name!");
	}
	if(destination.length === 0){
		alert("Your train is headed nowhere!");
	}


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

});

//when push to database is successful 
database.ref().on("child_added", function(snapshot){

	var sTrainName = snapshot.val().trainName;
	var sDestination = snapshot.val().destination;

	var sFirstTime =  snapshot.val().firstTime;
	var sFrequency = snapshot.val().frequency;


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
var rowText = "<tr><td>" + sTrainName + 
						 "</td><td>" + sDestination + 
						 "</td><td>" + sFrequency + 
						 "</td><td>" + moment(timeArrival).format("HH:mm") + 
						 "</td><td>" + minArrival + 
						 "</td></tr>";
$("table tbody").append(rowText);
}, function(errorObject){
	console.log("You have this error: " + errorObject.code);
});

