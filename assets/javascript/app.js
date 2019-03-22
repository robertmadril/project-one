$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAJ7R5RZ30596-0rhCKyrWrUx97oWkGcPA",
        authDomain: "rmm-salusys.firebaseapp.com",
        databaseURL: "https://rmm-salusys.firebaseio.com",
        projectId: "rmm-salusys",
        storageBucket: "",
        messagingSenderId: "601851303455"
    };
    firebase.initializeApp(config);

    //global variables
    var database = firebase.database();
    var calories = "";
    console.log(calories);

    //Initial food list populates on first page
    function getMealPlan(id, day) {
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=" + id;

        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json",
            headers: {
                'X-RapidAPI-Key': "cabf872889msh67628a4bb120a43p1a985djsn773dfb9ac0e5"
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);
            for (i = 0; i < 3; i++) {
                var newFood = $("<div>");
                var foodImg = $("<img>");
                newFood.attr("id", response.meals[i].id);
                newFood.addClass("food-display");
                foodImg.attr("src", "https://spoonacular.com/recipeImages/" + response.meals[i].image);

                newFood.append(response.meals[i].title);
                newFood.append(foodImg);

                var dayDiv = "#day-" + day;
                $(dayDiv).append(newFood);
                ;
            }

        }).fail(function (err) {
            console.log(err);
        });

    };

    //function that will populate recipe info after click
    function getRecipeInfo(id) {

        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information/";

        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json",
            headers: {
                'X-RapidAPI-Key': "cabf872889msh67628a4bb120a43p1a985djsn773dfb9ac0e5"
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);

            var jQuerySelect = "#" + id;

            var externalRecipe = $("<a>");
            externalRecipe.attr("href", response.sourceUrl);
            externalRecipe.attr("target", "_blank");
            externalRecipe.html("<button>Get Recipe</button");

            var addToFavorites = $("<button>");
            addToFavorites.text("Add to Favorites");
            addToFavorites.addClass("add-favorite");
            addToFavorites.attr("id", id);

            $(jQuerySelect).html(response.title);
            $(jQuerySelect).append(externalRecipe);
            $(jQuerySelect).append(addToFavorites);


        }).fail(function (err) {
            console.log(err)
        });

    };

    //ajax call to populate favorites on initial load
    function populateFavorites(id) {

        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information/";

        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json",
            headers: {
                'X-RapidAPI-Key': "cabf872889msh67628a4bb120a43p1a985djsn773dfb9ac0e5"
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);

                var newFood = $("<div>");
                var foodImg = $("<img>");
                newFood.attr("id", id);
                newFood.addClass("food-display");
                foodImg.attr("src", response.image);

                newFood.append(response.title);
                newFood.append(foodImg);

                $("#favorite-meals").append(newFood);

        }).fail(function (err) {
            console.log(err);
        });

    }

    function getExercise() {

        //exercise api call
        var exerciseId = 10;
        var exerciseQueryUrl = "https://wger.de/api/v2/exercise/?language=2&format=json&category=" + exerciseId + "&status=2";
        var exerciseImg = "https://wger.de/api/v2/exerciseimage/";

        $.ajax({
            url: exerciseQueryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            for (i = 0; i < 3; i++) {
                var newExercise = $("<div>");
                newExercise.html(response.results[i].description);
                $("#workouts-div").append(newExercise);
                ;
            }

        }, function (err) {
            console.log("error received:" + err);
        })
    };

    //database call to populate initial favorites
    database.ref().on("child_added", function (snapshot) {
        //hold object value
        var sv = snapshot.val();
        populateFavorites(sv);
    });

    //carousel functionality for materialize
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });


    //Functions for slider

    $("#start-button").on("click", function () {
        $('.slider').slider().destroy();

    });

    //button functions
    //goes to next page and populate exercises
    $(".goal-buttons").on("click", function () {
        //food api call
        calories = ($(this).attr("value"));

        getExercise();


    });

    //populates meal plan for the day
    $(".day-of-week").on("click", function () {
        var day = $(this).attr("data-value");
        getMealPlan(calories, day);
    });

    //grabs recipe from API after clicking image
    $("body").on("click", ".food-display", function () {

        var recipeId = $(this).attr("id");
        console.log(recipeId);
        //save buttons and recipe display
        getRecipeInfo(recipeId);

    });

    //pushes recipe ID to firebase database
    $("body").on("click", ".add-favorite", function () {
        var recipeId = $(this).attr("id");
        console.log(recipeId);
        //save buttons and recipe display
        database.ref().push(recipeId);

    });

});




$(document).ready(function(){
    $('.slider').slider();

    $('.fixed-action-btn').floatingActionButton();
    

    $('.collapsible').collapsible();

    $(".modal").modal();


  });
      
