module.exports = function (sequelize, DataTypes) {
    var Lifestyle = sequelize.define("Lifestyle", {
      goal: DataTypes.STRING,
      description: DataTypes.TEXT,
    });
    Lifestyle.associate = function(models) {
      Lifestyle.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
    return Lifestyle;
  };