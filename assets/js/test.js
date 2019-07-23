var usermiles = 0;
console.log(usermiles);

//First we need to create the user registration database 
var firebaseConfig = {
    apiKey: "AIzaSyCBrNS7nMK1bZWb-xwKrLlh9ESVNQqhzls",
    authDomain: "car-med.firebaseapp.com",
    databaseURL: "https://car-med.firebaseio.com",
    projectId: "car-med",
    storageBucket: "",
    messagingSenderId: "1055506661486",
    appId: "1:1055506661486:web:78899fa40aad7d63"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#create-user").on("click", function(event) {
    event.preventDefault();
    // Get inputs
    email = $("#inputEmail").val().trim();
    password = $("#inputPassword")
    phone = $("#inputPhone").val().trim();

    // Save in firebase
    database.ref().set({
        email: email,
        phone: phone,
        make: make,
        model: model,
        year: year,
        oilchange: oilchange,
        mileage: mileage,
    });
});

//This hides the user signup form until they click the register button 
function showForm() {
    var x = document.getElementById("usersignupform");
    if (x.style.display === "none") {
        x.style.display = "none";

    } else {
        x.style.display = "block";
    }
    var z = document.getElementById("needAccount");
    if (z.style.display === "none") {
        z.style.display = "block";
    } else {
        z.style.display = "none";
    }

    var y = document.getElementById("userloginform");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}
//Create the login function when a user already has an account that then leads to the dashboard

var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=oil_change&key=AIzaSyAgA2B82VMDKMe0skNBKgiM0fIOTqBZPG0"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    // Printing the entire object to console
    console.log(response.items[1].id.videoId);
    var videoid = response.items[1].id.videoId;
    document.getElementById("video-here").src = "https://www.youtube.com/embed/" + videoid;

});



var proxyurl = "https://cors-anywhere.herokuapp.com/";
var mapsurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.786,-84.379&radius=5000&fields=name,formatted_address,rating&type=car_repair&keyword=oil&key=AIzaSyDg7arbjgsAKEij1dEAJONeKoNFX005rbs";

$.ajax({
    url: proxyurl + mapsurl,
    method: "GET"
}).then(function(response) {
    // Printing the entire object to console
    console.log(response.results[2]);
    var address1 = response.results[2].vicinity;
    var name1 = response.results[2].name;
    var rating1 = response.results[2].rating;

    $("#serviceName1").html(name1);
    $("#serviceAddress1").html(address1);
    $("#serviceRating1").html(rating1);

    var address2 = response.results[3].vicinity;
    var name2 = response.results[3].name;
    var rating2 = response.results[3].rating;

    $("#serviceName2").html(name2);
    $("#serviceAddress2").html(address2);
    $("#serviceRating2").html(rating2);

    var address3 = response.results[1].vicinity;
    var name3 = response.results[1].name;
    var rating3 = response.results[1].rating;

    $("#serviceName3").html(name3);
    $("#serviceAddress3").html(address3);
    $("#serviceRating3").html(rating3);
});