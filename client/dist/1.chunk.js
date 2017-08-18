webpackJsonp([1],{

/***/ "../../../../../src/app/oficina/oficina-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autenticar_guards_notAuth_guard__ = __webpack_require__("../../../../../src/app/autenticar/guards/notAuth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__ = __webpack_require__("../../../../../src/app/autenticar/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__oficinacadastro_oficinacadastro_component__ = __webpack_require__("../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__oficinalist_oficinalist_component__ = __webpack_require__("../../../../../src/app/oficina/oficinalist/oficinalist.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__survey_survey_component__ = __webpack_require__("../../../../../src/app/oficina/survey/survey.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OficinaRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var oficinaRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__oficinalist_oficinalist_component__["a" /* OficinalistComponent */] },
    { path: 'lista', component: __WEBPACK_IMPORTED_MODULE_5__oficinalist_oficinalist_component__["a" /* OficinalistComponent */] },
    { path: 'lista/:edit', component: __WEBPACK_IMPORTED_MODULE_5__oficinalist_oficinalist_component__["a" /* OficinalistComponent */] },
    { path: 'cadastro', component: __WEBPACK_IMPORTED_MODULE_4__oficinacadastro_oficinacadastro_component__["a" /* OficinacadastroComponent */] },
    { path: 'cadastro/:id', component: __WEBPACK_IMPORTED_MODULE_4__oficinacadastro_oficinacadastro_component__["a" /* OficinacadastroComponent */] },
    { path: 'survey/:id', component: __WEBPACK_IMPORTED_MODULE_6__survey_survey_component__["a" /* SurveyComponent */] }
];
var OficinaRoutingModule = (function () {
    function OficinaRoutingModule() {
    }
    return OficinaRoutingModule;
}());
OficinaRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */].forChild(oficinaRoutes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_0__autenticar_guards_notAuth_guard__["a" /* NoAuthGuard */]
        ]
    })
], OficinaRoutingModule);

//# sourceMappingURL=oficina-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/oficina/oficina.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__survey_survey_component__ = __webpack_require__("../../../../../src/app/oficina/survey/survey.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__oficinacadastro_oficinacadastro_component__ = __webpack_require__("../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__oficinalist_oficinalist_component__ = __webpack_require__("../../../../../src/app/oficina/oficinalist/oficinalist.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__oficina_routing_module__ = __webpack_require__("../../../../../src/app/oficina/oficina-routing.module.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OficinaModule", function() { return OficinaModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var OficinaModule = (function () {
    function OficinaModule() {
    }
    return OficinaModule;
}());
OficinaModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__oficinacadastro_oficinacadastro_component__["a" /* OficinacadastroComponent */],
            __WEBPACK_IMPORTED_MODULE_5__oficinalist_oficinalist_component__["a" /* OficinalistComponent */],
            __WEBPACK_IMPORTED_MODULE_3__survey_survey_component__["a" /* SurveyComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__oficina_routing_module__["a" /* OficinaRoutingModule */]
        ]
    })
], OficinaModule);

//# sourceMappingURL=oficina.module.js.map

/***/ }),

