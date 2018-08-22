var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Meal = sequelize.define("Meal", {
    mealtime: DataTypes.STRING,
    food: DataTypes.STRING,
    calorieCount: DataTypes.INTEGER,
    dayCount: DataTypes.INTEGER
 
  });
  Meal.associate = function(models) {
    Meal.belongsTo(models.User)
  };
  return Meal;
};

