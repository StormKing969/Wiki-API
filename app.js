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

// ==================== Get/Post/Delete Section Start ========================

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

// ============= Route Chaining =============

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
// ==================== Get/Post/Delete Section End ========================

// ==================== Main Function Start ========================

app.listen(port, () => {
    console.log("Server started on port " + port);
})

// ==================== Main Function End ========================

// ==================== Sub Function Start ========================

function updateArticle(userTitle, userContent) {
    const newArticle = new Article({
        title: userTitle,
        content: userContent
    });

    return newArticle;
}

// ==================== Sub Function End ========================