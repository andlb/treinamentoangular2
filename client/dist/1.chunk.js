webpackJsonp([1],{

/***/ "../../../../../src/app/cadastro/empresa/empresa-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__ = __webpack_require__("../../../../../src/app/autenticar/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__autenticar_guards_notAuth_guard__ = __webpack_require__("../../../../../src/app/autenticar/guards/notAuth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__empresa_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__empresaservico_empresaservico_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__empresafuncionario_empresafuncionario_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__empresacadastro_empresacadastro_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__empresalista_empresalista_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__empresapergunta_empresapergunta_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresaRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var empresaRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__empresa_component__["a" /* EmpresaComponent */], children: [
            { path: '', component: __WEBPACK_IMPORTED_MODULE_8__empresalista_empresalista_component__["a" /* EmpresalistaComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
            { path: 'lista', component: __WEBPACK_IMPORTED_MODULE_8__empresalista_empresalista_component__["a" /* EmpresalistaComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
            { path: 'cadastro', component: __WEBPACK_IMPORTED_MODULE_7__empresacadastro_empresacadastro_component__["a" /* EmpresacadastroComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
            { path: 'funcionario', component: __WEBPACK_IMPORTED_MODULE_6__empresafuncionario_empresafuncionario_component__["a" /* EmpresafuncionarioComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
            { path: 'servico', component: __WEBPACK_IMPORTED_MODULE_5__empresaservico_empresaservico_component__["a" /* EmpresaservicoComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
            { path: 'pergunta', component: __WEBPACK_IMPORTED_MODULE_9__empresapergunta_empresapergunta_component__["a" /* EmpresaperguntaComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
            { path: 'cadastro/:id', component: __WEBPACK_IMPORTED_MODULE_7__empresacadastro_empresacadastro_component__["a" /* EmpresacadastroComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
        ] },
];
var EmpresaRoutingModule = (function () {
    function EmpresaRoutingModule() {
    }
    return EmpresaRoutingModule;
}());
EmpresaRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(empresaRoutes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2__autenticar_guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_3__autenticar_guards_notAuth_guard__["a" /* NoAuthGuard */]
        ]
    })
], EmpresaRoutingModule);

//# sourceMappingURL=empresa-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresa.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresa.component.html":
/***/ (function(module, exports) {

module.exports = "<h1 class=\"page-header\">Dados da empresa</h1>\r\n<div class=\"row show-hide-message\">\r\n  <div [ngClass]=\"messageClass\">\r\n    {{message}}\r\n  </div>\r\n</div>\r\n\r\n<button *ngIf=\"!edicao && !novo\" class=\"btn btn-success\" [disabled]='processing' (click)='onNovo()'>Novo</button>\r\n<button *ngIf=\"edicao || novo\" class=\"btn btn-danger\" [disabled]='processing' (click)='cancelarAcao()'>Inicio</button>\r\n<button *ngIf=\"edicao || novo\" class=\"btn btn-success\" [disabled]='processing' (click)='salvar()'>Salvar</button>\r\n\r\n<br/>\r\n<ul class=\"nav nav-tabs\" *ngIf=\"edicao||novo\" >\r\n  <li [routerLinkActive]=\"['active']\"><a  routerLink=\"/empresa/cadastro\" routerLinkActive=\"active\" >Cadastro</a></li>\r\n  <li [routerLinkActive]=\"['active']\"><a  routerLink=\"/empresa/funcionario\" routerLinkActive=\"active\" >Funcionário</a></li>\r\n  <li [routerLinkActive]=\"['active']\"><a  routerLink=\"/empresa/servico\" routerLinkActive=\"active\">Serviço</a></li>\r\n  <li [routerLinkActive]=\"['active']\"><a  routerLink=\"/empresa/pergunta\" routerLinkActive=\"active\">Pergunta</a></li>\r\n</ul>\r\n<router-outlet></router-outlet>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresa.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EmpresaComponent = (function () {
    function EmpresaComponent(formBuilder, empresaService, router) {
        this.formBuilder = formBuilder;
        this.empresaService = empresaService;
        this.router = router;
        this.cadastroInvalido = true;
        this.novo = false;
        this.edicao = false;
    }
    EmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.novo = false;
        this.edicao = false;
        this.subscription = this.empresaService.empresaChanged.subscribe(function (acao) {
            if (acao === "cadastroValido") {
                _this.cadastroInvalido = false;
                return;
            }
            if (acao === "edicao") {
                _this.edicao = true;
                _this.novo = false;
            }
        });
    };
    EmpresaComponent.prototype.cancelarAcao = function () {
        this.edicao = false;
        this.novo = false;
        this.empresaService.cancelarAcao();
        this.router.navigate(["/empresa/lista"]);
    };
    EmpresaComponent.prototype.onNovo = function () {
        this.novo = true;
        this.edicao = false;
        this.empresaService.empresaChanged.next("novo");
    };
    EmpresaComponent.prototype.salvar = function () {
        var _this = this;
        this.processing = true;
        this.edicao = false;
        this.novo = false;
        if (!this.empresaService.verificaDadosValido()) {
            //TODO:Mostra a tela de cadastro quando retornar false;
            this.messageClass = 'alert alert-danger';
            this.message = 'Dados da tela de cadastro inválido';
            this.processing = false;
            this.empresaService.empresaChanged.next('habilitarcampos');
            return;
        }
        this.empresaService.empresaChanged.next('desabilitarcampos');
        this.subsEnvio = this.empresaService.atualizaEmpresa().subscribe(function (data) {
            if (!data.success) {
                _this.messageClass = 'alert alert-danger';
                _this.message = data.message;
                _this.processing = false;
                _this.empresaService.empresaChanged.next('habilitarcampos');
            }
            else {
                _this.messageClass = 'alert alert-success';
                _this.message = data.message;
                setTimeout(function () {
                    _this.processing = false;
                    _this.empresaService.empresaChanged.next('habilitarcampos');
                    _this.empresaService.empresaChanged.next('cancelaracao');
                    _this.messageClass = '';
                    _this.message = '';
                    _this.router.navigate(["/empresa/lista"], { skipLocationChange: true });
                }, 2000);
            }
        });
        ;
    };
    EmpresaComponent.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
        if (this.subsEnvio)
            this.subsEnvio.unsubscribe();
    };
    return EmpresaComponent;
}());
EmpresaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-empresa',
        template: __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/empresa/empresa.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__empresa_service__["a" /* EmpresaService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]) === "function" && _c || Object])
], EmpresaComponent);

var _a, _b, _c;
//# sourceMappingURL=empresa.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresa.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__empresa_routing_module__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__empresa_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__empresacadastro_empresacadastro_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__empresaservico_empresaservico_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__empresafuncionario_empresafuncionario_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__empresalista_empresalista_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__empresapergunta_empresapergunta_component__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmpresaModule", function() { return EmpresaModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var EmpresaModule = (function () {
    function EmpresaModule() {
    }
    return EmpresaModule;
}());
EmpresaModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__empresa_component__["a" /* EmpresaComponent */],
            __WEBPACK_IMPORTED_MODULE_5__empresacadastro_empresacadastro_component__["a" /* EmpresacadastroComponent */],
            __WEBPACK_IMPORTED_MODULE_6__empresaservico_empresaservico_component__["a" /* EmpresaservicoComponent */],
            __WEBPACK_IMPORTED_MODULE_7__empresafuncionario_empresafuncionario_component__["a" /* EmpresafuncionarioComponent */],
            __WEBPACK_IMPORTED_MODULE_8__empresalista_empresalista_component__["a" /* EmpresalistaComponent */],
            __WEBPACK_IMPORTED_MODULE_9__empresapergunta_empresapergunta_component__["a" /* EmpresaperguntaComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__empresa_routing_module__["a" /* EmpresaRoutingModule */]
        ]
    })
], EmpresaModule);

