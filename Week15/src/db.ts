import mongoose, {model, Schema} from "mongoose"

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type:String}

})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: "tags"}],
    userId: {type: mongoose.Types.ObjectId, ref: "users", require: true}
})

const LinkSchema = new Schema({
    hash: {type: String, require: true},
    userId: {type: mongoose.Types.ObjectId, ref: 'users', require: true}
})

export const UserModel = model('users',UserSchema);
export const ContentModel = model('contents', ContentSchema);
export const LinkModel = model('links', LinkSchema);