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
          name: name,
          email: email,
          phone: phone
        });
      });



    //   function showForm() {
    //     var x = document.getElementById("usersignupform");
    //     if (x.style.display === "none") {
    //       x.style.display = "block";
    //     } else {
    //       x.style.display = "none";
    //     }
    //   }

      function showForm() {
        var x = document.getElementById("usersignupform");
        if (x.style.display === "none") {
            x.style.display = "none";
          
        } else {
            x.style.display = "block";
        }
      }
//Create the login function when a user already has an account that then leads to the dashboard