//# sourceMappingURL=empresa.module.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"form\" (submit)=\"addCadastro()\" >\r\n   <div class=\"control-group\">\r\n      <label class=\"control-label\" for=\"email\">E-mail</label>\r\n      <div [ngClass]=\"{'has-error':form.controls.email.touched &&  (form.controls.email.errors), 'has-success': !form.controls.email.errors }\">\r\n      <input type=\"text\" class=\"form-control\"\r\n          #email\r\n          id=\"email\"\r\n          name=\"email\"\r\n          formControlName=\"email\" placeholder=\"*E-mail\"  autofocus >\r\n        <ul class=\"help-block\">\r\n          <li *ngIf=\"form.controls.email.touched && form.controls.email.errors?.required \">Informe o e-mail</li>\r\n         <li *ngIf=\"((form.controls.email.touched) && (form.controls.email.errors?.maxlength || form.controls.email.errors?.minlength))\">Caracters mínimo: 3, máximo: 15</li>\r\n         <li *ngIf=\"form.controls.email.touched && form.controls.email.errors?.pattern\">Este e-mail deve ser válido</li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"nomeresponsavel\">Nome responsável</label>\r\n    <div [ngClass]=\"{'has-success': form.controls.nomeresponsavel.valid, 'has-error': form.controls.nomeresponsavel.dirty && form.controls.nomeresponsavel.errors}\">\r\n      <!-- razaosocial Input Razão social -->\r\n      <input type=\"text\" name=\"nomeresponsavel\" autocomplete=\"true\"  class=\"form-control\"\r\n      placeholder=\"*Nome responsável\"\r\n      autocomplete=\"off\" formControlName=\"nomeresponsavel\"\r\n      />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.nomeresponsavel.touched && form.controls.nomeresponsavel.errors?.required \">Informe o nome do responsável</li>\r\n        <li *ngIf=\"((form.controls.nomeresponsavel.touched) && (form.controls.nomeresponsavel.errors?.maxlength || form.controls.nomeresponsavel.errors?.minlength))\">\r\n          Caracters mínimo: 5, máximo: 100\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"razaosocial\">Razão social</label>\r\n    <div [ngClass]=\"{'has-success': form.controls.razaosocial.valid, 'has-error': form.controls.razaosocial.dirty && form.controls.razaosocial.errors}\">\r\n      <!-- razaosocial Input Razão social -->\r\n      <input type=\"text\" name=\"razaosocial\"  autocomplete=\"true\"  class=\"form-control\" placeholder=\"*Razão social\" autocomplete=\"off\" formControlName=\"razaosocial\"\r\n      />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.razaosocial.touched && form.controls.razaosocial.errors?.required \">\r\n          Informe a razão social</li>\r\n        <li *ngIf=\"((form.controls.razaosocial.touched) && (form.controls.razaosocial.errors?.maxlength || form.controls.razaosocial.errors?.minlength))\">\r\n          Caracters mínimo: 5, máximo: 100\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"nomefantasia\">Nome fantasia</label>\r\n    <div [ngClass]=\"{'has-success': form.controls.nomefantasia.valid, 'has-error': form.controls.nomefantasia.dirty && form.controls.nomefantasia.errors}\">\r\n      <!-- Input Razão social -->\r\n      <input type=\"text\" name=\"nomefantasia\" autocomplete=\"true\"  class=\"form-control\" placeholder=\"*Nome fantasia\" autocomplete=\"off\" formControlName=\"nomefantasia\"\r\n      />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.nomefantasia.touched && form.controls.nomefantasia.errors?.required \">\r\n          Informe o nome fantasia</li>\r\n        <li *ngIf=\"((form.controls.nomefantasia.touched) && (form.controls.nomefantasia.errors?.maxlength || form.controls.nomefantasia.errors?.minlength))\">\r\n          Caracters mínimo: 5, máximo: 100\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"telefone\">Telefone</label>\r\n    <div [ngClass]=\"{'has-error':form.controls.telefone.touched &&  (form.controls.telefone.errors), 'has-success': !form.controls.telefone.errors }\">\r\n      <input type=\"text\" class=\"form-control\"    autocomplete=\"true\"  id=\"telefone\" name=\"telefone\" placeholder=\"*Telefone\" formControlName=\"telefone\">\r\n      <ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.telefone.touched && form.controls.telefone.errors?.required \">\r\n          Informe o numero do telefone</li>\r\n        <li *ngIf=\"form.controls.telefone.touched && form.controls.telefone.errors?.pattern \">\r\n          Telefone incorreto</li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"celular\">Celular</label>\r\n    <div [ngClass]=\"{'has-error':form.controls.celular.touched &&  (form.controls.celular.errors), 'has-success': !form.controls.celular.errors }\">\r\n      <input type=\"text\" class=\"form-control\"    autocomplete=\"true\" id=\"celular\" name=\"celular\" placeholder=\"*Celular\" formControlName=\"celular\">\r\n      <ul class=\"help-block\">\r\n        <li *ngIf=\"form.controls.celular.touched && form.controls.celular.errors?.required \">\r\n          Informe o numero do celular</li>\r\n        <li *ngIf=\"form.controls.celular.touched && form.controls.celular.errors?.pattern \">\r\n          Celular incorreto</li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"endereco\">Endereço</label>\r\n    <div>\r\n      <!--endereco Input -->\r\n      <input type=\"text\" name=\"endereco\"   autocomplete=\"true\" class=\"form-control\" placeholder=\"*Endereço\" autocomplete=\"off\" formControlName=\"endereco\"\r\n      />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"numero\">Numero</label>\r\n    <div>\r\n      <!--bairro Input -->\r\n      <input type=\"text\" name=\"numero\"  autocomplete=\"true\" class=\"form-control\" placeholder=\"*Numero\" autocomplete=\"off\" formControlName=\"numero\" />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"complemento\">Complemento</label>\r\n    <div>\r\n      <!--complemento Input -->\r\n      <input type=\"text\" name=\"complemento\" autocomplete=\"true\" class=\"form-control\" placeholder=\"*Complemento\" autocomplete=\"off\" formControlName=\"complemento\"\r\n      />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"bairro\">Bairro</label>\r\n    <div>\r\n      <!--bairro Input -->\r\n      <input type=\"text\" name=\"bairro\" autocomplete=\"true\" class=\"form-control\" placeholder=\"*Bairro\" autocomplete=\"off\" formControlName=\"bairro\" />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"cidade\">Cidade</label>\r\n    <div>\r\n      <!--cidade Input -->\r\n      <input type=\"text\" name=\"cidade\" autocomplete=\"true\" class=\"form-control\" placeholder=\"*Cidade\" autocomplete=\"off\" formControlName=\"cidade\" />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"estado\">Estado</label>\r\n    <div>\r\n      <!--estado Input -->\r\n      <input type=\"text\" name=\"estado\" autocomplete=\"true\" class=\"form-control\" placeholder=\"*Estado\" autocomplete=\"off\" formControlName=\"estado\" />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"control-label\" for=\"CEP\">CEP</label>\r\n    <div [ngClass]=\"{'has-error':form.controls.CEP.touched &&  (form.controls.CEP.errors), 'has-success': !form.controls.CEP.errors }\">\r\n      <!--CEP Input -->\r\n      <input type=\"text\" name=\"CEP\" autocomplete=\"true\" class=\"form-control\" placeholder=\"*CEP\" autocomplete=\"off\" formControlName=\"CEP\" />\r\n      <!-- Validation -->\r\n      <ul class=\"help-block \">\r\n        <li *ngIf=\"form.controls.CEP.touched && form.controls.CEP.errors?.pattern \">CEP inválido. Exemplo: 15057-000</li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</form>\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresacadastroComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EmpresacadastroComponent = (function () {
    function EmpresacadastroComponent(formBuilder, empresaService, route) {
        this.formBuilder = formBuilder;
        this.empresaService = empresaService;
        this.route = route;
    }
    EmpresacadastroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.email.nativeElement.focus();
        //realiza a consulta.
        this.route.params
            .subscribe(function (params) {
            _this.empresaid = params.id;
            if (_this.empresaid) {
                _this.subsPesquisa = _this.empresaService.getEmpresa(_this.empresaid).subscribe(function (data) {
                    if (!data.success) {
                        //TODO: mostrar um erro quando a informação não é encontrada.
                        return;
                    }
                    _this.empresaService.addEmpresa(data.empresa);
                    _this.empresaService.setEmpresaid(_this.empresaid);
                    _this.atualizaForm();
                });
            }
        });
        this.subscription = this.empresaService.empresaChanged.subscribe(function (acao) {
            if (acao === "cancelaracao") {
                _this.form.reset();
                return;
            }
            if (acao === "desabilitarcampos") {
                _this.desabilitaCampos();
            }
            if (acao === "habilitarcampos") {
                _this.habilitaCampo();
            }
        });
    };
    EmpresacadastroComponent.prototype.atualizaForm = function () {
        this.empresa = this.empresaService.getCadastro();
        this.form.controls["nomeresponsavel"].setValue(this.empresa.nomeresponsavel);
        this.form.controls["nomefantasia"].setValue(this.empresa.nomefantasia);
        this.form.controls["razaosocial"].setValue(this.empresa.razaosocial);
        this.form.controls["telefone"].setValue(this.empresa.telefone);
        this.form.controls["celular"].setValue(this.empresa.celular);
        this.form.controls["endereco"].setValue(this.empresa.endereco);
        this.form.controls["bairro"].setValue(this.empresa.bairro);
        this.form.controls["numero"].setValue(this.empresa.numero);
        this.form.controls["complemento"].setValue(this.empresa.complemento);
        this.form.controls["estado"].setValue(this.empresa.estado);
        this.form.controls["cidade"].setValue(this.empresa.cidade);
        this.form.controls["CEP"].setValue(this.empresa.cep);
        this.form.controls["email"].setValue(this.empresa.email);
        this.email.nativeElement.focus();
    };
    EmpresacadastroComponent.prototype.createForm = function () {
        var _this = this;
        this.empresa = this.empresaService.getCadastro();
        if (!this.empresa) {
            this.empresa = {};
        }
        this.form = this.formBuilder.group({
            nomefantasia: [this.empresa.nomefantasia, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(100), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(5)]],
            razaosocial: [this.empresa.razaosocial, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(100), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(5)]],
            nomeresponsavel: [this.empresa.nomeresponsavel, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(100), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(5)]],
            telefone: [this.empresa.telefone, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/)]],
            celular: [this.empresa.celular, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/)]],
            endereco: [this.empresa.endereco],
            bairro: [this.empresa.bairro],
            numero: [this.empresa.numero],
            complemento: [this.empresa.complemento],
            cidade: [this.empresa.cidade],
            estado: [this.empresa.estado],
            CEP: [this.empresa.cep, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].pattern(/\d{5}\-\d{3}/)],
            email: [this.empresa.email,
                [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(30),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]
            ],
        });
        this.valueChanged = this.form.valueChanges
            .subscribe(function (data) {
            _this.empresaService.setCadastroValido(_this.form.valid);
            _this.addCadastro();
        });
    };
    EmpresacadastroComponent.prototype.habilitaCampo = function () {
        this.form.controls["nomeresponsavel"].enable();
        this.form.controls["nomefantasia"].enable();
        this.form.controls["razaosocial"].enable();
        this.form.controls["telefone"].enable();
        this.form.controls["celular"].enable();
        this.form.controls["endereco"].enable();
        this.form.controls["bairro"].enable();
        this.form.controls["numero"].enable();
        this.form.controls["complemento"].enable();
        this.form.controls["estado"].enable();
        this.form.controls["cidade"].enable();
        this.form.controls["CEP"].enable();
        this.form.controls["email"].enable();
    };
    EmpresacadastroComponent.prototype.desabilitaCampos = function () {
        this.form.controls["nomeresponsavel"].disable();
        this.form.controls["nomefantasia"].disable();
        this.form.controls["razaosocial"].disable();
        this.form.controls["telefone"].disable();
        this.form.controls["celular"].disable();
        this.form.controls["endereco"].disable();
        this.form.controls["bairro"].disable();
        this.form.controls["numero"].disable();
        this.form.controls["complemento"].disable();
        this.form.controls["estado"].disable();
        this.form.controls["cidade"].disable();
        this.form.controls["CEP"].disable();
        this.form.controls["email"].disable();
    };
    EmpresacadastroComponent.prototype.addCadastro = function () {
        var empresa = {
            nomeresponsavel: this.form.get("nomeresponsavel").value,
            nomefantasia: this.form.get("nomefantasia").value,
            razaosocial: this.form.get("razaosocial").value,
            telefone: this.form.get("telefone").value,
            celular: this.form.get("celular").value,
            endereco: this.form.get("endereco").value,
            bairro: this.form.get("bairro").value,
            complemento: this.form.get('complemento').value,
            cidade: this.form.get('cidade').value,
            estado: this.form.get('estado').value,
            CEP: this.form.get('CEP').value,
            email: this.form.get('email').value
        };
        this.empresaService.addCadastro(empresa);
    };
    EmpresacadastroComponent.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
        if (this.valueChanged)
            this.valueChanged.unsubscribe();
        if (this.subsPesquisa)
            this.subsPesquisa.unsubscribe();
    };
    return EmpresacadastroComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('email'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]) === "function" && _a || Object)
], EmpresacadastroComponent.prototype, "email", void 0);
EmpresacadastroComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-empresacadastro',
        template: __webpack_require__("../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/empresa/empresacadastro/empresacadastro.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__empresa_service__["a" /* EmpresaService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], EmpresacadastroComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=empresacadastro.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form-inline\" [formGroup]=\"form\" (submit)=\"enviaFuncionario()\">\r\n  <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\r\n    <label class=\"sr-only\" for=\"inlineFormInput\">Nome</label>\r\n    <div [ngClass]=\"{'has-error':form.controls.nome.touched &&  (form.controls.nome.errors), 'has-success': !form.controls.nome.errors }\">\r\n      <input type=\"text\" class=\"form-control mb-2 mr-sm-2 mb-sm-0\" id=\"nome\" #nome name=\"nome\" formControlName=\"nome\" placeholder=\"*Nome\" autofocus>\r\n    </div>\r\n  </div>\r\n  <label class=\"sr-only\" for=\"inlineFormInputGroup\">E-mail</label>\r\n  <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\r\n    <div class=\"input-group-addon has-error\">@</div>\r\n    <div [ngClass]=\"{'has-error':form.controls.email.touched &&  (form.controls.email.errors), 'has-success': !form.controls.email.errors }\">\r\n      <input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"*E-mail\">\r\n    </div>\r\n  </div>\r\n  <button [disabled]=\"!form.valid\" type=\"submit\" class=\"btn btn-success\" >{{(!edit) ? 'Incluir' : 'Editar' }}</button>\r\n  <button *ngIf=\"(edit)\" type=\"button\" class=\"btn btn-danger\" (click)=\"onDeletar()\"  >Deletar</button>\r\n  <button  type=\"button\" class=\"btn btn-warning\" (click)=\"onLimpar()\" >Limpar</button>\r\n</form>\r\n\r\n<div class=\"bs-example\" data-example-id=\"table-within-panel\">\r\n  <div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">Funcionários cadastrados</div>\r\n    <table class=\"table table-striped table-hover \">\r\n      <thead>\r\n        <tr>\r\n          <th>#</th>\r\n          <th>Nome</th>\r\n          <th>E-mail</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let funcionario of funcionarios; let cont = index\" (click)=\"onEditItem(cont)\" >\r\n          <th scope=\"row\">{{cont}}</th>\r\n          <td >\r\n              {{funcionario.nome}}\r\n          </td>\r\n          <td> {{funcionario.email}}</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresafuncionarioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmpresafuncionarioComponent = (function () {
    function EmpresafuncionarioComponent(formBuilder, empresaService) {
        this.formBuilder = formBuilder;
        this.empresaService = empresaService;
        this.funcionarios = [];
        this.edit = false;
        this.indexFuncionario = -1;
        this.processing = false;
    }
    EmpresafuncionarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.subscription = this.empresaService.empresaChanged.subscribe(function (acao) {
            if (acao === 'cancelaracao') {
                _this.onLimpar();
                _this.funcionarios = [];
            }
            if (acao === "desabilitarcampos") {
                _this.desabilitaCampos();
            }
            if (acao === "habilitarcampos") {
                _this.habilitaCampo();
            }
        });
        this.funcionarios = this.empresaService.getFuncionario();
        if (!this.funcionarios) {
            this.funcionarios = [];
        }
    };
    EmpresafuncionarioComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EmpresafuncionarioComponent.prototype.desabilitaCampos = function () {
        this.form.controls["nome"].disable();
        this.form.controls["email"].disable();
        this.processing = true;
    };
    EmpresafuncionarioComponent.prototype.habilitaCampo = function () {
        this.form.controls["nome"].enable();
        this.form.controls["email"].enable();
        this.processing = false;
    };
    EmpresafuncionarioComponent.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            nome: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(100), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(5)]],
            email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(30),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]]
        });
    };
    //TODO: Verificar para não existir duplicidade de e-mail cadastrado.
    EmpresafuncionarioComponent.prototype.enviaFuncionario = function () {
        var funcionario = {
            nome: this.form.get("nome").value,
            email: this.form.get("email").value
        };
        if (!this.edit) {
            this.funcionarios.push(funcionario);
        }
        else {
            this.funcionarios[this.indexFuncionario] = funcionario;
        }
        this.empresaService.addFuncionario(this.funcionarios);
        this.onLimpar();
    };
    //deleta um registro da tela
    EmpresafuncionarioComponent.prototype.onDeletar = function () {
        this.funcionarios.splice(this.indexFuncionario, 1);
        this.indexFuncionario = -1;
        this.empresaService.addFuncionario(this.funcionarios);
        this.onLimpar();
    };
    //coloca o formulario em estado de edição.
    EmpresafuncionarioComponent.prototype.onEditItem = function (index) {
        var funcionario = this.funcionarios[index];
        this.form.get("nome").setValue(funcionario.nome);
        this.form.get("email").setValue(funcionario.email);
        this.edit = true;
        this.indexFuncionario = index;
    };
    //limpa os campos do formulario
    EmpresafuncionarioComponent.prototype.onLimpar = function () {
        this.form.reset();
        this.nome.nativeElement.focus();
        this.indexFuncionario = -1;
        this.edit = false;
    };
    return EmpresafuncionarioComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"])('nome'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"]) === "function" && _a || Object)
], EmpresafuncionarioComponent.prototype, "nome", void 0);
EmpresafuncionarioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-empresafuncionario',
        template: __webpack_require__("../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/empresa/empresafuncionario/empresafuncionario.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__empresa_service__["a" /* EmpresaService */]) === "function" && _c || Object])
], EmpresafuncionarioComponent);

