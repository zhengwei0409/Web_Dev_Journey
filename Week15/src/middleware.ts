import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    id?: string;
}

export function loginVarification(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.token as string;
    // const token = Array.isArray(req.headers.token) ? req.headers.token[0] : req.headers.token; (better approach)
    const Secret = process.env.JWT_PASSWORD;


    if(!Secret) {
        console.log("Missing jwt secret");
        process.exit(1);
    }

    const verification = jwt.verify(token,Secret);

    

    if(verification) {
        req.id = verification.indexOf;
        next();
    } else {
        res.status(403).json({
            status: 'You are not signin'
        })
    }
}