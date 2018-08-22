
$(function()  {

    //food api
    var foodItem = "";
    var calorieCount = 0;


    var $mealName = $("#foodInput");
    var totalDailyCal = 0;
    var $mealTime = "";

    //meal submit
    var $submitMeal = $("#sendFoodToDb");
    // show mealInfo before submit
    var $displayDailyCals = $("#dailySummaryTotalCal");

    //end meal data / api

    var $profileName = $("#profileName");
    var $profileAge = $("#profileAge");
    var $profileWeight = $("#profileWeight");
    var $profileCalorieGoal = $("#profileCalorieGoal");
    var $profileCalorieGoalAmount = $("#profileCalorieGoalAmount");

    var $viewProfileName = $("#viewProfileName");
    var $viewProfileAge = $("#viewProfileAge");
    var $viewProfileWeight = $("#viewProfileWeight");
    var $viewProfileCalorieGoal = $("#viewProfileCalorieGoal");
    var $viewProfileCalorieGoalAmount = $("#viewProfileCaloriesAmount");

    //profile form submit button
    var $profileFormSubmit = $("#profileFormSubmit");
    var $viewProfileData = $("#viewProfileData");
    var info = [];

    $("#sendFoodToDb").hide();

    $("#submitFood").on("click", function () {
        event.preventDefault();

        var food = $("#foodInput").val().trim();
        var foodQuery = "https://trackapi.nutritionix.com/v2/search/instant?query=" + food;
        var settings = {
            async: true,
            crossDomain: true,
            url: foodQuery,
            method: "GET",
            headers: {

                "x-app-id": "6a2a1644",
                "x-app-key": "299235876ad8df154fe7505413d8548b",

            }
        };

        $.ajax(settings).then(function (response) {
            console.log(response.branded[0]);
            console.log(response.branded[0].nf_calories);
            foodItem = food;
            calorieCount = response.branded[0].nf_calories;

            console.log(foodItem + " " + calorieCount);
            $mealTime = $('input[name="mealTime"]:checked').val();
            $("#showMealName").text("Food Item: " + foodItem);
            $("#showCalAmount").text("Calories: " + calorieCount);
            $("#sendFoodToDb").show();
            $("#submitFood").hide();

        });
    });


    //     $("#sendFoodToDb").on("click", function () {

    // mealData =

    //     });


    var API = {
        saveProfileData: function (userInfo) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "/api/username/profile/userinfo",
                data: JSON.stringify(userInfo)
            });
        },

        getProfileData: function () {
            return $.ajax({

                url: "/api/username/profile/userinfo/",
                type: "GET"
            });
        },

        saveMealData: function (data) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "/api/username/meal",
                data: JSON.stringify(data)
            });
        },


        displayDailyCalTotal: function () {
            return $.ajax({

                url: "/api/username/meal",
                type: "GET"
            });
        },

        getMealHistory: function () {
            return $.ajax({

                url: "/api/username/meal/history",
                type: "GET"
            });
        },


        updateGoal: function () {
            return $.ajax({
                url: "api/examples",
                type: "PUT",
                data: newStatus
            });
        },

        deleteExample: function (id) {
            return $.ajax({
                url: "api/examples/" + id,
                type: "DELETE"
            });
        },

        //users
        userSignIn: function (user) {
            return $.ajax({

                url: "api/signin",
                type: "GET"

            });
        },
        userSignUp: function (newUser) {
            return $.ajax({
                headers: {
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: "api/signup",
                data: JSON.stringify(newUser)
            });
        },
    };



    var handleMealSubmit = function (event) {

        event.preventDefault();

        var mealData = {
            mealtime: $mealTime,
            food: $mealName.val().trim(),
            calorieCount: calorieCount,
            dayCount: totalDailyCal + calorieCount

        };



        API.saveMealData(mealData).then(function () {
            $("#sendFoodToDb").hide();
            $("#submitFood").show();



            // insertUserData(userData);
        });


    };

    var showTotalCalAmt = function () {
        event.preventDefault();

        API.displayDailyCalTotal().then(function (data) {
            console.log(data);
            var foodData = {
                totalDailyCal: data[0].dayCount


            }


            console.log(foodData.totalDailyCal);
            totalDailyCal = foodData.totalDailyCal;
            console.log(totalDailyCal);
            $("#dailySummaryTotalCal").text(totalDailyCal);

        });

    };
    function currentUser(){
        
          $("#logInButton").hide();
          $("#signOut").show();
        
       
      };

    var displayCals = function () {
        API.displayDailyCalTotal().then(function (data) {
            // console.log(data);
            var foodData = {
                totalDailyCal: data[0].dayCount


            }


            totalDailyCal = foodData.totalDailyCal;
            $("#dailySummaryTotalCal").text(totalDailyCal);
            if(data){
                currentUser();
            }
        });

    };


