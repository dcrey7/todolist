const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

const items = [];
const workitems = [];

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  const day = date.getdate(); //or date.getday for just the day


  res.render("list", {
    listtitle: day,
    newitem: items
  });
});


app.post("/", function(req, res) {
  const item = req.body.newitem;
  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }



});

app.get("/work", function(req, res) {
  res.render("list", {
    listtitle: "work list",
    newitem: workitems
  });
});

app.post("/work", function(req, res) {
  const item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");

})

app.get("/about", function(req, res) {
  res.render("about")
});

app.listen(process.env.PORT||3000, function() {
  console.log("server started on port 3000");
})
