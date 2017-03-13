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
	var firstTrainTime;
	var frequency = 0;

	//when user clicks submit
	$("#add-train").on("click", function(event){
		event.preventDefault();
	//they've added strings in train name, and destination, 
	//they've added HH btwn 00 and 23, and mm btwn 00 and 59
	//they've added mm btwn 00 and 59
	trainName = $("#train-name-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrainTime = $("#first-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	//construct obj for database
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	});

});

//when push to database is successful 
database.ref().on("child_added", function(snapshot){
	var firstTrainTime;
	var frequency = (snapshot.val().frequency);
	






}, function(errorObject){
	console.log("You have this error: " + errorObject.code);
});

