import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../types/HttpStatus";
import AppError from "../../../util/appError";
import { authService } from "../../service/authService";

const userAuthMiddle = (req: Request, res: Response ,next: NextFunction) => { 

    try {        
        let token: string | null = "";
        if(req.headers.authorization&& req.headers.authorization.startsWith('User-Bearer')){  
            token = req.headers.authorization.split(' ')[1]; 
        }
        if(!token){
            throw new AppError("Token not found",HttpStatus.UNAUTHORIZED)
        }
        try{
            authService().verifyToken(token)
            next()
        }catch(err){
            throw new AppError("UnAuthorized User",HttpStatus.UNAUTHORIZED)
        }
        
    } catch (error) {
        console.log(error,'error from middleware');
        
    }
    
   
}

export default userAuthMiddle;