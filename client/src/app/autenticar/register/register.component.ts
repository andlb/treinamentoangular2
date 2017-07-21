import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  processing = false;
  message:String;
  messageClass:String;
  emailValid;
  emailMessage;

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router: Router) { 
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
  
 disableForm(){
   this.form.controls["email"].disable();
   this.form.controls["password"].disable();
   this.form.controls["password_confirm"].disable();
 }

 enableForm(){
   this.form.controls["email"].enable();
   this.form.controls["password"].enable();
   this.form.controls["password_confirm"].enable();
   
 }

  onRegister(){
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get("email").value,
      password: this.form.get("password").value
    }    
    this.authService.registerUser(user).subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;      
        this.enableForm();
      }else {
        this.messageClass = 'alert alert-success'; 
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000)
      }
    });    
  }

  checkEmail(){    
    this.authService.checkEmail(this.form.controls["email"].value).subscribe(data => {
      if (!data.success) {
        this.emailValid=false;
        this.emailMessage= data.message;
      }else {
        this.emailValid=true;
      }
    });    
  }

  ngOnInit() {}
}
