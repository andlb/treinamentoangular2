import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      email:['',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),      
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]],                
      password:['',[Validators.required,Validators.minLength(5)]],
      password_confirm:['',[Validators.required,Validators.minLength(5)]]
    },{validator:this.matchPassword('password','password_confirm')}
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
