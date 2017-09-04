import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../autenticar/auth.service';
///TODO:formatar cep
///TODO: Padronizar estado.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  form: FormGroup;
  usuario;
  messageClass;
  message;
  processing = false;
  subPesquisa: Subscription;
  subParams: Subscription;
  mostrarbotaovoltar = true;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.processing = true;
    this.subPesquisa = this.authService.getMeuUsuario().subscribe(data => {
      if (!this.authService.verTokenValido(data.tokeninvalido) ){
        this.message = 'Usuário desconectado. Por favor, logue novamente.';
        this.messageClass = "alert alert-danger";
        setTimeout(() => {
          this.router.navigate(["/login"]);
        }, 2000);
        return;
      }
      this.usuario = data.usuario;
      this.preencheCampos()
      this.processing = false;
    });
    this.subParams = this.route.params.subscribe((params) => {
      if (params.local === 'login') {
        this.mostrarbotaovoltar=false;
      }
    });
    this.createForm();
  }

  desabilitaCampos(){
    this.form.controls["nome"].enable();
    this.form.controls["cpf"].enable();
    this.form.controls["sexo"].enable();
    this.form.controls["dtnascimento"].enable();
    this.form.controls["email"].enable();
    this.form.controls["bairro"].enable();
    this.form.controls["cidade"].enable();
    this.form.controls["estado"].enable();
    this.form.controls["cep"].enable();
  }

  habilitaCampos(){
    this.form.controls["nome"].disable();
    this.form.controls["cpf"].disable();
    this.form.controls["sexo"].disable();
    this.form.controls["dtnascimento"].disable();
    this.form.controls["email"].disable();
    this.form.controls["bairro"].disable();
    this.form.controls["cidade"].disable();
    this.form.controls["estado"].disable();
    this.form.controls["cep"].disable();
  }


  preencheCampos(){
    this.form.controls["nome"].setValue(this.usuario.nome);
    this.form.controls["cpf"].setValue(this.usuario.cpf);
    this.form.controls["sexo"].setValue(this.usuario.sexo);
    this.form.controls["dtnascimento"].setValue(this.usuario.dtnascimento);
    this.form.controls["email"].setValue(this.usuario.email);
    this.form.controls["bairro"].setValue(this.usuario.bairro);
    this.form.controls["cidade"].setValue(this.usuario.cidade);
    this.form.controls["estado"].setValue(this.usuario.estado);
    this.form.controls["cep"].setValue(this.usuario.cep);
  }

  createForm() {
    this.form = this.formBuilder.group({
      nome:  ["", Validators.required],
      cpf: ["", Validators.required],
      sexo: '',
      dtnascimento:[
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
          )
        ]
      ],
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
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    });
  }

  updateProfile() {
    this.processing = true;
    this.desabilitaCampos();
    const usuario = {
      usuarioid:this.usuario.usuarioid,
      nome: this.form.get("nome").value,
      cpf: this.form.get("cpf").value,
      sexo: this.form.get("sexo").value,
      dtnascimento: this.form.get("dtnascimento").value,
      email: this.form.get("email").value,
      bairro: this.form.get("bairro").value,
      cidade: this.form.get("cidade").value,
      estado: this.form.get("estado").value,
      cep: this.form.get("cep").value,
    }
    this.authService.atualizaUsuario(usuario).subscribe((data) => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.habilitaCampos();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          //TODO: voltar para a tela de home.
          this.onVoltar();
        }, 2000);
      }
    });
  }

  onVoltar(){
    this.router.navigate(['/areaproprietario']);
  }

}
