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

$("#create-user").on("click", function (event) {
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

function youtubeAPI(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      
    });
  }