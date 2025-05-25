const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String

})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String

})

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const UserModel = mongoose.model("users", userSchema);
const CourseModel = mongoose.model("courses", courseSchema);
const AdminModel = mongoose.model("admins", adminSchema);
const PurchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
    UserModel,
    CourseModel,
    AdminModel,
    PurchaseModel
}