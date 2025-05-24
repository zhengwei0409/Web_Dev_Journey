const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = ''
const app = express();
app.use(express.json());

const users = [];


app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/signup', function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        status: "Register Account Successfull"
    })
})

app.post('/signin', function(req,res) {
    const username = req.body.username;
    const password = req.body.password;


    const user = users.find(function(user) {
        if(username == user.username && password == user.password) return user;
    })

    if(user) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.json({
            status: "User not found"
        })
    }
})

app.use(function (req,res,next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded.username) {
        req.username = decoded.username;
        next();
    } else {
        res.json({
            status: 'Invalid Token'
        })
    }
})

app.get('/me', function(req,res) {


    const user = users.find(function(user) {
        if(req.username == user.username) return user;
    })

    if(user) {
        res.json({
            username: user.username,
            password: user.password
        })
    } else {
        res.json({
            status: "Invalid Token"
        })
    }
})

app.listen(3000);