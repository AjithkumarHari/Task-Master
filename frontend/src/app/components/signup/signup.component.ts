import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { signupRequest } from 'src/app/state/user.action';
import { selectErrorMessage } from 'src/app/state/user.selector';
import { UserState } from 'src/app/state/user.state';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage: any = "";
  form !: FormGroup;
  loggedIn!: boolean;

  constructor( private formBuilder : FormBuilder, private store: Store<UserState> ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    })
  }

  onFormSubmit(){
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
    if(this.form.valid){
      const user : User ={
        name : this.form.value.name,
        email : this.form.value.email,
        password : this.form.value.password,
      }
      this.store.dispatch(signupRequest({user}))
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => this.errorMessage = error); 
    }
  }
}
