var db = require("../models");

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


localStorage.setItem('myFirstKey', 'myFirstValue');
console.log(localStorage.getItem('myFirstKey'));



module.exports = function (app) {

  var uID = "";
  exports.uID = uID;
  // Get all examples
  app.get("/api/goal", function (req, res) {
    db.Lifestyle.findAll({
      where: {
        UserId: uID
      }
    }).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/goal", function (req, res) {
    db.Lifestyle.create({
      goal: req.body.goal,
      description: req.body.description,
      UserId: uID
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.put("/api/goal/:id", function (req, res) {
    db.Lifestyle.update({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/goal/:id", function (req, res) {
    db.Lifestyle.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });







  app.post("/api/username/profile/userinfo", function (req, res) {
    db.Profile.create({
      name: req.body.name,
      age: req.body.age,
      weight: req.body.weight,
      calorieGoal: req.body.calorieGoal,
      calories: req.body.calories,
      UserId: uID

    })
      .then(function (dbProfile) {
        res.json(dbProfile);
      });
  });

  app.get("/api/username/profile/userinfo", function (req, res) {
    db.Profile.findOne({
      where: { UserId: uID },
      include: [db.User]
    }).then(function (dbProfile) {
      res.json(dbProfile);
    });
  });

  //blog page
  // Retrieve all blogs
  app.get("/api/blog", function (req, res) {
    db.Blog.findAll({}).then(function (dbBlogs) {
      res.json(dbBlogs);
    });
  });

  // Create a new blog
  app.post("/api/blog", function (req, res) {
    db.Blog.create(req.body).then(function (dbBlog) {
      res.json(dbBlog);
    });
  });

  app.get("/api/username/blog/post/:id", function (req, res) {
    db.Blog.findAll({})
      .then(function (dbBlog) {
        res.json(dbBlog);
      });
  });
        // Standings Retrieve all profiles
        app.get("/api/standings", function(req, res) {
          db.Profile.findAll({}).then(function(dbProfiles) {
            res.json(dbProfiles);
          });
        });

  app.post("/api/username/lifestyle/goals", function (req, res) {
    db.Lifestyle.create({
      goal: req.body.goal,
      description: req.body.description,
      UserId: uID
    })
      .then(function (dbLifestyle) {
        res.json(dbLifestyle);
      });
  });

  app.get("/api/username/lifestyle/goals", function (req, res) {
    db.Lifestyle.findAll({})
      .then(function (dbLifestyle) {
        res.json(dbLifestyle);
      });
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
      verifyPassword: req.body.verifyPassword
    })
      .then(function (dbSignup) {
        res.json(dbSignup);
      });
  });

  app.get("/api/signin/:email/:password", function (req, res) {
    db.User.findOne({
      where:
        {
          email: req.params.email


        }
    })
      .then(function (dbSignIn) {
        res.json(dbSignIn);
        var password = dbSignIn.dataValues.password;
        if (password === req.params.password) {

          console.log("passwords match, works")

          console.log(dbSignIn.dataValues.password);
          console.log(dbSignIn.dataValues.id);
          uID = dbSignIn.dataValues.id;
          localStorage.setItem('uID', uID);
        }
        else {
          console.log("passwords do NOT MATCH");
        }


      });
  });

  app.get("/api/signout/", function (req, res) {
    db.User.findAll({})
      .then(function (dbSignout) {
        res.json(dbSignout);
        

          console.log("user signed out")

         
          uID = null;
        
       

      });
  });

  app.post("/api/username/meal", function (req, res) {
    db.Meal.create({
      mealtime: req.body.mealtime,
      food: req.body.food,
      calorieCount: req.body.calorieCount,
      dayCount: req.body.dayCount,
      UserId: uID

    })
      .then(function (dbMeal) {
        res.json(dbMeal);
      });
  });

  app.get("/api/username/meal", function (req, res) {
    db.Meal.findAll({
      limit: 1,
      where: { UserId: uID },
      order: [['createdAt', 'DESC']],
      include: [db.User]

    })
      .then(function (dbMeal) {
        res.json(dbMeal);
      });
  });

  app.get("/api/username/meal/history", function (req, res) {
    db.Meal.findAll({
      where: { UserId: uID },
      order: [['createdAt', 'DESC']],
      include: [db.User]

    })
      .then(function (dbMeal) {
        res.json(dbMeal);
      });
  });

};