var _a, _b, _c;
//# sourceMappingURL=empresafuncionario.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-striped table-hover \">\r\n  <thead>\r\n    <tr>\r\n      <th>#</th>\r\n      <th>Responsável</th>\r\n      <th>Nome fantasia</th>\r\n      <th>Celular</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let empresa of empresas; let i = index\" style=\"cursor: pointer\" (click)=\"onEditItem(empresa._id)\"  >\r\n      <td>{{i}}</td>\r\n      <td>{{empresa.nomeresponsavel}}</td>\r\n      <td>{{empresa.nomefantasia}}</td>\r\n      <td>{{empresa.celular}}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresalistaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmpresalistaComponent = (function () {
    function EmpresalistaComponent(empresaService, router) {
        this.empresaService = empresaService;
        this.router = router;
        this.empresas = [];
    }
    EmpresalistaComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('entrou ak');
        this.httpSubs = this.empresaService.getTodasEmpresas().subscribe(function (data) {
            console.log(data);
            _this.empresas = data.empresas;
        });
        this.subscription = this.empresaService.empresaChanged.subscribe(function (acao) {
            if (acao === "novo") {
                _this.router.navigate(["/empresa/cadastro"], { skipLocationChange: true });
            }
        });
    };
    EmpresalistaComponent.prototype.ngOnDestroy = function () {
        if (this.httpSubs)
            this.httpSubs.unsubscribe();
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    EmpresalistaComponent.prototype.onEditItem = function (empresaid) {
        //TODO: Fazer uma chamada para carregar a empresa com o id.
        this.router.navigate(['/empresa/cadastro', empresaid], { skipLocationChange: true });
    };
    return EmpresalistaComponent;
}());
EmpresalistaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-empresalista',
        template: __webpack_require__("../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/empresa/empresalista/empresalista.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__empresa_service__["a" /* EmpresaService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], EmpresalistaComponent);

var _a, _b;
//# sourceMappingURL=empresalista.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form-horizontal\" [formGroup]=\"form\" (submit)=\"enviaPergunta()\">\r\n  <div class=\"form-group\">\r\n    <label for=\"descricao\" class=\"col-lg-2 control-label\">Descrição</label>\r\n    <div class=\"col-lg-10\">\r\n      <input type=\"text\"\r\n      class=\"form-control\"\r\n      autofocus\r\n      #descricao\r\n      id=\"descricao\"\r\n      name=\"descricao\"\r\n      formControlName=\"descricao\" placeholder=\"*Descricao da pergunta\">\r\n    </div>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label class=\"col-lg-2 control-label\">Tipo pergunta</label>\r\n    <div class=\"col-lg-4\" >\r\n      <div class=\"radio\" *ngFor=\"let tipo of tipos; let i=index\">\r\n        <label>\r\n            <input type=\"radio\" name=\"tipo\" formControlName=\"tipo\" id=\"{{tipo.id}}\" value=\"{{tipo.id}}\">\r\n            {{tipo.descricao}}\r\n          </label>\r\n      </div>\r\n    </div>\r\n    <label class=\"col-lg-2 control-label\">Status</label>\r\n    <div class=\"col-lg-4\" >\r\n      <div class=\"radio\" *ngFor=\"let tstatus of status; let i=index\">\r\n        <label>\r\n            <input type=\"radio\" name=\"status\"\r\n            formControlName=\"status\"\r\n            id=\"{{tstatus.id}}\"\r\n            value=\"{{tstatus.id}}\">\r\n            {{tstatus.descricao}}\r\n          </label>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <div class=\"col-lg-10 col-lg-offset-2\">\r\n      <button [disabled]=\"!form.valid\" type=\"submit\" class=\"btn btn-success\">{{(!edit) ? 'Incluir' : 'Editar' }}</button>\r\n      <button *ngIf=\"(edit)\" type=\"button\" class=\"btn btn-danger\" (click)=\"onDeletar()\">Deletar</button>\r\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"onLimpar()\">Limpar</button>\r\n    </div>\r\n  </div>\r\n</form>\r\n\r\n<div class=\"bs-example\" data-example-id=\"table-within-panel\">\r\n  <div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">Perguntas cadastrados</div>\r\n    <table class=\"table table-striped table-hover \">\r\n      <thead>\r\n        <tr>\r\n          <th>#</th>\r\n          <th>Descricao</th>\r\n          <th>Tipo</th>\r\n          <th>Status</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let pergunta of perguntas; let cont = index\" (click)=\"onEditItem(cont)\" >\r\n          <th scope=\"row\">{{cont}}</th>\r\n          <td >\r\n              {{pergunta.descricao}}\r\n          </td>\r\n          <td>{{getTipo(pergunta.tipo)}}</td>\r\n          <td>{{getStatus(pergunta.status)}}</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__share_status_model__ = __webpack_require__("../../../../../src/app/share/status.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tipopergunta_model__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresapergunta/tipopergunta.model.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresaperguntaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmpresaperguntaComponent = (function () {
    function EmpresaperguntaComponent(formBuilder, empresaService, route) {
        this.formBuilder = formBuilder;
        this.empresaService = empresaService;
        this.route = route;
        this.perguntas = [];
        this.processing = false;
        this.edit = false;
        this.tipos = [
            new __WEBPACK_IMPORTED_MODULE_5__tipopergunta_model__["a" /* Tipopergunta */]("1", "Caixa de comentário"),
            new __WEBPACK_IMPORTED_MODULE_5__tipopergunta_model__["a" /* Tipopergunta */]("2", "O quanto indica a empresa"),
            new __WEBPACK_IMPORTED_MODULE_5__tipopergunta_model__["a" /* Tipopergunta */]("3", "5 estrelas")
        ];
        this.status = [
            new __WEBPACK_IMPORTED_MODULE_0__share_status_model__["a" /* Status */]("1", "Ativo"),
            new __WEBPACK_IMPORTED_MODULE_0__share_status_model__["a" /* Status */]("0", "Inativo")
        ];
    }
    EmpresaperguntaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.perguntas = [];
        this.edit = false;
        this.indexPergunta = -1;
        this.createForm();
        this.perguntas = this.empresaService.getPergunta();
        if (!this.perguntas)
            this.perguntas = [];
        this.subscription = this.empresaService.empresaChanged.subscribe(function (acao) {
            if (acao === "cancelaracao") {
                _this.form.reset();
                return;
            }
            if (acao === "desabilitarcampos") {
                _this.desabilitaCampos();
            }
            if (acao === "habilitarcampos") {
                _this.habilitaCampo();
            }
        });
    };
    EmpresaperguntaComponent.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    EmpresaperguntaComponent.prototype.desabilitaCampos = function () {
        this.form.controls["descricao"].disable();
        this.form.controls["tipo"].disable();
        this.form.controls["status"].disable();
        this.processing = true;
    };
    EmpresaperguntaComponent.prototype.habilitaCampo = function () {
        this.form.controls["descricao"].enable();
        this.form.controls["tipo"].enable();
        this.form.controls["status"].enable();
        this.processing = false;
    };
    EmpresaperguntaComponent.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            descricao: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].maxLength(50), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(5)]],
            tipo: ['1', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            status: ['1', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required]
        });
    };
    EmpresaperguntaComponent.prototype.onLimpar = function () {
        this.form.get("descricao").setValue("");
        this.form.get("tipo").setValue("1");
        this.form.get("status").setValue("1");
        this.descricao.nativeElement.focus();
        this.edit = false;
        this.indexPergunta = -1;
    };
    //coloca o formulario em estado de edição.
    EmpresaperguntaComponent.prototype.onEditItem = function (index) {
        var pergunta = this.perguntas[index];
        this.form.get("descricao").setValue(pergunta.descricao);
        this.form.get("tipo").setValue(pergunta.tipo);
        this.form.get("status").setValue(pergunta.status);
        this.edit = true;
        this.indexPergunta = index;
    };
    //deleta um registro da tela
    EmpresaperguntaComponent.prototype.onDeletar = function () {
        this.perguntas.splice(this.indexPergunta, 1);
        this.indexPergunta = -1;
        this.empresaService.addPergunta(this.perguntas);
        this.onLimpar();
    };
    EmpresaperguntaComponent.prototype.enviaPergunta = function () {
        var pergunta = {
            descricao: this.form.get("descricao").value,
            tipo: this.form.get("tipo").value,
            status: this.form.get("status").value
        };
        if (!this.edit) {
            this.perguntas.push(pergunta);
        }
        else {
            this.perguntas[this.indexPergunta] = pergunta;
        }
        this.empresaService.addPergunta(this.perguntas);
        this.onLimpar();
    };
    EmpresaperguntaComponent.prototype.getTipo = function (codigo) {
        return this.tipos.find(function (tipo) { return tipo.id === codigo; }).descricao;
    };
    EmpresaperguntaComponent.prototype.getStatus = function (codigo) {
        var oStatus = this.status.find(function (status) { return status.id === codigo; });
        if (oStatus) {
            return oStatus.descricao;
        }
        else {
            return "";
        }
    };
    return EmpresaperguntaComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"])('descricao'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"]) === "function" && _a || Object)
], EmpresaperguntaComponent.prototype, "descricao", void 0);
EmpresaperguntaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-empresapergunta',
        template: __webpack_require__("../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/empresa/empresapergunta/empresapergunta.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__empresa_service__["a" /* EmpresaService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object])
], EmpresaperguntaComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=empresapergunta.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresapergunta/tipopergunta.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tipopergunta; });
var Tipopergunta = (function () {
    function Tipopergunta(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }
    Tipopergunta.prototype.getTiposPerguntas = function () {
        return [
            new Tipopergunta("1", "Caixa de comentário"),
            new Tipopergunta("2", "O quanto indica a empresa"),
            new Tipopergunta("3", "5 estrelas")
        ];
    };
    return Tipopergunta;
}());

