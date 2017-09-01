import { AuthService } from "./../auth.service";
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('email') vEmail: ElementRef;
  @ViewChild('password') vPassword: ElementRef;
  private subparams: any;
  private subcheckemail: any;
  private subregister: any;
  private subqueryparams: any;

  form: FormGroup;
  processing = false;
  acessode;
  message: String;
  messageClass: String;
  emailValid;
  emailMessage;
  token;
  email;

  //TODO:
  // 4- O USUÁRIO FAZ O CADASTRO E O REGISTRO É DELETADO DA TABELA DE USUÁRIOS A CONVIDAR.


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.subparams = this.route.queryParams.subscribe(params => {
      //para fazer o registro através de email, é enviado o token e o e-mail.
      if (params["tk"]) {
        this.disableForm();
        this.processing = true;
        this.token = params["tk"];
        this.email = params["email"];
        this.form.controls["email"].setValue(this.email);
        this.form.controls["email"].disable();
        this.acessode = "";
        this.subcheckemail = this.authService
        .checkEmailUsuario(this.form.controls["email"].value)
        .subscribe(data => {
          if (!data.success) {
            this.message = 'Usuário já cadastrado. Redirecionando para a tela de login.';
            this.messageClass = "alert alert-success";
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 2000);
          }else{
            this.enableForm();
            this.emailValid = true;
            this.processing = false;
            this.vPassword.nativeElement.focus();
          }
        });
      }else{
        this.vEmail.nativeElement.focus();
      }
    });
    this.subparams = this.route.params.subscribe(params => {
      this.acessode = params["acessode"];
    });
  }

  createForm() {
    this.form = this.fb.group(
      {
        email: [
          "",
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ]
        ],
        password: ["", [Validators.required, Validators.minLength(5)]],
        password_confirm: ["", [Validators.required, Validators.minLength(5)]]
      },
      { validator: this.matchPassword("password", "password_confirm") }
    );
  }

  matchPassword(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { matchingPass: true };
      }
    };
  }

  disableForm() {
    this.form.controls["email"].disable();
    this.form.controls["password"].disable();
    this.form.controls["password_confirm"].disable();
  }

  enableForm() {
    if (!this.token) {
      this.form.controls["email"].enable();
    }
    this.form.controls["password"].enable();
    this.form.controls["password_confirm"].enable();
  }

  onRegister() {
    this.processing = true;
    this.disableForm();
    //usuário normal
    let tipo = 0;
    if (this.acessode === "empresa") {
      //quando o registro é feito por uma empresa
      tipo = 1;
    }
    const usuario = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      tipo: tipo,
      token: this.token
    };
    this.subregister = this.authService
      .registerUser(usuario)
      .subscribe(data => {
        this.message = data.message;
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.processing = false;
          this.enableForm();
        } else {
          this.messageClass = "alert alert-success";
          setTimeout(() => {
            //this.router.navigate(["/login", this.acessode]);
            this.router.navigate(["/login"]);
          }, 2000);
        }
      });
  }

  checkEmail() {
    this.subcheckemail = this.authService
      .checkEmailUsuario(this.form.controls["email"].value)
      .subscribe(data => {
        if (!data.success) {
          this.emailValid = false;
          this.emailMessage = data.message;
        } else {
          this.emailValid = true;
        }
      });
  }

  ngOnDestroy() {
    if (this.subparams) this.subparams.unsubscribe();
    if (this.subcheckemail) this.subcheckemail.unsubscribe();
    if (this.subregister) this.subregister.unsubscribe();
  }
}
