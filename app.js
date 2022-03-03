////////////////////// Setup Section Start //////////////////////

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

////////////////////// Setup Section End //////////////////////

////////////////////// Schema  Section Start //////////////////////

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

////////////////////// Schema Section End //////////////////////

////////////////////// Get/Post/Delete Section Start //////////////////////

// app.get("/articles", function(req, res) {
//     Article.find({}, function(err, articlesFound) {
//         if(!err) {
//             res.send(articlesFound);
//         } else {
//             res.send(err);
//         }
//     })
// })


// app.post("/articles", function(req, res) {
//     const title = req.body.title;
//     const content = req.body.content;

//     updateArticle(title, content).save(function(err) {
//         if(!err) {
//             res.send("Update was successful");
//         } else {
//             res.send(err);
//         }
//     });

// })

// app.delete("/articles", function(req, res) {
//     Article.deleteMany(
//         {},
//         function(err) {
//             if(!err) {
//                 res.send("Removal was successful");
//             } else {
//                 res.send(err);
//             }
//         }
//     )
// })

// ============= Route Chaining To All Articles Start =============

app.route("/articles")
    .get(function(req, res) {
        Article.find({}, function(err, articlesFound) {
            if(!err) {
                res.send(articlesFound);
            } else {
                res.send(err);
            }
        })
    })
    .post(function(req, res) {
        const title = req.body.title;
        const content = req.body.content;

        updateArticle(title, content).save(function(err) {
            if(!err) {
                res.send("Update was successful");
            } else {
                res.send(err);
            }
        });

    })
    .delete(function(req, res) {
        Article.deleteMany(
            {},
            function(err) {
                if(!err) {
                    res.send("Removal was successful");
                } else {
                    res.send(err);
                }
            }
        )
    });

// ============= Route Chaining To All Articles End =============

// ============= Route Chaining To Specific Article Start =============

app.route("/articles/:articleTitle")
    .get(function(req, res) {
        Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
            if(!err) {
                if(foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No articles matching that title was found");
                }
            } else {
                res.send(err);
            }
        })
    })
    // replaces the document with the new input
    .put(function(req, res) {
        Article.updateOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            function(err, foundArticle) {
                if(!err) {
                    res.send("Update was successful");
                } else {
                    res.send(err);
                }
            })
    });

// ============= Route Chaining To Specific Article End =============
    
////////////////////// Get/Post/Delete Section End //////////////////////

////////////////////// Main Function Start //////////////////////

app.listen(port, () => {
    console.log("Server started on port " + port);
})

////////////////////// Main Function End //////////////////////

////////////////////// Sub Function Start //////////////////////

function updateArticle(userTitle, userContent) {
    const newArticle = new Article({
        title: userTitle,
        content: userContent
    });

    return newArticle;
}

////////////////////// Sub Function End //////////////////////