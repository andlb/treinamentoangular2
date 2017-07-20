import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('/^[a-zA-Z0-9]+$/')]],
      email:['',Validators.required],
      password:['',Validators.required,Validators.minLength(5)],
      password_confirm:['',Validators.required,Validators.minLength(5)]      
    },{Validator:this.matchPassword('password','password_confirm')}
    )
  }

  matchPassword(password,confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value){
        return null;
      }else {
        return {'matchingPass':true};
      }
    }
  }
  onRegister(){
    console.log(this.form);
  }

  ngOnInit() {}
}