//# sourceMappingURL=tipopergunta.model.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"form-inline\" [formGroup]=\"form\" (submit)=\"onEnviarServico()\">\r\n  <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\r\n    <label class=\"sr-only\" for=\"inlineFormInput\">Descrição</label>\r\n    <div [ngClass]=\"{'has-error':form.controls.descricao.touched &&  (form.controls.descricao.errors), 'has-success': !form.controls.descricao.errors }\">\r\n      <input type=\"text\" class=\"form-control mb-2 mr-sm-2 mb-sm-0\" id=\"descricao\" #descricao name=\"descricao\" formControlName=\"descricao\" placeholder=\"*Descriação\" autofocus>\r\n    </div>\r\n  </div>\r\n  <label class=\"sr-only\" for=\"inlineFormInputGroup\">Quilometragem</label>\r\n  <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\r\n    <div [ngClass]=\"{'has-error':form.controls.quilometragem.touched &&  (form.controls.quilometragem.errors), 'has-success': !form.controls.quilometragem.errors }\">\r\n      <input type=\"text\" class=\"form-control\" id=\"quilometragem\" name=\"quilometragem\" formControlName=\"quilometragem\" placeholder=\"*Quilometragem\">\r\n    </div>\r\n  </div>\r\n  <label class=\"sr-only\" for=\"inlineFormInputGroup\">Tempo</label>\r\n  <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\r\n    <div [ngClass]=\"{'has-error':form.controls.tempo.touched &&  (form.controls.tempo.errors), 'has-success': !form.controls.tempo.errors }\">\r\n      <input type=\"text\" class=\"form-control\" id=\"tempo\" name=\"tempo\" formControlName=\"tempo\" placeholder=\"*Tempo\">\r\n    </div>\r\n  </div>\r\n  <button [disabled]=\"!form.valid\" type=\"submit\" class=\"btn btn-success\" >{{(!edit) ? 'Incluir' : 'Editar' }}</button>\r\n  <button *ngIf=\"(edit)\" type=\"button\" class=\"btn btn-danger\" (click)=\"onDeletar()\"  >Deletar</button>\r\n  <button  type=\"button\" class=\"btn btn-warning\" (click)=\"onLimpar()\" >Limpar</button>\r\n</form>\r\n\r\n<div class=\"bs-example\" data-example-id=\"table-within-panel\">\r\n  <div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">Definição dos serviços</div>\r\n    <table class=\"table table-striped table-hover \">\r\n      <thead>\r\n        <tr>\r\n          <th>#</th>\r\n          <th>Serviço</th>\r\n          <th>Quilometragem</th>\r\n          <th>Tempo</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let servico of servicos; let cont = index\" (click)=\"onEditItem(cont)\" >\r\n          <th scope=\"row\">{{cont}}</th>\r\n          <td >\r\n              {{servico.descricao}}\r\n          </td>\r\n          <td> {{servico.quilometragem}}</td>\r\n          <td> {{servico.tempo}}</td>\r\n        </tr>\r\n\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__empresa_service__ = __webpack_require__("../../../../../src/app/cadastro/empresa/empresa.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmpresaservicoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmpresaservicoComponent = (function () {
    function EmpresaservicoComponent(formBuilder, empresaService) {
        this.formBuilder = formBuilder;
        this.empresaService = empresaService;
        this.servicos = [];
        this.edit = false;
        this.indexServico = -1;
        this.processing = false;
        this.servicos = this.empresaService.getServico();
        this.createForm();
    }
    EmpresaservicoComponent.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            descricao: ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* Validators */].maxLength(100), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* Validators */].minLength(5)]],
            quilometragem: ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* Validators */].maxLength(15), __WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* Validators */].pattern(/[0-9]*/)]],
            tempo: ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["d" /* Validators */].maxLength(5)]]
        });
        //this.form.valueChanges.subscribe(data => this.onValueChanged(data));
    };
    /*
      onValueChanged(data) {
        console.log(data);
      }
    */
    EmpresaservicoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.empresaService.empresaChanged.subscribe(function (acao) {
            if (acao === 'cancelaracao') {
                _this.form.reset;
                _this.servicos = [];
            }
            if (acao === "desabilitarcampos") {
                _this.desabilitaCampos();
            }
            if (acao === "habilitarcampos") {
                _this.habilitaCampo();
            }
        });
    };
    EmpresaservicoComponent.prototype.ngOnDestroy = function () {
        if (this.subscription)
            this.subscription.unsubscribe();
    };
    EmpresaservicoComponent.prototype.desabilitaCampos = function () {
        this.form.controls["descricao"].disable();
        this.form.controls["quilometragem"].disable();
        this.form.controls["tempo"].disable();
        this.processing = true;
    };
    EmpresaservicoComponent.prototype.habilitaCampo = function () {
        this.form.controls["descricao"].enable();
        this.form.controls["quilometragem"].enable();
        this.form.controls["tempo"].enable();
        this.processing = false;
    };
    EmpresaservicoComponent.prototype.onEditItem = function (index) {
        var servico = this.servicos[index];
        this.form.get("descricao").setValue(servico.descricao);
        this.form.get("quilometragem").setValue(servico.quilometragem);
        this.form.get("tempo").setValue(servico.tempo);
        this.edit = true;
        this.indexServico = index;
    };
    EmpresaservicoComponent.prototype.onDeletar = function () {
        this.onLimpar();
    };
    EmpresaservicoComponent.prototype.onLimpar = function () {
        this.form.reset();
        this.edit = false;
    };
    EmpresaservicoComponent.prototype.onEnviarServico = function () {
        var servico = {
            descricao: this.form.get("descricao").value,
            quilometragem: this.form.get("quilometragem").value,
            tempo: this.form.get("tempo").value
        };
        if (!this.edit) {
            this.servicos.push(servico);
        }
        else {
            this.servicos[this.indexServico] = servico;
        }
        console.log('enviado o serivço para empresaservice');
        this.empresaService.addServico(this.servicos);
        this.onLimpar();
    };
    return EmpresaservicoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('nome'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"]) === "function" && _a || Object)
], EmpresaservicoComponent.prototype, "nome", void 0);
EmpresaservicoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'app-empresaservico',
        template: __webpack_require__("../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cadastro/empresa/empresaservico/empresaservico.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__empresa_service__["a" /* EmpresaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__empresa_service__["a" /* EmpresaService */]) === "function" && _c || Object])
], EmpresaservicoComponent);

var _a, _b, _c;
//# sourceMappingURL=empresaservico.component.js.map

/***/ }),

/***/ "../../../../../src/app/share/status.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Status; });
var Status = (function () {
    function Status(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }
    return Status;
}());

//# sourceMappingURL=status.model.js.map

/***/ })

});
//# sourceMappingURL=1.chunk.js.map