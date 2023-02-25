"use strict";

/*
require modules
 */
var express = require("express");
var bodyParser = require("body-parser");
var session = require('express-session');
var fileUpload = require("express-fileupload");
const mysql = require('mysql');
var moment = require('moment');
var fs = require('fs');

// Set up other config variables
var app = express();
var port = 8000;

// Define a variable to store the array of user objects acquired from the database
var uname, pwd;
var nuname, npwd;
var currentUser;
var file;
var allImages, currentUserImages;
var imageFileName;
var commentsArray;


// Set up the middlewares needed
app.use(session({
    secret: 'crmorytp8vyp98p%&ADIB66^^&fjdfdfaklfdhf',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24*60*60*1000 }
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.use(fileUpload());

// Create an object to connect to the mysql database server
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "950405=Doudou",
    database: "image_sharing_app_db"
});

// Use the connect method of this object to establish the connection
con.connect(function(err) {
    if (err)
        console.log("Error occurred while connecting to Database: "+ err);
     else
        console.log("Successfully Connected to Database!");
});

app.set("view-engine", "ejs");
app.set("views", "templates");

function getCurrentTime() {
    var t = new Date();
    var year = t.getFullYear() + '', 
        month = t.getMonth() + 1 + '',
        date = t.getDate() + '',
        hour= t.getHours() + '',
        minute= t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes() + '',
        seconds = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds() + '';
    var currentTimeArr = new Array(year, month, date, hour, minute, seconds);
    return(currentTimeArr);
}

function timeFormatter() {
    var formattedTime = moment().format('YYYY/MM/DD HH:mm:ss');
    return formattedTime;
}

/*
Configure application Routes
 */
// Route when users accessing to the home page.
app.get("/", function(req, res) {
    // An image with a state of 0 means that it has not been deleted
    var sql = `SELECT * FROM images WHERE state = 0`;
    con.query(sql, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            allImages = results;
        }
    });
    // Render homepage.ejs pages based on whether the user is logged in or not
    if(req.session.username) {
        currentUser = req.session.username;
        res.render("homepage.ejs", {
            "url": 'profile/:' + currentUser,
            "Btn": 'Profile',
            "imagesList": allImages,
        });
    } else {
        res.render("homepage.ejs", {
            "url": 'login',
            "Btn": 'LOG IN',
            "imagesList": allImages,
        });
    }
});