/***/ "../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"page-header\">Cadastro veículos</h3>\r\n<div class=\"row show-hide-message\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{message}}\r\n  </div>\r\n</div>\r\n<div class=\"container\">\r\n  <form class=\"form-horizontal\" [formGroup]=\"form\" (submit)=\"enviaDados()\">\r\n    <div class=\"form-group\">\r\n      <div class=\"col-lg-11 col-lg-offset-1\">\r\n        <button [disabled]=\"!form.valid || processing\" type=\"submit\" class=\"btn btn-success\">{{(!edit) ? 'Incluir' : 'Salvar' }}</button>\r\n        <button *ngIf=\"(edit)\" type=\"button\" class=\"btn btn-danger\" (click)=\"onDeletar()\">Deletar</button>\r\n        <button *ngIf=\"(!edit)\" type=\"button\" class=\"btn btn-warning\" (click)=\"onLimpar()\">Limpar</button>\r\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"onVoltar()\">Voltar</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"placa\" class=\"col-lg-1 control-label\">Placa</label>\r\n      <div class=\"col-lg-2\">\r\n        <div [ngClass]=\"{'has-error':((form.controls.placa.touched) &&  (form.controls.placa.errors)), 'has-success': !form.controls.placa.errors }\">\r\n          <input type=\"text\" class=\"form-control\" autofocus #placa id=\"placa\" name=\"placa\" formControlName=\"placa\" placeholder=\"*Placa do veículo\"\r\n            (blur)=\"onPesquisarPlaca()\">\r\n          <ul class=\"help-block\">\r\n            <li *ngIf=\"form.controls.placa.touched && form.controls.placa.errors?.required\">Informe a placa</li>\r\n            <li *ngIf=\"form.controls.placa.touched && form.controls.placa.errors?.pattern\">Placa inválida: AAA-9999</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <label for=\"marca\" class=\"col-lg-2 control-label\">Marca</label>\r\n      <div class=\"col-lg-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"marca\" name=\"marca\" formControlName=\"marca\" placeholder=\"*Marca do veículo\">\r\n      </div>\r\n      <label for=\"modelo\" class=\"col-lg-1 control-label\">Modelo</label>\r\n      <div class=\"col-lg-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"modelo\" name=\"modelo\" formControlName=\"modelo\" placeholder=\"*Modelo do veiculo\">\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"ano\" class=\"col-lg-1 control-label\">Ano</label>\r\n      <div class=\"col-lg-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"ano\" name=\"ano\" formControlName=\"ano\" placeholder=\"*ano do veiculo\">\r\n      </div>\r\n      <label for=\"anomodelo\" class=\"col-lg-2 control-label\">Ano modelo</label>\r\n      <div class=\"col-lg-2 col-lg-off-8\">\r\n        <input type=\"text\" class=\"form-control\" id=\"anomodelo\" name=\"anomodelo\" formControlName=\"anomodelo\" placeholder=\"*Ano modelo\">\r\n      </div>\r\n      <label for=\"quilometragem\" class=\"col-lg-1 control-label\">KM</label>\r\n      <div class=\"col-lg-2 col-lg-off-8\">\r\n        <div [ngClass]=\"{'has-error':form.controls.quilometragem.touched &&  (form.controls.quilometragem.errors), 'has-success': !form.controls.quilometragem.errors }\">\r\n          <input #quilometragem type=\"text\" class=\"form-control\" id=\"quilometragem\" name=\"quilometragem\" formControlName=\"quilometragem\" placeholder=\"*Quilometragem\">\r\n          <ul class=\"help-block\">\r\n            <li *ngIf=\"form.controls.quilometragem.touched && form.controls.quilometragem.errors?.required \">Informe quilometragem</li>\r\n            <li *ngIf=\"form.controls.quilometragem.touched && form.controls.quilometragem.errors?.pattern \">Campo numérico </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"cpf\" class=\"col-lg-1 control-label\">CPF</label>\r\n      <div class=\"col-lg-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"cpf\" name=\"cpf\" formControlName=\"cpf\" placeholder=\"*CPF do proprietário\">\r\n      </div>\r\n      <label for=\"nome\" class=\"col-lg-2 control-label\">Nome</label>\r\n      <div class=\"col-lg-6\">\r\n        <div [ngClass]=\"{'has-error':form.controls.nome.touched &&  (form.controls.nome.errors), 'has-success': !form.controls.nome.errors }\">\r\n          <input type=\"text\" class=\"form-control\" id=\"nome\" name=\"nome\" formControlName=\"nome\" placeholder=\"*Nome do proprietário\">\r\n          <ul class=\"help-block\">\r\n            <li *ngIf=\"form.controls.nome.touched && form.controls.nome.errors?.required \">Informe a data de nascimento</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"dtnascimento\" class=\"col-lg-1 control-label\">Dt. Nasc.</label>\r\n      <div class=\"col-lg-2\">\r\n        <div [ngClass]=\"{'has-error':form.controls.dtnascimento.touched &&  (form.controls.dtnascimento.errors), 'has-success': !form.controls.dtnascimento.errors }\">\r\n          <input type=\"text\" class=\"form-control\" id=\"dtnascimento\" name=\"dtnascimento\" formControlName=\"dtnascimento\" placeholder=\"*Data nasc. do proprietário\">\r\n          <ul class=\"help-block\">\r\n            <li *ngIf=\"form.controls.dtnascimento.touched && form.controls.dtnascimento.errors?.required \">Informe a data de nascimento</li>\r\n            <li *ngIf=\"((form.controls.dtnascimento.touched) && ((form.controls.dtnascimento.errors?.pattern) || (form.controls.dtnascimento.errors?.maxlength || form.controls.dtnascimento.errors?.minlength)))\">Data inválida</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <label for=\"email\" class=\"col-lg-2 control-label\">E-mail</label>\r\n      <div class=\"col-lg-4\">\r\n        <div [ngClass]=\"{'has-error':form.controls.email.touched &&  (form.controls.email.errors), 'has-success': !form.controls.email.errors }\">\r\n          <input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"*E-mail do proprietário\">\r\n          <ul class=\"help-block\">\r\n            <li *ngIf=\"form.controls.email.touched && form.controls.email.errors?.required \">Informe o e-mail</li>\r\n            <li *ngIf=\"((form.controls.email.touched) && (form.controls.email.errors?.maxlength || form.controls.email.errors?.minlength))\">Caracters mínimo: 3, máximo: 15</li>\r\n            <li *ngIf=\"form.controls.email.touched && form.controls.email.errors?.pattern\">Este e-mail deve ser válido</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"bs-example\" data-example-id=\"table-within-panel\">\r\n      <div class=\"panel panel-success\">\r\n        <div class=\"panel-heading\">Serviços</div>\r\n      </div>\r\n      <div class=\"panel-body\" formArrayName=\"servicosForm\">\r\n        <div class=\"panel panel-success\"\r\n        *ngFor=\"let control of form.controls['servicosForm'].controls; let i = index\"\r\n        [formGroupName]=\"i\"\r\n        >\r\n          <div class=\"panel-heading\">\r\n            <h3 class=\"panel-title\">\r\n              <div class=\"checkbox\">\r\n                <label>\r\n                  <input type=\"checkbox\" formControlName=\"selecionado\" > {{control.controls.descricao.value}}\r\n                </label>\r\n              </div>\r\n            </h3>\r\n          </div>\r\n          <div class=\"panel-body\">\r\n            <input class=\"form-control\" id=\"observacao\" name=\"observacao\" formControlName=\"observacao\" type=\"text\" value=\"\" placeholder=\"Observação sobre {{control.controls.descricao.value}}\" >\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <div class=\"col-lg-11 col-lg-offset-1\">\r\n        <button [disabled]=\"!form.valid || processing\" type=\"submit\" class=\"btn btn-success\">{{(!edit) ? 'Incluir' : 'Editar' }}</button>\r\n        <button *ngIf=\"(edit)\" type=\"button\" class=\"btn btn-danger\" (click)=\"onDeletar()\">Deletar</button>\r\n        <button *ngIf=\"(!edit)\" type=\"button\" class=\"btn btn-warning\" (click)=\"onLimpar()\">Limpar</button>\r\n        <button type=\"button\" class=\"btn btn-info\" (click)=\"onVoltar()\">Voltar</button>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cadastro_empresa_empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__oficina_service__ = __webpack_require__("../../../../../src/app/oficina/oficina.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OficinacadastroComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OficinacadastroComponent = (function () {
    function OficinacadastroComponent(formBuilder, oficinaService, empresaService, route, router) {
        this.formBuilder = formBuilder;
        this.oficinaService = oficinaService;
        this.empresaService = empresaService;
        this.route = route;
        this.router = router;
        this.edit = false;
        this.processing = false;
        this.servicos = [];
        this.servicosRealizados = [];
    }
    OficinacadastroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subsPesquisaAtendimento = this.route.params.subscribe(function (params) {
            _this.atendimentoid = params.id;
            if (_this.atendimentoid) {
                _this.processing = true;
                _this.subsPesquisa = _this.oficinaService
                    .getAtendimento(_this.atendimentoid)
                    .subscribe(function (data) {
                    _this.edit = true;
                    _this.oficinaService.setOrdemservicoid(_this.atendimentoid);
                    _this.oficinaService.setVeiculo(data.veiculo);
                    _this.oficinaService.setProprietario(data.proprietario);
                    _this.servicos = data.servicos;
                    _this.servicosRealizados = data.servicorealizado;
                    _this.preencheFormulario();
                    _this.adicionarServicoForm();
                    _this.desabilitaPlaca();
                    _this.processing = false;
                });
            }
            else {
                var empresaid = _this.oficinaService.empresaid;
                if (!empresaid) {
                    _this.messageClass = "alert alert-danger";
                    _this.message = "Empresa não cadastrada para o usuário";
                }
                _this.processing = true;
                _this.subEmpresa = _this.empresaService
                    .getEmpresa(empresaid)
                    .subscribe(function (data) {
                    _this.message = "";
                    if (!data) {
                        _this.messageClass = "alert alert-danger";
                        _this.message = "Empresa não encontrada";
                    }
                    if (!data.success) {
                        _this.messageClass = "alert alert-danger";
                        _this.message = "Empresa não encontrada";
                    }
                    if (data.success) {
                        _this.empresa = data.empresa;
                        _this.servicos = data.servicos;
                        _this.servicosRealizados = [];
                        _this.adicionarServicoForm();
                        _this.placa.nativeElement.focus();
                        _this.processing = false;
                    }
                });
            }
        });
        this.createForm();
    };
    //TODO: Verificar o problema da PLACA.
    OficinacadastroComponent.prototype.onPesquisarPlaca = function () {
        var _this = this;
        if (this.processing || this.edit)
            return;
        var placa = this.form.controls["placa"].value;
        placa = placa.toUpperCase();
        if (placa) {
            this.processing = true;
            this.subPlaca = this.oficinaService
                .pesquisaVeiculo(placa)
                .subscribe(function (data) {
                if (!data) {
                    _this.messageClass = "alert alert-danger";
                    _this.message = "Erro desconhecido ao tentar realizar a pesquisa";
                }
                if (!data.success) {
                    _this.messageClass = "alert alert-danger";
                    _this.message = data.message;
                }
                _this.oficinaService.setVeiculo(data.veiculo);
                _this.oficinaService.setProprietario(data.proprietario);
                _this.preencheFormulario();
                _this.processing = false;
                _this.quilometragem.nativeElement.focus();
            });
        }
    };
    OficinacadastroComponent.prototype.ngOnDestroy = function () {
        if (this.subEnviar)
            this.subEnviar.unsubscribe();
        if (this.subEmpresa)
            this.subEmpresa.unsubscribe();
        if (this.subPlaca)
            this.subPlaca.unsubscribe();
        if (this.subsPesquisa)
            this.subsPesquisa.unsubscribe();
        if (this.subsPesquisaAtendimento)
            this.subsPesquisaAtendimento.unsubscribe();
    };
    OficinacadastroComponent.prototype.preencheFormulario = function () {
        var veiculo = this.oficinaService.getVeiculo();
        var proprietario = this.oficinaService.getProprietario();
        var servico = this.oficinaService.getServicosRealizado();
        this.form.controls["placa"].setValue(veiculo.placa);
        this.form.controls["marca"].setValue(veiculo.marca);
        this.form.controls["modelo"].setValue(veiculo.modelo);
        this.form.controls["ano"].setValue(veiculo.ano);
        this.form.controls["anomodelo"].setValue(veiculo.anomodelo);
        this.form.controls["cpf"].setValue(proprietario.cpf);
        this.form.controls["nome"].setValue(proprietario.nome);
        if (proprietario.email) {
            this.form.controls["email"].disable();
        }
        this.form.controls["email"].setValue(proprietario.email);
        this.form.controls["dtnascimento"].setValue(proprietario.datanascimento);
        if (this.edit) {
            this.form.controls["quilometragem"].setValue(veiculo.quilometragem);
            this.quilometragem.nativeElement.focus();
        }
    };
    OficinacadastroComponent.prototype.desabilitaPlaca = function () {
        this.form.controls["placa"].disable();
    };
    OficinacadastroComponent.prototype.habilitaPlaca = function () {
        this.form.controls["placa"].enable();
    };
    OficinacadastroComponent.prototype.desabilitaCampos = function () {
        this.processing = true;
        this.form.controls["marca"].disable();
        this.form.controls["modelo"].disable();
        this.form.controls["ano"].disable();
        this.form.controls["anomodelo"].disable();
        this.form.controls["quilometragem"].disable();
        this.form.controls["cpf"].disable();
        this.form.controls["nome"].disable();
        this.form.controls["email"].disable();
        this.form.controls["dtnascimento"].disable();
        for (var _i = 0, _a = this.form.get("servicosForm").controls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.controls["observacao"].disable();
        }
    };
    OficinacadastroComponent.prototype.habilitaCampo = function () {
        this.processing = false;
        if (!this.edit) {
            this.habilitaPlaca();
        }
        this.form.controls["marca"].enable();
        this.form.controls["modelo"].enable();
        this.form.controls["ano"].enable();
        this.form.controls["anomodelo"].enable();
        this.form.controls["quilometragem"].enable();
        this.form.controls["cpf"].enable();
        this.form.controls["nome"].enable();
        this.form.controls["email"].enable();
        this.form.controls["dtnascimento"].enable();
        for (var _i = 0, _a = this.form.get("servicosForm").controls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.controls["observacao"].enable();
        }
    };
    OficinacadastroComponent.prototype.createForm = function () {
        var servicosForm = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormArray */]([]);
        this.form = this.formBuilder.group({
            placa: [
                "",
                [
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].minLength(8),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].maxLength(8),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].pattern(/[A-Z]{3}-?\d{3}/)
                ]
            ],
            marca: "",
            modelo: "",
            ano: "",
            anomodelo: "",
            cpf: ["", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required],
            nome: ["", __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required],
            email: [
                "",
                [
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].maxLength(30),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]
            ],
            dtnascimento: [
                "",
                [
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].minLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].pattern(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
                ]
            ],
            quilometragem: [
                "",
                [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* Validators */].pattern(/^[0-9]*$/)]
            ],
            servicosForm: servicosForm
        });
    };
    OficinacadastroComponent.prototype.onLimpar = function () {
        this.placa.nativeElement.focus();
        this.edit = false;
        this.form.controls["placa"].setValue("");
        this.form.controls["marca"].setValue("");
        this.form.controls["modelo"].setValue("");
        this.form.controls["ano"].setValue("");
        this.form.controls["anomodelo"].setValue("");
        this.form.controls["cpf"].setValue("");
        this.form.controls["nome"].setValue("");
        this.form.controls["email"].setValue("");
        this.form.controls["dtnascimento"].setValue("");
        this.form.controls["quilometragem"].setValue("");
        this.servicosRealizados = [];
    };
    //coloca o formulario em estado de edição.
    OficinacadastroComponent.prototype.onEditItem = function (index) {
        this.edit = true;
    };
    OficinacadastroComponent.prototype.onDeletar = function () {
        var _this = this;
        this.processing = true;
        this.desabilitaCampos();
        var veiculo = {
            placa: this.form.controls["placa"].value,
            marca: this.form.controls["marca"].value,
            modelo: this.form.controls["modelo"].value,
            ano: this.form.controls["ano"].value,
            anomodelo: this.form.controls["anomodelo"].value,
            quilometragem: this.form.controls["quilometragem"].value
        };
        var proprietario = {
            cpf: this.form.controls["cpf"].value,
            nome: this.form.controls["nome"].value,
            email: this.form.controls["email"].value,
            datanascimento: this.form.controls["dtnascimento"].value
        };
        this.oficinaService.setVeiculo(veiculo);
        this.oficinaService.setProprietario(proprietario);
        this.subEnviar = this.oficinaService
            .inativaOrdemServico()
            .subscribe(function (data) {
            if (!data) {
                _this.messageClass = "alert alert-danger";
                _this.message = "Erro ao salvar as informações";
                _this.processing = false;
                _this.habilitaCampo();
                return;
            }
            if (!data.success) {
                _this.messageClass = "alert alert-danger";
                _this.message = data.message;
                _this.processing = false;
                _this.habilitaCampo();
                return;
            }
            else {
                _this.messageClass = "alert alert-success";
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(["centroautomotivo/lista/edit"]);
                    return;
                }, 2000);
            }
        });
    };
    OficinacadastroComponent.prototype.enviaDados = function () {
        var _this = this;
        this.processing = true;
        this.desabilitaCampos();
        var veiculo = {
            placa: this.form.controls["placa"].value,
            marca: this.form.controls["marca"].value,
            modelo: this.form.controls["modelo"].value,
            ano: this.form.controls["ano"].value,
            anomodelo: this.form.controls["anomodelo"].value,
            quilometragem: this.form.controls["quilometragem"].value
        };
        var proprietario = {
            cpf: this.form.controls["cpf"].value,
            nome: this.form.controls["nome"].value,
            email: this.form.controls["email"].value,
            datanascimento: this.form.controls["dtnascimento"].value
        };
        this.servicosRealizados = [];
        for (var _i = 0, _a = this.form.get("servicosForm").controls; _i < _a.length; _i++) {
            var control = _a[_i];
            if (control.value.selecionado) {
                var servicoRealizado = {
                    servicoid: control.value._id,
                    observacao: control.value.observacao
                };
                this.servicosRealizados.push(servicoRealizado);
            }
        }
        this.oficinaService.setVeiculo(veiculo);
        this.oficinaService.setProprietario(proprietario);
        this.oficinaService.setServicosRealizado(this.servicosRealizados);
        this.subEnviar = this.oficinaService.atualizarDados().subscribe(function (data) {
            if (!data) {
                _this.messageClass = "alert alert-danger";
                _this.message = "Erro ao salvar as informações";
                _this.processing = false;
                _this.habilitaCampo();
                return;
            }
            if (!data.success) {
                _this.messageClass = "alert alert-danger";
                _this.message = data.message;
                _this.processing = false;
                _this.habilitaCampo();
                return;
            }
            else {
                _this.messageClass = "alert alert-success";
                _this.message = data.message;
                setTimeout(function () {
                    _this.router.navigate(["centroautomotivo/lista/edit"]);
                }, 2000);
                return;
            }
        });
    };
    OficinacadastroComponent.prototype.defineObservacao = function (event, posicao) {
        this.servicos[posicao].obseracao = event.target.value;
    };
    OficinacadastroComponent.prototype.defineServico = function (event, posicao) {
        var codigo = event.target.value;
        if (event.target.checked) {
            this.servicos[posicao].checked = true;
            var oServico = this.servicos.find(function (servico) { return servico._id === codigo; });
            if (oServico) {
                this.servicosRealizados.push(oServico);
            }
        }
        else {
            this.servicos[posicao].checked = false;
            var indice = this.servicosRealizados.findIndex(function (servico) { return servico._id === codigo; });
            if (indice > -1) {
                this.servicosRealizados.splice(indice, 1);
            }
        }
    };
    OficinacadastroComponent.prototype.onVoltar = function () {
        this.router.navigate(["centroautomotivo/lista/edit"]);
    };
    OficinacadastroComponent.prototype.adicionarServicoForm = function () {
        var _loop_1 = function (tServico) {
            var oServico = this_1.servicosRealizados.find(function (servicorealizado) { return servicorealizado.servicoid === tServico._id; });
            var selecionado = false;
            var observacao = "";
            if (oServico) {
                selecionado = true;
                observacao = oServico.observacao;
            }
            this_1.form.get("servicosForm").push(this_1.formBuilder.group({
                _id: tServico._id,
                descricao: tServico.descricao,
                selecionado: selecionado,
                observacao: observacao
            }));
        };
        var this_1 = this;
        for (var _i = 0, _a = this.servicos; _i < _a.length; _i++) {
            var tServico = _a[_i];
            _loop_1(tServico);
        }
    };
    return OficinacadastroComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["ViewChild"])("placa"),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_core__["ElementRef"]) === "function" && _a || Object)
], OficinacadastroComponent.prototype, "placa", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["ViewChild"])("quilometragem"),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_core__["ElementRef"]) === "function" && _b || Object)
], OficinacadastroComponent.prototype, "quilometragem", void 0);
OficinacadastroComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"])({
        selector: "app-oficinacadastro",
        template: __webpack_require__("../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.html"),
        styles: [__webpack_require__("../../../../../src/app/oficina/oficinacadastro/oficinacadastro.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__oficina_service__["a" /* OficinaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__oficina_service__["a" /* OficinaService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__cadastro_empresa_empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__cadastro_empresa_empresa_service__["a" /* EmpresaService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _g || Object])
], OficinacadastroComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=oficinacadastro.component.js.map

/***/ }),

