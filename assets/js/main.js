var make = "";
var model = "";
var mileage = "";
var lastChange = "";
var userData;
var google;

var places = [];


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

    checkUserLocation();

    // retrieve local session boolean
    var userData = localStorage.getItem('vehicle-details');


    // if there is no local session data, display vehicle input modal 
    if (userData == null) {
        $("#intro-modal").modal('show');
    } else {
        // retrieve local storage data 
        var localPercentage = localStorage.getItem('vehicle-mileage-percentage');
        var localNextChange = localStorage.getItem('next-oil-change');
        var inputCarModel = localStorage.getItem('inputCarModel');
        var inputCarMake = localStorage.getItem('inputCarMake');



        // render miles until next change in div 
        if (localNextChange < 0) {
            $("#mileageOutput").html("your " + inputCarMake + " " + inputCarModel + " needed an oil change " + -localNextChange + " miles ago!");
            // add percentage value to html element
            $('#graphValue').data('stroke-dashoffset', "0");

            // add percentage value to element's CSS
            $('#graphValue').css("stroke-dashoffset", "0");

            // hack to re-initiate keyframe animation 
            setTimeout(function() {
                $("#graphValue").removeClass("progress-value");

            }, 10);
            setTimeout(function() {
                $("#graphValue").addClass("progress-value");
            }, 15);

            //change stroke offset in CSS Animation keyframe to match percentage
            var KeyFrame = {
                    init: function() {
                        if (!KeyFrame.check) {
                            //get the left position
                            //  var pushLeft = $('.push').position().left;
                            //set the style and append to head
                            var css = $('<style>@keyframes progress{from {stroke-dashoffset:339.292;}to {stroke-dashoffset:0;}}</style>').appendTo('head'); //make sure you don't carriage return the css inline statement, or else it'll be error as ILLEGAL
                            //so u don't keep appending style to head
                            KeyFrame.check = true;
                        }
                    }
                }
                // initiliaze keyframe
            KeyFrame.init();
        } else {
            $("#mileageOutput").html("Your " + inputCarMake + " " + inputCarModel + " has " + localNextChange + " miles until next oil change");
            // add percentage value to html element
            $('#graphValue').data('stroke-dashoffset', localPercentage);

            // add percentage value to element's CSS
            $('#graphValue').css("stroke-dashoffset", localPercentage);

            // hack to re-initiate keyframe animation 
            setTimeout(function() {
                $("#graphValue").removeClass("progress-value");

            }, 10);
            setTimeout(function() {
                $("#graphValue").addClass("progress-value");
            }, 15);

            //change stroke offset in CSS Animation keyframe to match percentage
            var KeyFrame = {
                    init: function() {
                        if (!KeyFrame.check) {
                            //get the left position
                            //set the style and append to head
                            var css = $('<style>@keyframes progress{from {stroke-dashoffset:339.292;}to {stroke-dashoffset:' + localPercentage + ';}}</style>').appendTo('head'); //make sure you don't carriage return the css inline statement, or else it'll be error as ILLEGAL
                            //so u don't keep appending style to head
                            KeyFrame.check = true;
                        }
                    }
                }
                // initiliaze keyframe
            KeyFrame.init();
        }

    }
});

function showUserInputModal() {
    $("#vehicle-info").modal('show');
}

