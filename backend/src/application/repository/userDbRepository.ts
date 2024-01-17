import { UserRepositoryMongoDB } from "../../framework/database/repository/userDbRepository";
import { User } from "../../types/User";

export const userDbRepository = (repository : ReturnType<UserRepositoryMongoDB>) => {

    const getUserById = async (id:string) => await repository.getUserById(id);
    
    const addUser = async (user: User) => await repository.addUser(user);
    
    const getUserByEmail = async (email: string) => await repository.getUserByEmail(email);

    const updateUser = async (user: User) => await repository.updateUser(user);

    return {
        getUserByEmail,
        addUser,
        getUserById,
        updateUser,
    }
}

export type UserDbInterface = typeof userDbRepository;