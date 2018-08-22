
var API = {

    getStandings: function() {
      return $.ajax({
        url: "api/standings",
        type: "GET"
      });
    },

  };



//this does not work
function isGoalAchieved(){
    if ((this.calorieGoal==="Maintain")){
        if ((this.calories<=2000)){
            return "Yes";
        }
        else{
            return "No";
        }
    }
    else if((this.calorieGoal==="Weight Loss")){
        if ((this.calories<=1750)){
            return "Yes";
        }
        else{
            return "No";
        }
    }
    else if((this.calorieGoal==="Weight Gain")){
        if ((this.calories>=2500)){
            return "Yes";
        }
        else{
            return "No";
        }
    }
}
