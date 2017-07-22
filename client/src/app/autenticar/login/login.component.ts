import { AuthGuard } from './../guards/auth.guard';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  processing = false;
  message;
  messageClass;  
  priviousUrl;

  constructor(private fb: FormBuilder,
              private authService:AuthService,
              private router: Router,
              private authGuard:AuthGuard) { 
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({      
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
 disableForm(){
   this.form.controls["email"].disable();
   this.form.controls["password"].disable();   
 }

 enableForm(){
   this.form.controls["email"].enable();
   this.form.controls["password"].enable();
 }

  onLoginSubmi(){
    this.processing = true;
    this.disableForm();
    const user = {
      email:this.form.controls["email"].value,
      password:this.form.controls["password"].value
    };
    this.authService.login(user).subscribe(data => {
      this.message = data.message;
      if (!data.success){        
        this.messageClass = 'alert alert-danger';        
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';                
        this.authService.storeUserData(data.token,data.user);
        setTimeout(()=>{
          if (this.priviousUrl){
            this.router.navigate([this.priviousUrl]);
          }else {
            this.router.navigate(['/home']);
          }
        },2000);
      }
    })  
  }



  ngOnInit() {
    if (this.authGuard.redirectUrl){
      this.message = 'Você deve estar logado para acessar essa página';
      this.messageClass = 'alert alert-danger';
      this.priviousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }



}