/***/ "../../../../../src/app/oficina/oficinalist/oficinalist.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/oficina/oficinalist/oficinalist.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"page-header\"> {{edit ? 'Cadastro de serviços':'Serviços em aberto para avaliação'}}</h3>\r\n<a *ngIf=\"edit\" class=\"btn btn-success\" (click)='onNovo()'>Novo</a>\r\n<table class=\"table table-striped table-hover \">\r\n  <thead>\r\n    <tr>\r\n      <th>#</th>\r\n      <th>Placa</th>\r\n      <th>Proprietário</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let ordemservico of ordemservicos; let i = index\" style=\"cursor: pointer\"\r\n    (click)=\"onEditItem(ordemservico._id)\"  >\r\n      <td>{{i}}</td>\r\n      <td>{{ordemservico.veiculoid.placa}}</td>\r\n      <td>{{ordemservico.usuarioid.nome}}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n"

/***/ }),

/***/ "../../../../../src/app/oficina/oficinalist/oficinalist.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oficina_service__ = __webpack_require__("../../../../../src/app/oficina/oficina.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OficinalistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OficinalistComponent = (function () {
    function OficinalistComponent(oficinaService, route, router) {
        this.oficinaService = oficinaService;
        this.route = route;
        this.router = router;
        this.edit = false;
        this.messageClass = "";
        this.message = "";
        this.ordemservicos = [];
    }
    OficinalistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subsEdit = this.route.params.subscribe(function (params) {
            if (params.edit) {
                _this.edit = true;
            }
        });
        this.httpSubs = this.oficinaService.getTodosVeiculos().subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
            }
            _this.ordemservicos = data.ordensservico;
        });
    };
    OficinalistComponent.prototype.ngOnDestroy = function () {
        if (this.httpSubs)
            this.httpSubs.unsubscribe();
        if (this.subsEdit)
            this.subsEdit.unsubscribe();
    };
    OficinalistComponent.prototype.onEditItem = function (ordemservicoid) {
        if (this.edit) {
            this.router.navigate(['centroautomotivo/cadastro', ordemservicoid]);
        }
        else {
            this.router.navigate(['centroautomotivo/survey', ordemservicoid]);
        }
    };
    OficinalistComponent.prototype.onNovo = function () {
        this.router.navigate(['centroautomotivo/cadastro']);
    };
    return OficinalistComponent;
}());
OficinalistComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-oficinalist',
        template: __webpack_require__("../../../../../src/app/oficina/oficinalist/oficinalist.component.html"),
        styles: [__webpack_require__("../../../../../src/app/oficina/oficinalist/oficinalist.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__oficina_service__["a" /* OficinaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__oficina_service__["a" /* OficinaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _c || Object])
], OficinalistComponent);