/*
    var displayMealHistory = function () {
        event.preventDefault();

        console.log('samsawan HELLO EHELLO')

        API.getMealHistory().then(function (data) {
            console.log(data);
            var mealHistory = {
                mealtime: data.mealtime,
                food: data.food,
                calorieCount: data.calorieCount,
                dayCount: data.dayCount,
                createdAt: data.createdAt
            }
            insertMealHistory(mealHistory);
        });
    }

*/


    var showProfileData = function () {
        event.preventDefault();
        API.getProfileData().then(function (data) {
            console.log(data);
            var userData = {
                name: data.name,
                age: data.age,
                weight: data.weight,
                calorieGoal: data.calorieGoal,
                calories: data.calories
            }
            insertUserData(userData);
        });
    }




    var handleProfileSubmit = function (event) {
        event.preventDefault();

        var userData = {
            name: $profileName.val().trim(),
            age: $profileAge.val().trim(),
            weight: $profileWeight.val().trim(),
            calorieGoal: $profileCalorieGoal.val().trim(),
            calories: $profileCalorieGoalAmount.val().trim(),


        };



        API.saveProfileData(userData).then(function () {
            insertUserData(userData);
        });


    };
    //profile data function, insert
    function insertUserData(data) {
        $viewProfileName.text(data.name);
        $viewProfileAge.text(data.age);
        $viewProfileWeight.text(data.weight);
        $viewProfileCalorieGoal.text(data.calorieGoal);
        console.log(data.calorieGoal);
        $viewProfileCalorieGoalAmount.text(data.calories);


    };
    //mealHistory function
    function insertMealHistory(data) {
        $viewProfileName.text(data.mealtime);
        $viewProfileAge.text(data.food);
        $viewProfileWeight.text(data.calorieCount);
        $viewProfileCalorieGoal.text(data.dayCount);
        $viewProfileCalorieGoalAmount.text(data.createdAt);


    };


    // function dynamicHistoryTable(){
    //     var $historyTable = $("<table id='mealHistoryTable'>"+ "</table>");
    //     var $historyRow1 = $("<tr id='columnNames'>" + "</tr>");
    //     var $historyCell1 = $("<td id='>" + "</td>");

    //     $historyTable.append($historyRow);

    // }



    function dynamicHistoryTable() {


        var table = $("<table></table>");
        var tableRow = $("<tr></tr>");
        var headerName = ["mealtime", "food", "calorieCount", "dayCount", "createdAt"];
        // var tableData = $("<td>" + data + "</td>");
        table.append("#historyTablePlace");
     
        table.append(tableRow);

        for (var i = 0; i < 12; i++) {
            var tableColumnHeader = $("<th>" + headerName[i] + "</th>");

            tableRow.append(tableColumnHeader);
        }

    };





    dynamicHistoryTable();

    $profileFormSubmit.on("click", handleProfileSubmit);

    //$viewProfileData.on("click", showProfileData);

    $("#ViewProfile").on("click", showProfileData);

    $submitMeal.on("click", handleMealSubmit);

    $("#submitFood").on("click", showTotalCalAmt);
    displayCals();
    $(".closeFoodModal").on("click", displayCals);

});
