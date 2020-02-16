var express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/middleware');

var router = express.Router();
const secret = 'mysecretsshhh';
//Route for adding cookie 
router.get('/setdata', (req, res)=>{ 
    res.cookie("userData", 123455); 
    res.send('user data added to cookie'); 
}); 

router.get('/clearcookie', function (req, res) {
    res.clearCookie();
    res.send("done");
});

router.get('/getdata', function (req, res) {
    res.send(req.cookies);
});

router.get('/home', function (req, res) {
    res.send('Welcome!');
});

router.get('/secret', withAuth, function (req, res) {
    res.send('The password is potato');
});

router.post('/api/register', function (req, res) {
    const { email, password } = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User(email, pwHashed);
        if (user.save()) {
            res.status(500)
                .send("Error registering new user please try again.");
        } else {
            res.status(200).send("Welcome to the club!");
        }
    }).catch((err) => {
        res.status(500).send("Error registering new user please try again.");
    });
});

router.post('/authenticate', function (req, res) {
    const { email, password } = req.body;
    if (email === "ductuan20102450@gmail.com") {
        isCorrectPassword(password, (err, same) => {
            if (err) {
                res.status(500).send({
                        error: 'Internal error please try again'
                    });
            } else if (!same) {
                res.status(500).send({
                        error: 'Incorrect email or password'
                    });
            } else {
                // Issue token
                const payload = { email };
                const token = jwt.sign(payload, secret, {
                    expiresIn: 120
                });
                res.cookie('token', token, {
                    maxAge: 90000,
                    secure: false, // set to true if your using https
                    httpOnly: true 
                });
                res.status(200);
                res.send("Login success");
                //console.log(JSON.stringify(res));
                console.log(token);
            }
        });
    } else {
        res.status(500).send({
            error: 'Incorrect email or password'
        });
    }
});

function isCorrectPassword(password, callback) {
    bcrypt.hash("potato", 10).then((hash) => {
        bcrypt.compare(password, hash, function (err, same) {
            if (err) {
                callback(err);
            } else {
                callback(err, same);
            }
        });
    });
}

module.exports = router;