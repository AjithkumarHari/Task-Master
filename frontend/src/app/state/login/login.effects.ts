import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { loginFailure,
    loginRequest,
    loginSuccess,
    signupRequest,
    signupFailure,
    signupSuccess,
    editProfileRequest,
    editProfileSuccess
    } from "./login.action";
// import { UserService } from "../../services/user.service";
import { AuthService } from "src/app/services/auth-service.service";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private authService : AuthService,
        // private userService: UserService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginRequest),
            switchMap(({ credentials }) =>
                this.authService.login(credentials).pipe(
                    map(res=>{
                        let response : any = res;
                        if(response.status=='success'){
                            localStorage.setItem('user-token',response.token)
                            localStorage.setItem('user-data',JSON.stringify(response.userData))
                            return loginSuccess({userToken : response.token, userData: response.userData})
                        }
                        else{
                            return loginFailure({ error : response.error.error  })
                        }
                    }),
                    catchError(error => of (loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginSuccess),
            tap(( )=>{
                this.router.navigate(['/']);  
            })
        ), {
            dispatch : false
        }
    );


    loginFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginFailure),
            tap(()=>{
                this.router.navigate(['/auth/login'])
            })
        ), {
            dispatch: false
        }
    );


    signup$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupRequest),
            switchMap(({ user }) =>
                this.authService.signup(user).pipe(
                    map(res=>{
                        let response : any = res;
                        if(response.status=='success'){
                            localStorage.setItem('user-token',response.token)
                            localStorage.setItem('user-data',JSON.stringify(response.userData))
                            return signupSuccess({userData : response.userData})
                        }else{
                            return signupFailure({ error : response.error.error  })
                        }
                    }),
                    catchError(error => of (signupFailure({ error })))
                )
            )
        )
    );

    signupSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupSuccess),
            tap(()=>{
                console.log('signup sussc');
                
                this.router.navigate(['/']);
            })
        ), {
            dispatch : false
        }
    );

    signupFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(signupFailure),
            tap(()=>{
                this.router.navigate(['/auth/signup'])
            })
        ), {
            dispatch: false
        }
    );


}