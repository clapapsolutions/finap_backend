import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import {NextFunction, Request, Response} from 'express';

// Augment the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const protect = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    let token


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded:any = jwt.verify(token, process.env.JWT_SECRET!)
            req.user = await User.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized, Token Failed to Authenticate!')
        }
    }

    if (!token) {
        throw new Error('Not Authorized !!, no Token Provided!')
    }

})

export { protect }