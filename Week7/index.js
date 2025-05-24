const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {UserModel, TodoModel} = require("./db");
const { z } = require('zod');

const JWT_SECRET ="";

const app = express();
app.use(express.json());
mongoose.connect("")


app.post('/signup', async function(req,res) {

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        name: z.string().min(3).max(100)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success) {
        res.json({
            status: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
        return;
    }


    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 5);


    try{
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })

        res.json({
            status: "Register Successful"
        })
        
    } catch(e) {
        res.json({
            status: "User already exist"
        })
    }

    


});

app.post('/login', async function(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
    })

    if(!response) {
        res.json({
            status: 'Invalid user'
        })
        return;
    } 

    const passwordMatch = bcrypt.compare(password, response.password);

    if(passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token: token
        })
    } else { 
        res.json({
            status: "Incorect email or password"
        })
    }
})

function auth(req,res,next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_SECRET);

    if(decoded) {
        req.userId = decoded.id;
        next();
    } else {
        res.status(401).json({
            status: "Invalid Token"
        })
    }
}
 
app.post('/todo',auth, async function(req,res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId: userId,
        title: title,
        done: done
    })

    res.json({
        status: "Todo Created"
    })
})

app.get('/todos',auth, async function(req,res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    });

    res.json({
        todos
    })
})

app.listen(3000);