const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { PurchaseModel, CourseModel } = require("../db");

const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async function(req,res) {
    const userId = req.id;
    const courseId = req.body.courseId

    try{
        await PurchaseModel.create({
            userId,
            courseId
        })

        res.json({
            status: "purchase successfully"
        })
    }catch(e) {
        res.json({
            status: "purchase failed"
        })
    }
})

courseRouter.get('/preview', async function(req,res) {
    const courses = await CourseModel.find({});

    res.json({
        courses
    })
})

module.exports = {
    courseRouter: courseRouter
}