// USER INPUT LOGIC AND USER INPUT VALIDATION 
$("#setVehicleInput").on("click", function() {
    // capture user inputs, store to variables
    var mileage = parseInt($("#mileageInput").val().trim());
    var lastChange = parseInt($("#lastOilChange").val().trim());
    var inputCarMake = $("#inputCarMake").val().trim();
    var inputCarModel = $("#inputCarModel").val().trim();
    localStorage.setItem('inputCarModel', inputCarModel);
    inputCarModel = localStorage.getItem('inputCarModel');
    localStorage.setItem('inputCarMake', inputCarMake);
    inputCarMake = localStorage.getItem('inputCarMake');
    if (mileage <= lastChange) {
        alert("Your current mileage can't be greater than the mileage of your last oil change...");
        return false;
    }
    if (isNaN(mileage) || isNaN(lastChange)) {
        alert("please enter a valid number for your current mileage and the mileage of your last oilchange");
        return false;
    }
    if (inputCarMake == "" || inputCarModel == "") {
        alert("please enter the make and model of your vehicle");
        return false;
    }

    // calculate miles until next oil change, based on the presumption that an oil change is needed every 5000 miles 
    var nextChange = parseInt(lastChange) + parseInt("8000") - parseInt(mileage);

    //set nextChange to local storage and then display above graph
    localStorage.setItem('next-oil-change', nextChange);
    var localNextChange = localStorage.getItem('next-oil-change');

    // generate percent value of progress towards next oil change, take circumfrence of circle, multiply by percentage  (1 - miles until next change divided by 5000)
    var percentage = 339.292 * parseFloat(1 - (nextChange / 8000));
    console.log(percentage);

    // setting percentage to local storage 
    localStorage.setItem('vehicle-mileage-percentage', percentage);
    var localPercentage = localStorage.getItem('vehicle-mileage-percentage');
    if (localNextChange < 0) {
        $("#mileageOutput").html("Your " + inputCarMake + " " + inputCarModel + " needed an oil change " + -localNextChange + " miles ago!");
        // add percentage value to html element
        $('#graphValue').data('stroke-dashoffset', "0");

        // add percentage value to element's CSS
        $('#graphValue').css("stroke-dashoffset", "0");

        // hack to re-initiate keyframe animation 
        setTimeout(function() {
            $("#graphValue").removeClass("progress-value");

        }, 10);
        setTimeout(function() {
            $("#graphValue").addClass("progress-value");
        }, 15);

        //change stroke offset in CSS Animation keyframe to match percentage
        var KeyFrame = {
                init: function() {
                    if (!KeyFrame.check) {
                        var css = $('<style>@keyframes progress{from {stroke-dashoffset:339.292;}to {stroke-dashoffset:0;}}</style>').appendTo('head'); //make sure you don't carriage return the css inline statement, or else it'll be error as ILLEGAL
                        //so u don't keep appending style to head
                        KeyFrame.check = true;
                    }
                }
            }
            // initiliaze keyframe
        KeyFrame.init();
    } else {
        $("#mileageOutput").html("Your " + inputCarMake + " " + inputCarModel + " has " + localNextChange + " miles until next oil change");
        // add percentage value to html element
        $('#graphValue').data('stroke-dashoffset', localPercentage);

        // add percentage value to element's CSS
        $('#graphValue').css("stroke-dashoffset", localPercentage);

        // hack to re-initiate keyframe animation 
        setTimeout(function() {
            $("#graphValue").removeClass("progress-value");

        }, 10);
        setTimeout(function() {
            $("#graphValue").addClass("progress-value");
        }, 15);

        //change stroke offset in CSS Animation keyframe to match percentage
        var KeyFrame = {
                init: function() {
                    if (!KeyFrame.check) {
                        //get the left position
                        //  var pushLeft = $('.push').position().left;
                        //set the style and append to head
                        var css = $('<style>@keyframes progress{from {stroke-dashoffset:339.292;}to {stroke-dashoffset:' + localPercentage + ';}}</style>').appendTo('head'); //make sure you don't carriage return the css inline statement, or else it'll be error as ILLEGAL
                        //so u don't keep appending style to head
                        KeyFrame.check = true;
                    }
                }
            }
            // initiliaze keyframe
        KeyFrame.init();
    }
    // setting the boolean value of vehicle details to true in local storage; upon page load, if this value is true, the onLoad modal will not display. See window onload function above.
    localStorage.setItem('vehicle-details', true);
    var userData = localStorage.getItem('vehicle-details');
});

// reset info button clears local storage and primes SVG animation to be fired again.
$("#resetInfo").on("click", function() {
    localStorage.clear();
    $("#graphValue").removeClass("progress-value");
    $('#graphValue').data("stroke-dashoffset", "");
    $('#graphValue').css("stroke-dashoffset", "");
    $("#mileageOutput").html("");
});

//YOUTUBE API 
function youTubeAPI() {
    make = localStorage.getItem('inputCarMake')
    model = localStorage.getItem('inputCarModel')

    database.ref().set({
        make: make,
        model: model
    });

    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=oil_change_" + make + "_" + model + "&key=AIzaSyAuxtQuHOJVKwjvv_6HnLgJLCS_nZUhUfQ"
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var videoid = response.items[1].id.videoId;
        document.getElementById("video-here").src = "https://www.youtube.com/embed/" + videoid;
    });
}

$("#videos-button").click(function() {
    youTubeAPI();
});

//MAPS API 
$('#services-button').click(function() {
    //get the user location from storage
    var location = getUserLocation();
    //call the api with the user specific location 
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    var mapsurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&rankby=distance&fields=name,formatted_address,rating&type=car_repair&keyword=oil&key=AIzaSyDg7arbjgsAKEij1dEAJONeKoNFX005rbs`;
    $.ajax({
        url: proxyurl + mapsurl,
        method: "GET"
    }).then(function(response) {
        var apiResults = response.results;
        console.log(apiResults);
        var limitedResults = apiResults.slice(0, 6);
        //get the table body and save it a JQuery object
        var servicesTableBody = $('#services-table-body');
        //loop through the result 
        limitedResults.forEach(function(result) {
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
});

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
    var map = new google.maps.Map(document.getElementById('map'), { zoom: 12, center: location });
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