// Route when accessing to the image detail page.
app.get("/images/:imageFileName", function(req, res) {
    var imageFileNameStr = req.params.imageFileName;
    // Define variables to store all the information about the image from the database
    var uploader, imageDescription, uploadTime;
    if(imageFileNameStr.substring(0, 1) === ':') {
        imageFileName = imageFileNameStr.substring(1);
    } else {
        imageFileName = imageFileNameStr;
    }
    // Define a variable to record whether the current user has liked the image
    var userLiked;
    var sql1 = `SELECT * FROM images WHERE filename = "${imageFileName}"`;
    con.query(sql1, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            imageDescription = results[0].description;
            uploadTime =  results[0].date;
            uploader =  results[0].username;
            // Get all comments for the current image and save them in a variable named commentsArray
            var sql2 = `SELECT * FROM comments WHERE filename = "${imageFileName}"`;
            con.query(sql2, function(err, results) {
                if (err) {
                    res.send("A database error occurred: "+err);
                } else {
                    commentsArray = results;
                    // Get the number of likes on the current image and save it in a variable named number
                    var sql3 = `SELECT * FROM likes WHERE filename = "${imageFileName}"`;
                    con.query(sql3, function(err, results) {
                        if (err) {
                            res.send("A database error occurred: "+err);
                        } else {
                            var number = results.length;
                            // Determine if the current user has already liked the image
                            var sql4 = `SELECT * FROM likes WHERE filename = "${imageFileName}" and username = "${currentUser}"`;
                            con.query(sql4, function(err, results) {
                                if (err) {
                                    res.send("A database error occurred: "+err);
                                } else {
                                    // If the current user has already liked the image, then set the value of userLike to true
                                    // So that the like button can be disabled when rendering the ejs file
                                    if(results.length > 0) {
                                        userLiked = true;
                                        res.render("imagedetail.ejs", {
                                            "imageUrl": imageFileName, 
                                            "imageDesc": imageDescription, 
                                            "uploadTime": uploadTime,
                                            "uploader": uploader,
                                            "commentsList": commentsArray,
                                            "user": currentUser,
                                            "liked": userLiked,
                                            "likesNumber": number
                                        });
                                    } else {
                                        userLiked = false;
                                        res.render("imagedetail.ejs", {
                                            "imageUrl": imageFileName, 
                                            "imageDesc": imageDescription, 
                                            "uploadTime": uploadTime,
                                            "uploader": uploader,
                                            "commentsList": commentsArray,
                                            "user": currentUser,
                                            "liked": userLiked,
                                            "likesNumber": number
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// Route when users submit comments
app.post("/images/:imageFileName/:comment", function(req, res) {
    var commentTime = timeFormatter();
    var content = req.params.comment;
    var username = req.session.username;
    // Determine whether a user is logged in
    if(req.session.username !== undefined) {
        // Define the rules for checking the comments entered by the users
        // To prevent the SQL Injection attack
        var reg = /^[a-zA-Z0-9.,:!?();&*~ ]{1,100}$/;
        if(reg.test(content)) {
            var sql = `INSERT INTO comments (filename, content, username, date) VALUES ("${imageFileName}", "${content}", "${username}", "${commentTime}")`;
            con.query(sql, function(err, results) {
                if (err) {
                    res.send("A database error occurred: "+err);
                } else {
                    res.json({success: true, commentContent: content, commenter: username, commentTime: commentTime});
                }
            });
        } else {
            return;
        }
    } else {
        res.render("hintmessage.ejs", {
            "hintTitle": 'Error:', 
            "hintMessage": 'Session expired, please log in again!',
            "routeUrl": 'javascript:history.go(-1)',
            "imgUrl": "images/fail.png",
            "buttonText": 'Go back'
        });
    }
})

// Route when users like the images
app.post("/images/:imageFileName/likes/postLike", function(req, res) {
    // Determine whether a user is logged in
    if(req.session.username !== undefined) {
        console.log(req.session.username !== undefined);
        var sql1 = `INSERT INTO likes (filename, username)  VALUES ("${imageFileName}", "${currentUser}")`;
        con.query(sql1, function(err, results) {
            if (err) {
                res.send("A database error occurred: "+err);
            } else {
                var sql2 = `SELECT * FROM likes WHERE filename = "${imageFileName}"`;
                    con.query(sql2, function(err, results) {
                        if (err) {
                            res.send("A database error occurred: "+err);
                        } else {
                            var number = results.length;
                            res.json({success: true, likesNumberNew: number});
                        }
                    });
            }
        });
    } else {
        res.render("hintmessage.ejs", {
            "hintTitle": 'Error:', 
            "hintMessage": 'Session expired, please log in again!',
            "routeUrl": 'javascript:history.go(-1)',
            "imgUrl": "images/fail.png",
            "buttonText": 'Go back'
        });
    }
})

// Route when delete the image.
app.get("/images/:imageFileName/delete", function(req, res) {
    // Determine whether a user is logged in
    if(req.session.username !== undefined) {
        // 'Delete' an image using the mark-delete method, setting the value of the image's state to 1 
        // So that the user can later restore the deleted photo from the database
        var sql = `UPDATE images SET state = 1 WHERE filename = "${imageFileName}"`;
        con.query(sql, function(err, results) {
            if (err) {
                res.send("A database error occurred: "+err);
            } else {
                res.render("hintmessage.ejs", {
                    "hintTitle": 'Congratulations:', 
                    "hintMessage": 'You have successfully deleted the image!',
                    "routeUrl": '/profile/:' + currentUser,
                    "imgUrl": "../../images/success.png",
                    "buttonText": 'Go back'
                });
            }
        });
    } else {
        res.render("hintmessage.ejs", {
            "hintTitle": 'Error:', 
            "hintMessage": 'Session expired, please log in again!',
            "routeUrl": 'javascript:history.go(-1)',
            "imgUrl": "images/fail.png",
            "buttonText": 'Go back'
        });
    }
})

// Route when users accessing to the login page.
app.get("/login", function(req, res) {
    res.render("login.ejs");
});

// Route when users submit form in the login page.
app.post("/login", function(req, res) {
    uname = req.body.username;
    pwd = req.body.password;
    // Determine whether the user name and password entered by the user are both valid.
    var sql = `SELECT * FROM users WHERE username = "${uname}" and password = "${pwd}"`;
    con.query(sql, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0) {
                req.session.username = uname;
                res.redirect('/profile/:' + uname);
            } else {
                res.render("hintmessage.ejs", {
                    "hintTitle": 'Error:', 
                    "hintMessage": 'The username or the password is invalid, please try again!',
                    "routeUrl": 'javascript:history.go(-1)',
                    "imgUrl": "images/fail.png",
                    "buttonText": 'Go back'
                })
            }
        }
    });
});

app.get("/signup", function(req, res) {
    res.render("signup.ejs");
})

app.post("/signup", function(req, res) {
    nuname = req.body.nusername;
    npwd = req.body.npassword;
    var sql1 = `SELECT * FROM users WHERE username = "${nuname}"`;
    con.query(sql1, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0) {
                // Remind the user that the username is already occupied
                res.render("hintmessage.ejs", {
                    "hintTitle": 'Error:', 
                    "hintMessage": 'The account name is already taken, please try again with a new username!',
                    "routeUrl": 'javascript:history.go(-1)',
                    "imgUrl": "images/fail.png",
                    "buttonText": 'Go back'
                });
            } else {
                var sql2 = `INSERT INTO users (username, password) VALUES ("${nuname}", "${npwd}")`;
                con.query(sql2, function(err, results) {
                    if (err) {
                        res.send("A database error occurred: "+err);
                    } else {
                        // Prompt the user to register successfully
                        res.render("hintmessage.ejs", {
                            "hintTitle": 'Congratulations:', 
                            "hintMessage": 'You have successfully registered a new account! Now try logging in with your new account and uploading images!',
                            "routeUrl": 'login',
                            "imgUrl": "images/success.png",
                            "buttonText": 'Go to log in'
                        });
                    }
                });
            }
        }
    });
})

// Route when users accessing to the profile page.
app.get("/profile/:uname", function(req, res) {
    var unameStr = req.params.uname;
    if(unameStr.substring(0, 1) === ':') {
        currentUser = unameStr.substring(1);
    } else {
        currentUser = unameStr;
    }
    // An image with a state of 0 means that it has not been deleted
    var sql = `SELECT * FROM images WHERE username = "${currentUser}" and state = 0`;
    con.query(sql, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            currentUserImages = results;
            res.render("profile.ejs", {
                "currentUser": currentUser,
                "imagesList": currentUserImages
            });
        }
    });
});

// Route when users accessing to the upload page.
app.get("/profile/:uname/upload", function(req, res) {
    if(req.session.username) {
        res.render("upload.ejs", {"currentUser": currentUser});
    } else {
        res.render("hintmessage.ejs", {
            "hintTitle": 'Error:', 
            "hintMessage": 'Session expired, please log in again!',
            "routeUrl": '/login',
            "imgUrl": "images/fail.png",
            "buttonText": 'Go back'
        });
    }
});

// Route when users uploading files in the upload page.
app.post("/profile/:uname/upload", function(req, res) {
    file = req.files.myimage;
    currentUser = req.session.username;
    var timeString = getCurrentTime().join("");
    var fileName = file.name + '';
    // Get the format of the file
    var dotIndex = fileName.lastIndexOf("\.");
    var fileFormat = fileName.substring( dotIndex + 1, fileName.length);
    // Define a new file name by combining the uploader's name and the upload time
    var fileNameNew = currentUser + "_" + timeString + "." + fileFormat;
    var date = timeFormatter();
    var desc = req.body.desc;
    var sql2 = `INSERT INTO images (originalname, filename, username, date, description) VALUES ("${fileName}", "${fileNameNew}", "${currentUser}", "${date}", "${desc}")`;
    con.query(sql2, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            res.redirect('/profile/:' + currentUser);
        }
    });
    // Files will be stored in the uploadedFiles folder
    file.mv("static/uploadedFiles/" + fileNameNew);
});

// Route when users accessing to the logout page.
app.get("/profile/:uname/logout", function(req, res) {
    // Delete the current user from session.
    delete req.session.username;
    currentUser = req.session.username;
    // And then take the user back to the homepage.
    res.redirect('/');
});


/*
Start the server
 */
app.listen(port);
console.log("Server running on http://localhost:" + port);
