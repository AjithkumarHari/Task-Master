import { Action, createReducer, on } from "@ngrx/store";
import { loginSuccess, loginFailure ,signupSuccess, signupFailure, editProfileSuccess, browserReload} from "./login.action";
import { UserState } from "../user.state";

export const InitialState: UserState =  {
    UserToken: '',
    errorMessage: undefined
}

const _authReducer = createReducer(
    InitialState,
    on(browserReload,(state, {userToken, userData})=>{
        return {
            ...state,
            UserToken : userToken,
            userData: userData,
            errorMessage: undefined
        }
    }),
    on(editProfileSuccess,(state, { userData})=>{
        return {
            ...state,
            userData: userData,
            errorMessage: undefined
        }
    }),
    on(loginSuccess,(state, {userToken, userData})=>{
        return {
            ...state,
            UserToken : userToken,
            userData: userData,
            errorMessage: undefined
        }
    }),
    on(loginFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    }),
    on(signupSuccess,(state, {userData})=>{
        return {
            ...state,
            ...userData,
            errorMessage: undefined
        }
    }),
    on(signupFailure,(state,{error})=>{
        return {
            ...state,
            UserToken: " ",
            errorMessage: error.error.message
        }
    }),
) 


export function authReducer(state: UserState = InitialState, action: Action){
    return _authReducer(state,action)
}
