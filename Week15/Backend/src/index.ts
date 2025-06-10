import express, { json } from 'express';
import { ContentModel, LinkModel, UserModel } from './db';
import { z } from 'zod';
import bycript from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { loginVarification } from './middleware';
import { Request } from "express";
import cors from 'cors';



interface CustomRequest extends Request {
    id?: string;
}

const app = express();


app.use(cors());
app.use(express.json());

app.post('/api/v1/signup', async (req ,res) => {
    // TODO: zod validation, hash password, error handling, status code
    const {username, password} = req.body;

    const requiredBody = z.object({
        username: z.string().min(3).max(10),
        password: z.string().min(8).max(20).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
        "Password must include uppercase, lowercase, number, and special character")
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success) {
        res.status(411).json({
            status: 'Incorrect Format',
            err: parsedDataWithSuccess.error
        })
        return;
    }


    const hashedPassword = await bycript.hash(password,5);

    try {
        await UserModel.create({
            username,
            password: hashedPassword
        })

        res.status(200).json({
            status: 'account resgister succesfully'
        })
    } catch(e) {
        res.status(403).json({
            status: 'username already exist'
        })
        return;
    }

    
})

app.post('/api/v1/signin', async (req,res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({
        username
    })

    if(user && user.password) {

        const passwordMatch = await bycript.compare(password,user.password);

        const JWT_PASSWORD = process.env.JWT_PASSWORD;

        if(!JWT_PASSWORD) {
            res.status(500).json({
                status: 'JWT Secret is missing'
            })
            return
        }

        if(passwordMatch) {

            const token = jwt.sign({
                id: user._id
            },JWT_PASSWORD);

            res.status(200).json({
                token
            })

        } else {
            res.status(401).json({
                status: 'Login Fail, Invalid Credential'
            })
        }

    } else {
        res.status(403).json({
            status: 'User not found'
        })
    }
})

app.post('/api/v1/content',loginVarification, async (req : CustomRequest,res) => {
    const { title, link, type } = req.body;

    try{
        await ContentModel.create({
            title,
            link,
            type,
            tags: [],
            userId: req.id
        })

        res.status(200).json({
            status: 'content created'
        })
    
    } catch(e) {
        res.status(400).json({
            status: 'create content fail'
        })
    }

})

app.get('/api/v1/content',loginVarification, async (req : CustomRequest,res) => {
    const userId = req.id;
    
    try {
        const content = await ContentModel.find({
            userId: userId
        }).populate('userId', 'username');

        res.status(200).json({
            content
        })
    } catch(e) {
        res.status(400).json({
            status: "content not found"
        })
    }
})

app.delete('/api/v1/content',loginVarification, async (req : CustomRequest,res) => {
    const contId = req.body.contentId;

    try{
        await ContentModel.deleteOne({
            _id: contId,
            userId: req.id
        })

        res.status(200).json({
            status: 'Delete Successfully'
        })
    } catch(e) {
        res.status(401).json({
            status: "Delete fail"
        })
    }
})

app.post('/api/v1/brain/share',loginVarification, async (req : CustomRequest,res) => {
    const {share} = req.body;

    if(share) {
        
        const existingLink = await LinkModel.findOne({
            userId: req.id
        })

        if(existingLink) {
            res.status(200).json({
                hash: existingLink
            })
            return
        } 

        const hash = random(10);

        await LinkModel.create({hash, userId: req.id});

        res.status(200).json({
            hash
        })

    } else {
        res.status(401).json({
            status: 'Share Fail'
        })
        return
    }

})

app.get('/api/v1/brain/:shareLink', async (req,res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({hash});
    if(!link) {
        res.status(404).json({
            status: "Invalid Share Link"
        });
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId
    });

    res.status(200).json({
        content
    });
})

async function main() {

    const MONGO_URL = process.env.MONGO_URL;

    if(!MONGO_URL) {
        console.log('mongo connection string is missing');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URL);
        app.listen(3000, () => {
            console.log('Server started at port 3000')
        });
    } catch(e) {
        console.log(e);
        process.exit(1);
    }
    
}

main();

function random(len: number) {
    let options = 'erdctfbghujmrdtfbghunjmrxctfvygbhun';
    let length = options.length;

    let ans = "";

    for(let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }

    return ans;
}