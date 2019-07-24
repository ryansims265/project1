var make = "";
var model = "";
var mileage = "";
var lastChange = "";

var places = [];

$(document).ready(function() {
    $('#services-button').click(function() {
        $('#shops-near-you').delay(2000).fadeIn(500);
        $('#main-container"').hide();

    });
});

//First we need to create the user registration database 
var firebaseConfig = {
    apiKey: "AIzaSyCBrNS7nMK1bZWb-xwKrLlh9ESVNQqhzls",
    authDomain: "car-med.firebaseapp.com",
    databaseURL: "https://car-med.firebaseio.com",
    projectId: "car-med",
    storageBucket: "car-med.appspot.com",
    messagingSenderId: "1055506661486",
    appId: "1:1055506661486:web:78899fa40aad7d63"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

database.ref().set({
    make: make,
    model: model,
    lastChange: lastChange,
    mileage: mileage,
});

$(window).on('load', function() {
    //Check for the user location each time the page is loaded
    checkUserLocation();
    var userData = localStorage.getItem('vehicle-details');
    if (userData == null) {

        $("#vehicle-info").modal('show');
    } else {}
});

$("#setVehicleInput").on("click", function() {
    localStorage.setItem('vehicle-details', true);
    var userData = localStorage.getItem('vehicle-details');
});
$("#resetInfo").on("click", function() {
    localStorage.removeItem('vehicle-details');

});
$("#resetInfo").on("click", function() {
    localStorage.clear();
});

// $("#create-user").on("click", function (event) {
//     event.preventDefault();
//     // Get inputs
//     email = $("#inputEmail").val().trim();
//     password = $("#inputPassword")
//     phone = $("#inputPhone").val().trim();

//     // Save in firebase
//     database.ref().set({
//         email: email,
//         phone: phone,
//         make: make,
//         model: model,
//         year: year,
//         oilchange: oilchange,
//         mileage: mileage,
//     });
// });

// $("#create-user").on("click", function (event) {
//     event.preventDefault();
//     // Get inputs
//     email = $("#inputEmail").val().trim();
//     password = $("#inputPassword")
//     phone = $("#inputPhone").val().trim();

//     // Save in firebase
//     database.ref().set({
//         email: email,
//         phone: phone,
//         make: make,
//         model: model,
//         year: year,
//         oilchange: oilchange,
//         mileage: mileage,
//     });
// });

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
//YOUTUBE API 
$("#setVehicleInput").on("click", function() {
    mileage = $("#mileageInput").val();
    lastChange = $("#lastOilChange").val();
    make = $("#vehicle-model").val();
    model = $("#vehicle-make").val();
    // console.log(make);
    // console.log(model);

    database.ref().set({
        make: make,
        model: model,
        lastChange: lastChange,
        mileage: mileage,
    });

    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=oil_change_" + model + "_" + make + "&key=AIzaSyAuxtQuHOJVKwjvv_6HnLgJLCS_nZUhUfQ"
        // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        var videoid = response.items[1].id.videoId;
        document.getElementById("video-here").src = "https://www.youtube.com/embed/" + videoid;

    });
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