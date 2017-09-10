import { Subscription } from 'rxjs/Subscription';
import { AuthGuard } from './../guards/auth.guard';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-esquecisenha",
  templateUrl: "./esquecisenha.component.html",
  styleUrls: ["./esquecisenha.component.css"]
})
export class EsquecisenhaComponent implements OnInit, OnDestroy {

  @ViewChild("email") email;
  private subparams: any;
  subEnviarSenha: Subscription;
  form: FormGroup;
  processing = false;
  message;
  messageClass;
  priviousUrl;
  acessode;
  esqueciSenha: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private authGuard: AuthGuard
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      email: ["", Validators.required]
    });
  }
  disableForm() {
    this.form.controls["email"].disable();
  }

  enableForm() {
    this.form.controls["email"].enable();
  }

  ngOnInit() {
    this.email.nativeElement.focus();
  }

  onLoginSubmi() {
    let enviar = {
      email: this.form.controls["email"].value
    };
    this.subEnviarSenha = this.authService.enviarEmailSenha(enviar).subscribe(data => {

      if (!data.success) {
        this.message = data.message;
        this.messageClass = "alert alert-danger";
        this.processing = false;
        this.enableForm();
      } else {
        this.message = 'Obrigado! Você receberá um e-mail com o link e instruções pra criar uma nova senha';
        this.messageClass = 'alert alert-success';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subEnviarSenha) this.subEnviarSenha.unsubscribe();
  }
}
