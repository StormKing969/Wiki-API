// ==================== Setup Section Start ========================

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

// ==================== Setup Section End ========================

// ==================== Schema  Section Start ========================

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// ==================== Schema Section End ========================

// ==================== Get/Post Section Start ========================

// ==================== Get/Post Section End ========================

// ==================== Main Function Start ========================

app.listen(port, () => {
    console.log("Server started on port " + port)
})

// ==================== Main Function End ========================