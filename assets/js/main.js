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




//MAPS API 
$('#services-button').click(function() {
    $("#shops-near-you").show();
    //get the user location from storage
    var location = getUserLocation();
    //call the api with the user specific location 
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var mapsurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=2000&fields=name,formatted_address,rating&type=car_repair&keyword=oil&key=AIzaSyDg7arbjgsAKEij1dEAJONeKoNFX005rbs`;

    $.ajax({
        url: proxyurl + mapsurl,
        method: "GET"
    }).then(function(response) {
        //get the table body and save it a JQuery object
        var servicesTableBody = $('#services-table-body');
        //loop through the result 
        response.results.forEach(function(result) {
            places.push({
                name: result.name,
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng
            });
            //create a table row for each result
            var tableRow = `<ul>
            <li class="serviceRating">${"Ratings: " + result.rating}<br>
            <span class="serviceName">${result.name}<br>
            <span class="serviceAddress">${result.vicinity}</span></li>
           
            </ul>`;
            //add row to table body
            servicesTableBody.append(tableRow);
        });

        initMap();

    });

})


function checkUserLocation() {
    //try to get both the latitude and longitude from storage
    var location = getUserLocation();
    //if location is null run the code below. If it  is not null, do nothing
    if (!location) {
        //get the user postion from browser. handleSuccess will be called if the user accepts
        // to use location and handleError will be call if not
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
    }
}

function handleSuccess(position) {
    //set latitude in storage with key lat and latitude value from the coords object
    localStorage.setItem('lat', position.coords.latitude);
    //set latitude in storage  with key lng and longitude value from the coords object
    localStorage.setItem('lng', position.coords.longitude);
}

function handleError(error) {
    //Do something if user reject app using location
}


function getUserLocation() {
    //set location to null
    var location = null;
    //try to get both the latitude and longitude from storage
    var latitude = localStorage.getItem('lat');
    var longitude = localStorage.getItem('lng');
    //if both lat and lng exist 
    if (latitude && longitude) {
        //set location properties. They will come from local storage as string so we have to use 
        //Number method to convert to number
        location = {
            lat: Number(latitude),
            lng: Number(longitude)
        }
    }
    //return location
    return location;
}

function initMap() {
    var location = getUserLocation();

    var map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: location });

    var infowindow = new google.maps.InfoWindow({});
    var marker, index;
    for (var index = 0; index < places.length; index++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(places[index].lat, places[index].lng),
            map: map,
            title: places[index].name
        });
        google.maps.event.addListener(marker, 'click', (function(marker, index) {
            return function() {
                infowindow.setContent(places[index]);
                infowindow.open(map, marker);
            }
        })(marker, index));
    }
}