import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import { editProfileRequest } from 'src/app/state/login/login.action';
import { UserState } from 'src/app/state/user.state';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  _id: any;
  name: any;
  email: any;
  form!: FormGroup;
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private store: Store<UserState>,
  ){}

  ngOnInit(){
    this.name = this.activatedRoute.snapshot.paramMap.get('name')
    this.email = this.activatedRoute.snapshot.paramMap.get('email')
    this._id = this.activatedRoute.snapshot.paramMap.get('_id')
    this.form = this.formBuilder.group({
      name : new FormControl(this.name, [Validators.required, Validators.pattern("^[a-zA-Z]{3,15}$")]),
      email : new FormControl(this.email, [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,4}$")]),
      password : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      confPassword : new FormControl(null, [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")])
    })
  }

  onSubmit(){
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
    if(this.form.valid){
      if(this.form.value.password==this.form.value.confPassword){
        const user: User ={
          _id: this._id,
          name: this.form.value.name,
          email: this.form.value.email,
          password:  this.form.value.password
        }
        this.store.dispatch(editProfileRequest({user}))
      }else{
        this.errorMessage = 'Password Not Match'
        setTimeout(()=>this.errorMessage='',2000)
      }
    }
  }
} 
