import USER from "../models/userModel";
import { User } from "../../../types/User";
import mongoose from "mongoose";

export const userRepositoryMongoDB = () => {

    const getUserById = async (id : string) => {
        return await USER.findById(id).select('-password');
    }
    
    const getUserByEmail = async (email : string): Promise<User|null> => {
        return await USER.findOne( {email} );
    }
    
    const addUser = async (user : User) => {
        return await USER.create(user);
    }
    
    const updateUser =async (user: any) => {
        return await USER.updateOne(
            { _id: new mongoose.Types.ObjectId(user._id) },
            { $set: { name: user.name, email: user.email } }
        );

    }

    return {
        getUserByEmail,
        getUserById,
        addUser,
        updateUser,
    };
    
}

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;