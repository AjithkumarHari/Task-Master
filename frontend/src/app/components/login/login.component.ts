import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loginRequest } from 'src/app/state/user.action';
import { selectErrorMessage } from 'src/app/state/user.selector';
import { UserState } from 'src/app/state/user.state';
import { Credentials } from 'src/app/types/Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  errorMessage: any = "";

  constructor(
    private formBuilder : FormBuilder,
    private store: Store<UserState>,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
    })
  }

  onFormSubmit(){
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
    if(this.form.valid){
      const credentials: Credentials ={
        email : this.form.value.email, 
        password : this.form.value.password
      }
      this.store.dispatch(loginRequest({credentials}))
      this.store.pipe(select(selectErrorMessage)).subscribe((error) => this.errorMessage = error);
    }
  }
}