var _a, _b, _c;
//# sourceMappingURL=oficinalist.component.js.map

/***/ }),

/***/ "../../../../../src/app/oficina/survey/survey.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*sprite with stars*/\r\n#reviewStars-input input:checked ~ label, #reviewStars-input label, #reviewStars-input label:hover, #reviewStars-input label:hover ~ label {\r\n  background: url('http://positivecrash.com/wp-content/uploads/ico-s71a7fdede6.png') no-repeat;\r\n}\r\n\r\n#reviewStars-input {\r\n\r\n  /*fix floating problems*/\r\n  overflow: hidden;\r\n  *zoom: 1;\r\n  /*end of fix floating problems*/\r\n\r\n  position: relative;\r\n  float: left;\r\n}\r\n\r\n#reviewStars-input input {\r\n  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\r\n  opacity: 0;\r\n\r\n  width: 43px;\r\n  height: 40px;\r\n\r\n  position: absolute;\r\n  top: 0;\r\n  z-index: 0;\r\n}\r\n\r\n#reviewStars-input input:checked ~ label {\r\n  background-position: 0 -40px;\r\n  height: 40px;\r\n  width: 43px;\r\n}\r\n\r\n#reviewStars-input label {\r\n  background-position: 0 0;\r\n  height: 40px;\r\n  width: 43px;\r\n  float: right;\r\n  cursor: pointer;\r\n  margin-right: 10px;\r\n\r\n  position: relative;\r\n  z-index: 1;\r\n}\r\n\r\n#reviewStars-input label:hover, #reviewStars-input label:hover ~ label {\r\n  background-position: 0 -40px;\r\n  height: 40px;\r\n  width: 43px;\r\n}\r\n\r\n#reviewStars-input #star-0 {\r\n  left: 0px;\r\n}\r\n#reviewStars-input #star-1 {\r\n  left: 53px;\r\n}\r\n#reviewStars-input #star-2 {\r\n  left: 106px;\r\n}\r\n#reviewStars-input #star-3 {\r\n  left: 159px;\r\n}\r\n#reviewStars-input #star-4 {\r\n  left: 212px;\r\n}\r\n#reviewStars-input #star-5 {\r\n  left: 265px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/oficina/survey/survey.component.html":
/***/ (function(module, exports) {

module.exports = "<h3 class=\"page-header\">Pesquisa de satisfação</h3>\r\n<div class=\"row show-hide-message\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{message}}\r\n  </div>\r\n</div>\r\n<div class=\"panel panel-success\" *ngFor=\"let pergunta of perguntas; let cont = index\">\r\n  <div class=\"panel-heading\">\r\n    <h3 class=\"panel-title\">{{pergunta.descricao}}</h3>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n    <div class=\"col-lg-10\" *ngIf=\"pergunta.tipo==1\">\r\n      <textarea class=\"form-control\" rows=\"3\" id=\"textArea\" (blur)='setRespostaText($event,cont)'></textarea>\r\n    </div>\r\n    <div class=\"col-lg-10\" *ngIf=\"pergunta.tipo==2\">\r\n      <ul class=\"pagination\">\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==0}\"><a (click)=\"setResposta(0,cont)\">0</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==1}\"><a (click)=\"setResposta(1,cont)\">1</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==2}\"><a (click)=\"setResposta(2,cont)\">2</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==3}\"><a (click)=\"setResposta(3,cont)\">3</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==4}\"><a (click)=\"setResposta(4,cont)\">4</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==5}\"><a (click)=\"setResposta(5,cont)\">5</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==6}\"><a (click)=\"setResposta(6,cont)\">6</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==7}\"><a (click)=\"setResposta(7,cont)\">7</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==8}\"><a (click)=\"setResposta(8,cont)\">8</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==9}\"><a (click)=\"setResposta(9,cont)\">9</a></li>\r\n        <li [ngClass]=\"{'active' : pergunta.resposta==10}\"><a (click)=\"setResposta(10,cont)\">10</a></li>\r\n      </ul>\r\n    </div>\r\n    <div class=\"col-lg-10\" *ngIf=\"pergunta.tipo==3\">\r\n      <div id=\"reviewStars-input\">\r\n        <input id=\"star-4\" type=\"radio\" name=\"reviewStars\" (click)=\"setResposta(4,cont)\" />\r\n        <label title=\"Excelente\" for=\"star-4\"></label>\r\n\r\n        <input id=\"star-3\" type=\"radio\" name=\"reviewStars\" (click)=\"setResposta(3,cont)\" />\r\n        <label title=\"Ótimo\" for=\"star-3\"></label>\r\n\r\n        <input id=\"star-2\" type=\"radio\" name=\"reviewStars\" (click)=\"setResposta(2,cont)\" />\r\n        <label title=\"Bom\" for=\"star-2\"></label>\r\n\r\n        <input id=\"star-1\" type=\"radio\" name=\"reviewStars\" (click)=\"setResposta(1,cont)\" />\r\n        <label title=\"precisa melhorar\" for=\"star-1\"></label>\r\n\r\n        <input id=\"star-0\" type=\"radio\" name=\"reviewStars\" (click)=\"setResposta(0,cont)\" />\r\n        <label title=\"Não gostei\" for=\"star-0\"></label>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<button type=\"button\" [disabled]='processing' class=\"btn btn-success btn-lg btn-block\"  (click)='enviar()'>Enviar</button>\r\n"

/***/ }),

