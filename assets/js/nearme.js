// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = { lat: 33.786, lng: -84.379 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var queryurl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.786,-84.379&radius=5000&fields=name,formatted_address,rating&type=car_repair&keyword=oil&key=AIzaSyDg7arbjgsAKEij1dEAJONeKoNFX005rbs";

$.ajax({
    url: proxyurl + queryurl,
    method: "GET"
}).then(function(response) {
    // Printing the entire object to console
    console.log(response.results[1]);
    var address = response.results[1].vicinity;
    var name = response.results[1].name;
    var rating = response.results[1].rating;

    $("#serviceName").html(name);
    $("#serviceAddress").html(address);
    $("#serviceRating").html(rating);


});
// fetch(proxyurl + url) 
// .then(response => response.text())
// .then(contents => console.log(JSON.parse(contents)))
// .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))