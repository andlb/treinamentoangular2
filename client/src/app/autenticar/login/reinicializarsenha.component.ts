import { Subscription } from "rxjs/Subscription";
import { AuthService } from "./../auth.service";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-reinicializarsenha",
  templateUrl: "./reinicializarsenha.component.html",
  styleUrls: ["./reinicializarsenha.component.css"]
})
export class ReinicializarsenhaComponent implements OnInit {
  @ViewChild("password") vPassword: ElementRef;

  form: FormGroup;
  processing = false;
  acessode;
  message: String;
  messageClass: String;
  token;
  subparams: Subscription;
  subAlteraSenha: Subscription;

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
        this.token = params["tk"];
      }
    });
  }

  createForm() {
    this.form = this.fb.group(
      {
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
    this.form.controls["password"].disable();
    this.form.controls["password_confirm"].disable();
  }

  enableForm() {
    this.form.controls["password"].enable();
    this.form.controls["password_confirm"].enable();
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();
    //usuário normal
    let tipo = 0;
    const usuario = {
      password: this.form.get("password").value,
      token: this.token
    };
    this.subAlteraSenha = this.authService
      .alterarSenha(usuario)
      .subscribe(data => {
        this.message = data.message;
        if (!data.success) {
          this.messageClass = "alert alert-danger";
          this.processing = false;
          this.enableForm();
        } else {
          this.messageClass = 'alert alert-success';
          setTimeout(() => {
            this.router.navigate(['/login']);
          },2000);
        }
      });
  }

  ngOnDestroy() {
    if (this.subAlteraSenha) this.subAlteraSenha.unsubscribe();
    if (this.subparams) this.subparams.unsubscribe();
  }
}
