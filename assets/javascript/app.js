$(document).ready(function () {

    firebase.initializeApp(firebaseConfig);

    //global variables
    var database = firebase.database();
    var foodKey = foodConfig.foodAPI;
    console.log(foodKey);

    //
    //
    //GLOBAL FUNCTIONS
    //
    //
    //

    //Initial food list populates on first page
    function getMealPlan(id, day) {

        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&targetCalories=" + id;

        $.ajax({
            method: "GET",
            url: queryURL,
            dataType: "json",
            headers: {
                'X-RapidAPI-Key': foodKey
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
                foodImg.addClass("circle");

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
                'X-RapidAPI-Key': foodKey
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);

            var jQuerySelect = "#" + id;

            var externalRecipe = $("<a>");
            externalRecipe.attr("href", response.sourceUrl);
            externalRecipe.attr("target", "_blank");
            externalRecipe.html("<button class=btn orange>Get Recipe</button>");

            var addToFavorites = $("<a>");
            addToFavorites.text("Add to Favorites");
            addToFavorites.addClass("add-favorite");
            addToFavorites.addClass("btn orange");
            addToFavorites.attr("id", id);

            $(jQuerySelect).html(response.title);
            $(jQuerySelect).append("<br>");
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
                'X-RapidAPI-Key': foodKey
                // 'Accept: application/json' 
            }
        }).done(function (response) {
            console.log(response);

            var newFood = $("<div>");
            var foodImg = $("<img>");
            newFood.attr("id", id);
            newFood.addClass("food-display");
            foodImg.attr("src", response.image);
            foodImg.addClass("circle");

            newFood.append(response.title);
            newFood.append("<br>");
            newFood.append(foodImg);

            $("#favorite-meals").append(newFood);

        }).fail(function (err) {
            console.log(err);
        });

    }
    
    function getExercise(id) {

        //exercise api call

        var exerciseQueryUrl = "https://wger.de/api/v2/exercise/?language=2&format=json&category=" + id + "&status=2";

        $.ajax({
            url: exerciseQueryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            for (i = 0; i < 6; i++) {
                var newExercise = $("<div>");
                newExercise.html(response.results[i].name);
                var workoutDiv = "#workout-"+ id
                $(workoutDiv).append(newExercise);
                
        }

        }, function (err) {
            console.log("error received:" + err);
        })
    };

    //
    //
    //
    //DATABASE CALLS
    //
    //
    //

    //database call to populate initial favorites
    database.ref().on("child_added", function (snapshot) {
        //hold object value
        var sv = snapshot.val();
        console.log(sv);
        populateFavorites(sv);
    });

    ///
    ///
    ///MATERIALIZE JS FUNCTIONS
    //
    ///
    //

    //carousel functionality for materialize
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $('.slider').slider();

    $('.fixed-action-btn').floatingActionButton();


    $('.collapsible').collapsible();

    $(".modal").modal();
    
    //
    //
    //
    //BUTTON ON CLICK EVENTS
    //
    //
    //

    //Functions for slider

    $("#start-button").on("click", function () {
        $('.slider').slider().destroy();

    });

    //button functions
    //goes to next page and populate exercises
    $(".goal-buttons").on("click", function () {
        //food api call
        calories = ($(this).attr("value"));
        localStorage.clear();
        localStorage.setItem("calories", calories);

    });

    //populates meal plan for the day
    $(".day-of-week").on("click", function () {
        var day = $(this).attr("data-value");
        var calories = localStorage.getItem("calories");
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
    //populates exercises
    $(".exercise-type").on("click", function () {

        var exerciseId = $(this).attr("data-value")
        getExercise(exerciseId)
        console.log(exerciseId)


    });

});


