

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
  


  