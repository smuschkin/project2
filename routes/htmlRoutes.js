var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/goal/:id", function (req, res) {
    db.Lifestyle.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("goal", {
        lifestyle: dbExample
      });
    });
  });


  app.get("/lifestyle", function (req, res) {
    db.Lifestyle.findAll({}).then(function (dbLifestyle) {
      res.render("lifestyle", {
        msg: "Welcome!",
        examples: dbLifestyle
      });
    });
  });

  app.get("/profile", function (req, res) {
    db.Example.findAll({}).then(function (dbProfileGet) {
      res.render("profile", {
        msg: "Welcome!",
        userData: dbProfileGet
      });
    });
  });

  //blog
app.get("/blog", function (req, res) {
  db.Blog.findAll({}).then(function (dbBlogs) {
    res.render("blog", {
      blogs: dbBlogs
    });
  });
});

app.get("/blog/:id", function (req, res) {
  db.Blog.findOne({ where: { id: req.params.id } }).then(function (dbBlog) {
    res.render("blog", {
      blog: dbBlog
    });
  });
});

app.get("/blog/topic/:topic", function (req, res) {
  db.Blog.findAll({ where: { topic: req.params.topic } }).then(function (dbBlog) {
    res.render("blog", {
      blog: dbBlog
    });
  });
});

app.get("/blog/user/:name", function (req, res) {
  db.Blog.findAll({ where: { name: req.params.name } }).then(function (dbBlog) {
    res.render("blog", {
      blog: dbBlog
    });
  });
});


  //standings
  app.get("/standings", function (req, res) {
    db.Profile.findAll({}).then(function (dbProfiles) {
      res.render("standings", {
        profiles: dbProfiles
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
