
// Get references to page elements
var $blogTitle = $("#new-blog-title");
var $blogTopic = $("#new-blog-topic");
var $blogMessage = $("#new-blog-message");
var $blogSubmitBtn = $("#new-blog-submit");

var $blogList = $("#blog-list");
var $topicSearchBtn = $("#topic-dropdown-select");
var $allBlogsBtn = $("#allBlogsBtn");
var $yourBlogsBtn = $("#yourBlogsBtn");

// The API object contains methods for each kind of request we'll make
var API = {
  saveBlog: function(blog) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/blog",
      data: JSON.stringify(blog)
    });
  },
  getBlogs: function() {
    return $.ajax({
      url: "api/blog",
      type: "GET"
    });
  },

  getBlogsByTopic: function() {
    return $.ajax({
      url: "api/blog/topic/" + topic,
      type: "GET"
    });
  },

  getBlogsByName: function() {
    return $.ajax({
      url: "api/blog/user/" + name,
      type: "GET"
    });
  },

  deleteBlog: function(id) {
    return $.ajax({
      url: "api/blog/" + id,
      type: "DELETE"
    });
  }
};





// handleFormSubmit is called whenever we submit a new blog
// Save the new blog to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var blog = {
    title: $blogTitle.val().trim(),
    topic: $blogTopic.val(),
    message: $blogMessage.val().trim()
  };

  
  if (!(blog.title && blog.message)) {
    alert("You must enter a title and message!");
    return;
  }
  

  API.saveBlog(blog).then(function() {
    location.reload();
  });

  $blogTitle.val("");
  $blogTopic.val("");
  $blogMessage.val("");
};

//loadTopicBlogs is called when a user searches for blogs by topic
var loadTopicBlogs = function(event) {
  $blogList.val("");
  var e = document.getElementById("topicDropdownSelect");
  var topicSelect = e.options[e.selectedIndex].text;

  window.location.href = "localhost:3000/blog/topic/" + topicSelect;
}

//loadAllblogs 
var loadAllBlogs = function(event) {
  $blogList.val("");
  window.location.href = "localhost:3000/blog";
}

// Add event listeners to the submit and delete buttons
$blogSubmitBtn.on("click", handleFormSubmit);
$topicSearchBtn.on("click", loadTopicBlogs);
$allBlogsBtn.on("click", loadAllBlogs);


$("div.card .card-header").on("click", function () {

  if ($(this).hasClass("hidecontent")) {
      $(this).removeClass("hidecontent");
      $(this).next().show(1000);
  } else {
      $(this).addClass("hidecontent");
      $(this).next().hide(1000);
  }

})