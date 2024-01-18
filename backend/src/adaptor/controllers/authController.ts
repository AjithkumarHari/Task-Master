import { Request, Response } from "express";
import { UserDbInterface } from "../../application/repository/userDbRepository";
import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { AuthServiceInterface } from "../../application/service/authServiceInterface";
import { AuthService } from "../../framework/service/authService";
import AppError from "../../util/appError";
import { userLogin, userSignup } from "../../application/useCase/user/userAuth";
import { User } from "../../types/User";

const authController = (
    userDbRepository: UserDbInterface,
    userDbRepositoryImp: UserRepositoryMongoDB,
    authServiceInterface: AuthServiceInterface,
    authServiceImp: AuthService,
) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImp());
    const authService = authServiceInterface(authServiceImp());

    const registerUser = async (req: Request, res: Response) => {

        const user: User = req.body;
        const result: any = await userSignup(user, dbUserRepository, authService);
        console.log(result);
        
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result
            })
        } else {
            res.json({
                ...result,
                message: "successfully added new user",
            });
        }
    }

    const loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result: any = await userLogin(email, password, dbUserRepository, authService);
        if (result instanceof AppError) {
            res.status(result.errorCode).json({
                ...result,
            })
        }  else {
            res.json({
                message: "user login success",
                ...result
            });
        }
    }
    
    return {
        registerUser,
        loginUser
    }

}

export default authController;