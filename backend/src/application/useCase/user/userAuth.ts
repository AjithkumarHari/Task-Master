import { User } from "../../../types/User";
import { UserDbInterface } from "../../repository/userDbRepository";
import { AuthServiceInterface } from "../../service/authServiceInterface";
import AppError from "../../../util/appError"; 
import { HttpStatus } from "../../../types/HttpStatus";
 
export const userSignup = async (
    user: User,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => { 
    try{
        user.email = user.email.toLowerCase();
        const isUserExist = await userRepository.getUserByEmail(user.email)
        if(isUserExist){
            throw new AppError("email already exits",HttpStatus.UNAUTHORIZED);
        }
        if(user.password)
        user.password = await authService.encryptPassword(user.password);
        const res = await userRepository.addUser(user);
        console.log('res',res);
        const {_id, name, email} = res;
        const token = authService.generateToken(_id.toString());
        return {"status": "success", token, userData:{_id, name, email}};
    }catch(AppError){
        return AppError;
    }    
}

export const userLogin = async (
    userEmail: string,
    userPassword: string,
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>,
) => {
    try{
        const user: User | null = await userRepository.getUserByEmail(userEmail);
        if(!user){
            throw new AppError("User not exists",HttpStatus.UNAUTHORIZED);
        }
        else{
            const {_id, name, email ,password } = user;
            if(password){
                const isPasswordCorrect = await authService.comparePassword(userPassword, password);
                if(!isPasswordCorrect){
                    throw new AppError("Password does not match",HttpStatus.UNAUTHORIZED);
                }
            }
            if(_id){
                const token = authService.generateToken(_id.toString());
                return {"status": "success", token, userData:{_id, name, email}};
            }
        }
    }catch(AppError){
        return AppError;
    }
}