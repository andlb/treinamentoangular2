import { AuthGuard } from './../guards/auth.guard';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subparams: any;
  form: FormGroup;
  processing = false;
  message;
  messageClass;
  priviousUrl;
  acessode;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private authGuard: AuthGuard) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  disableForm() {
    this.form.controls["email"].disable();
    this.form.controls["password"].disable();
  }

  enableForm() {
    this.form.controls["email"].enable();
    this.form.controls["password"].enable();
  }

  onLoginSubmi() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.controls["email"].value,
      password: this.form.controls["password"].value
    };
    this.authService.login(user).subscribe(data => {
      this.message = data.message;
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.authService.storeUserData(data.token, data.user);
        console.log(data)
        setTimeout(() => {
          if (this.priviousUrl) {
            this.router.navigate([this.priviousUrl]);
          } else {
            if (data.user.tipo === 0)  {
              if (!data.user.cadastrocompleto){
                this.router.navigate(['/profile',data.user.usuarioid]);
              }else{
                this.router.navigate(['/areaproprietario']);
              }

            } else {
              if ((data.user.tipo === 1) && (!data.user.cadastrocompleto)) {
                this.router.navigate(['/empresa']);
              } else {
                ///TODO: depende do tipo do usuário.
                this.router.navigate(['/home']);
              }
            }
          }
        }, 2000);
      }
    })
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.message = 'Você deve estar logado para acessar essa página';
      this.messageClass = 'alert alert-danger';
      this.priviousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
    this.subparams = this.route.params.subscribe(
      (params) => {
        this.acessode = params['acessode'];
      }
    );
  }

  ngOnDestroy() {
    this.subparams.unsubscribe();
  }



}
