const express = require("express");
const {z} = require("zod");
const bcrypt = require("bcrypt");
const { UserModel, CourseModel, PurchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require('../middleware/user');
const Router = express.Router;
// or
// const { Router } = require("express");
const {JWT_USER_PASSWORD} = require('../config')
const userRouter = Router();



userRouter.post('/signup', async function(req,res) {
    const {email, password, firstname, lastname} = req.body;

    const validation = z.object({
        email: z.string().min(3).max(50).email(),
        password: z.string().min(3).max(50),
        firstname: z.string().min(3).max(50),
        lastname: z.string().min(3).max(50)
    })

    const parsedValidation = validation.safeParse(req.body);

    if(!parsedValidation.success) {
        res.json({
            status: "Invalid Format",
            err: validation.err
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    try{
        await UserModel.create({
            email,
            password: hashedPassword,
            firstname,
            lastname
        })

        res.json({
            status: "Register successfully"
        })
    }catch(e) {
        res.json({
            status: "Fail to register",
            err: e.message
        })
    }

})

userRouter.post('/signin', async function(req,res) {
    const {email, password} = req.body;

    const user = await UserModel.findOne({
        email
    })

    if(!user) {
        res.json({
            status: "Cannot find user"
        })
        return;
    }

    const compareHashedResult = await bcrypt.compare(password, user.password);

    if(compareHashedResult) {
        const token = jwt.sign({
            id: user._id
        },JWT_USER_PASSWORD)

        res.json({
            token
        })
    } else {
        res.json({
            status: "Incorrect Username or password"
        })
        return;
    }
})

userRouter.get('/purchases',userMiddleware, async function(req,res) {
    const userId = req.id;
    console.log(userId);

    const purchases = await PurchaseModel.find({
        userId
    })

    res.json({
        purchases
    })
})

module.exports = {
    userRouter: userRouter
}