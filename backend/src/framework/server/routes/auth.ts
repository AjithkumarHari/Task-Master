import express from "express";
import authController from "../../../adaptor/controllers/authController";
import { userDbRepository } from "../../../application/repository/userDbRepository";
import { userRepositoryMongoDB } from "../../database/repository/userDbRepository";
import { authServiceInterface } from "../../../application/service/authServiceInterface";
import { authService } from "../../service/authService";
 

const authRouter = () => {
    const route = express.Router();

    const controller = authController(
        userDbRepository,
        userRepositoryMongoDB,
        authServiceInterface,
        authService,
    );

    route.post('/user-login',controller.loginUser);

    route.post('/user-signup',controller.registerUser);

    return route;
}

export default authRouter; 