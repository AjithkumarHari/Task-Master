import { HttpStatus } from "../../../types/HttpStatus";
import { User } from "../../../types/User";
import AppError from "../../../util/appError";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";

export const updateUser = async (
    user: User, 
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
    ) => {
    try {
            console.log(user);
            
            if(user.password && user._id){
            user.password = await authService.encryptPassword(user.password);
            await userRepository.updateUser(user);
            const newUser = await userRepository.getUserById(user._id)
            if(newUser){
            console.log(newUser);
            
            return {status: "success", message:"user Update success", userData:{_id: newUser._id, name: newUser.name, email: newUser.email}};}
        }
    } catch (AppError) { 
        return AppError;
    }
}