/***/ "../../../../../src/app/oficina/survey/survey.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__oficina_service__ = __webpack_require__("../../../../../src/app/oficina/oficina.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurveyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SurveyComponent = (function () {
    function SurveyComponent(oficinaService, route, router) {
        this.oficinaService = oficinaService;
        this.route = route;
        this.router = router;
        this.teste = true;
        this.processing = false;
        this.perguntas = [];
        this.ordemservicos = [];
    }
    SurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.perguntas = [];
        this.subsPesquisaAtendimento = this.route.params.subscribe(function (params) {
            _this.atendimentoid = params.id;
            if (_this.atendimentoid) {
                _this.processing = true;
                _this.subsPesquisa = _this.oficinaService
                    .getSurvey(_this.atendimentoid)
                    .subscribe(function (data) {
                    if (!data.success) {
                        _this.messageClass = "alert alert-danger";
                        _this.message = data.message;
                    }
                    else {
                        _this.perguntas = data.perguntas;
                    }
                    _this.processing = false;
                });
            }
        });
    };
    SurveyComponent.prototype.limpar = function () {
        this.perguntas = [];
    };
    SurveyComponent.prototype.ngOnDestroy = function () {
        if (this.httpSubs)
            this.httpSubs.unsubscribe();
    };
    SurveyComponent.prototype.setRespostaText = function (event, index) {
        console.log(event.target.value);
        this.perguntas[index].resposta = event.target.value;
    };
    SurveyComponent.prototype.setResposta = function (valor, index) {
        this.perguntas[index].resposta = valor;
    };
    SurveyComponent.prototype.enviar = function () {
        var _this = this;
        this.processing = true;
        var respostas = [];
        for (var c = 0; c < this.perguntas.length; c++) {
            respostas[c] = {
                ordemservicoid: this.atendimentoid,
                perguntaid: this.perguntas[c]._id,
                tipo: this.perguntas[c].tipo,
                descricao: this.perguntas[c].descricao,
                resposta: this.perguntas[c].resposta
            };
        }
        var resposta = JSON.stringify(respostas);
        var body = {
            ordemservicoid: this.atendimentoid,
            json: respostas
        };
        this.oficinaService.enviaQuestionario(body).subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
            }
            else {
                _this.messageClass = 'alert alert-success';
                _this.message = 'Dados salvos com sucesso';
                setTimeout(function () {
                    _this.processing = false; // Enable submit button
                    _this.router.navigate(['centroautomotivo/lista']);
                }, 2000);
            }
        });
    };
    return SurveyComponent;
}());
SurveyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: "app-survey",
        template: __webpack_require__("../../../../../src/app/oficina/survey/survey.component.html"),
        styles: [__webpack_require__("../../../../../src/app/oficina/survey/survey.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__oficina_service__["a" /* OficinaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__oficina_service__["a" /* OficinaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _c || Object])
], SurveyComponent);

var _a, _b, _c;
//# sourceMappingURL=survey.component.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map