// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: 33.786, lng: -84.379};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }


// var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=15&type=car_repair&keyword=oilchange&key=AIzaSyDg7arbjgsAKEij1dEAJONeKoNFX005rbs";

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function(response) {

//       // Printing the entire object to console
//       console.log(response);
      
//     });


    const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.786,-84.379&radius=200&type=car_repair&key=AIzaSyDg7arbjgsAKEij1dEAJONeKoNFX005rbs"; 
fetch(proxyurl + url) 
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))


