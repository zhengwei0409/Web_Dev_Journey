const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db")
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require('../middleware/admin');
const adminRouter = Router();

const { JWT_ADMIN_PASSWORD } = require('../config');
const course = require("./course");


adminRouter.post('/signup', async function(req,res) {
    const {email, password, firstname, lastname } = req.body;

    // TODO: zod validation
    const requiredBody = z.object({
        email: z.string().min(3).max(50).email(),
        password: z.string().min(3).max(50),
        firstname: z.string().min(3).max(50),
        lastname: z.string().min(3).max(50)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success) {
        res.json({
            status: "Incorrect Format",
            err: parsedDataWithSuccess.error
        })
        return;
    }

    // TODO: hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password,5);

    // TODO: put inside try catch block
    try{
        await AdminModel.create({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname
        })

        res.json({
            status: "admin registration successful"
        })
    } catch(e) {
        res.json({
            status: "register error",
            err: e.message
        })
    }
    

})

adminRouter.post('/signin', async function(req,res) {
    const {email, password} = req.body;

    const admin = await AdminModel.findOne({
        email
    })

    if(admin) {

        const passwordMatch = await bcrypt.compare(password,admin.password);

        if(passwordMatch) {
            const token = jwt.sign({
                id: admin._id
            },JWT_ADMIN_PASSWORD)

            res.json({
                token: token
            })
        } else {
            res.json({
                status: "Incorrect email or password"
            })
        }

    } else {
        res.json({
            status: "Cannot find admin acc"
        })
        return;
    }

    

})

adminRouter.post('/course',adminMiddleware, async function(req,res) {

    const {title, description, price, imageUrl} = req.body;

    try{ 
        const course = await CourseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId: req.id
        })

        res.json({
            status: "Course Added",
            courseId: course._id
        })
    } catch(e) {
        res.json({
            status: 'Add course failed',
            err: e.message
        })
    }
})

adminRouter.put('/course',adminMiddleware, async function(req,res) {
    const {title, description, price, imageUrl, courseId} = req.body;

    // check if course's creatorId == req.id, else return
    const course = await CourseModel.findOne({
        _id: courseId,
        creatorId: req.id
    })

    if(!course) {
        res.json({
            status: "You dont have this course"
        })
        return;
    }

    try{ 
        await CourseModel.updateOne({
            _id: courseId,
            creatorId: req.id
        },{
            title,
            description,
            price,
            imageUrl,
        })

        res.json({
            status: "Course Updated",
            courseId: course._id
        })
    } catch(e) {
        res.json({
            status: 'Update course failed',
            err: e.message
        })
    }
})

adminRouter.get('/course/bulk',adminMiddleware, async function(req,res) {
    try{ 
        console.log(req.id);
        const course = await CourseModel.find({
            creatorId: req.id
        })

        res.json({
            status: "Course retrieved",
            course: course
        })
    } catch(e) {
        res.json({
            status: 'No course',
            err: e.message
        })
    }
})

module.exports = {
    adminRouter
}