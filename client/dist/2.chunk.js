webpackJsonp([2],{

/***/ "../../../../../src/app/proprietario/propriedade-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autenticar_guards_notAuth_guard__ = __webpack_require__("../../../../../src/app/autenticar/guards/notAuth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__ = __webpack_require__("../../../../../src/app/autenticar/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__proprietario_component__ = __webpack_require__("../../../../../src/app/proprietario/proprietario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__veiculo_veiculo_component__ = __webpack_require__("../../../../../src/app/proprietario/veiculo/veiculo.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropriedadeRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var propriedadeRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__proprietario_component__["a" /* ProprietarioComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'proprietario', component: __WEBPACK_IMPORTED_MODULE_4__proprietario_component__["a" /* ProprietarioComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'veiculo/:id', component: __WEBPACK_IMPORTED_MODULE_5__veiculo_veiculo_component__["a" /* VeiculoComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__["a" /* AuthGuard */]] }
];
var PropriedadeRoutingModule = (function () {
    function PropriedadeRoutingModule() {
    }
    return PropriedadeRoutingModule;
}());
PropriedadeRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */].forChild(propriedadeRoutes)
        ],
        exports: [__WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */]],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__autenticar_guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_0__autenticar_guards_notAuth_guard__["a" /* NoAuthGuard */]
        ]
    })
], PropriedadeRoutingModule);

//# sourceMappingURL=propriedade-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/proprietario/proprietario.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/proprietario/proprietario.component.html":
/***/ (function(module, exports) {

module.exports = "<h2> {{proprietario?.nome | uppercase}}<i *ngIf=\"!processing\" class=\"fa fa-pencil fa-fw\" (click)='irProfile()'></i> </h2>\r\n<div class=\"container\">\r\n  <p class=\"text-warning\">{{proprietario?.endereco}} {{proprietario?.numero}} {{proprietario?.bairro}}</p>\r\n  <p class=\"text-warning\">{{proprietario?.cidade}} {{proprietario?.estado}} {{proprietario?.cep}}</p>\r\n</div>\r\n<div class=\"container\">\r\n  <div *ngFor=\"let servicorealizado of servicosrealizado;\">\r\n    <div class=\"alert alert-dismissible alert-success\">\r\n      Veiculo:\r\n      <strong>\r\n      {{servicorealizado.veiculo.marca}}\r\n      {{servicorealizado.veiculo.modelo}}\r\n  </strong> PLACA:\r\n      <strong>\r\n    {{servicorealizado.veiculo.placa}}\r\n    </strong>\r\n    <i style='cursor:pointer' class=\"fa fa-pencil fa-fw\" (click)='irVeiculo(servicorealizado.veiculo._id)'></i>\r\n    </div>\r\n    <div class=\"list-group\" *ngFor=\"let ordemservico of servicorealizado.ordensservico;\">\r\n      <a class=\"list-group-item active\">\r\n        <div class='container'>\r\n          <div class='col-sm-3'>\r\n            {{ordemservico.empresanome}}\r\n          </div>\r\n          <div class='col-sm-2'>\r\n            {{ordemservico.data}}\r\n          </div>\r\n          <div class='col-sm-2'>\r\n            Km: {{ordemservico.quilometragem}}\r\n          </div>\r\n          <div class='col-sm-2'>\r\n            Cel.: {{ordemservico.empresacelular}}\r\n          </div>\r\n        </div>\r\n      </a>\r\n      <a class=\"list-group-item\" *ngFor=\"let servico of ordemservico.servicos\">\r\n        <div class='container'>\r\n          <div class='col-sm-3'>\r\n            {{servico.descricao}}\r\n          </div>\r\n          <div class='col-sm-4'>\r\n          Dt próx. troca {{servico.proximatrocadata}}\r\n          </div>\r\n          <div class='col-sm-3'>\r\n           Km próx. troca {{servico.proximatroca}}\r\n          </div>\r\n        </div>\r\n      </a>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/proprietario/proprietario.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autenticar_auth_service__ = __webpack_require__("../../../../../src/app/autenticar/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__proprietario_service__ = __webpack_require__("../../../../../src/app/proprietario/proprietario.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProprietarioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProprietarioComponent = (function () {
    function ProprietarioComponent(authService, formBuilder, proprietarioServ, route, router) {
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.proprietarioServ = proprietarioServ;
        this.route = route;
        this.router = router;
        this.processing = false;
    }
    ProprietarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.processing = true;
        this.proprietarioId = this.authService.getUsuarioIdFromStorage();
        this.subsPesq = this.proprietarioServ
            .getDadosProprietario(this.proprietarioId)
            .subscribe(function (data) {
            if (!_this.authService.verTokenValido(data.tokeninvalido)) {
                _this.message = 'Usuário desconectado. Por favor, logue novamente.';
                _this.messageClass = "alert alert-danger";
                setTimeout(function () {
                    _this.router.navigate(["/login"]);
                }, 2000);
                return;
            }
            _this.proprietario = data.proprietario;
            _this.servicosrealizado = data.servicorealizados;
            _this.processing = false;
        });
    };
    ProprietarioComponent.prototype.ngOnDestroy = function () {
        if (this.subsPesqParamPropr)
            this.subsPesqParamPropr.unsubscribe();
        if (this.subsPesq)
            this.subsPesq.unsubscribe();
    };
    ProprietarioComponent.prototype.irProfile = function () {
        this.router.navigate(['/profile', this.proprietarioId, 'areaproprietario']);
    };
    ProprietarioComponent.prototype.irVeiculo = function (veiculoid) {
        this.router.navigate(['/areaproprietario/veiculo', veiculoid]);
    };
    return ProprietarioComponent;
}());
ProprietarioComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: "app-proprietario",
        template: __webpack_require__("../../../../../src/app/proprietario/proprietario.component.html"),
        styles: [__webpack_require__("../../../../../src/app/proprietario/proprietario.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__autenticar_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__autenticar_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__proprietario_service__["a" /* ProprietarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__proprietario_service__["a" /* ProprietarioService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _e || Object])
], ProprietarioComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=proprietario.component.js.map

/***/ }),

/***/ "../../../../../src/app/proprietario/proprietario.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__proprietario_component__ = __webpack_require__("../../../../../src/app/proprietario/proprietario.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__propriedade_routing_module__ = __webpack_require__("../../../../../src/app/proprietario/propriedade-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__veiculo_veiculo_component__ = __webpack_require__("../../../../../src/app/proprietario/veiculo/veiculo.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProprietarioModule", function() { return ProprietarioModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ProprietarioModule = (function () {
    function ProprietarioModule() {
    }
    return ProprietarioModule;
}());
ProprietarioModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__proprietario_component__["a" /* ProprietarioComponent */],
            __WEBPACK_IMPORTED_MODULE_5__veiculo_veiculo_component__["a" /* VeiculoComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__propriedade_routing_module__["a" /* PropriedadeRoutingModule */]
        ]
    })
], ProprietarioModule);

//# sourceMappingURL=proprietario.module.js.map

/***/ }),

/***/ "../../../../../src/app/proprietario/veiculo/veiculo.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/proprietario/veiculo/veiculo.component.html":
/***/ (function(module, exports) {

module.exports = "<div class='container'>\r\n  <h2> Atualizar dados do veículo </h2>\r\n  <div class=\"row show-hide-message\">\r\n    <div [ngClass]=\"messageClass\">\r\n      {{message}}\r\n    </div>\r\n  </div>\r\n  <form class=\"form-horizontal\" [formGroup]=\"form\" (submit)=\"enviaDados()\">\r\n    <div class=\"form-group\">\r\n      <div class=\"col-sm-11 col-sm-offset-1\">\r\n        <button [disabled]=\"!form.valid || processing\" type=\"submit\" class=\"btn btn-success\">Salvar</button>\r\n        <button [disabled]=\"processing\" type=\"button\" class=\"btn btn-info\" (click)=\"onVoltar()\">Voltar</button>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"placa\" class=\"col-sm-1 control-label\">Placa</label>\r\n      <div class=\"col-sm-2\">\r\n        <div [ngClass]=\"{'has-error':((form.controls.placa.touched) &&  (form.controls.placa.errors)), 'has-success': !form.controls.placa.errors }\">\r\n          <input type=\"text\" class=\"form-control\" autofocus #placa id=\"placa\" name=\"placa\" formControlName=\"placa\" placeholder=\"*Placa do veículo\">\r\n          <ul class=\"help-block\">\r\n            <li *ngIf=\"form.controls.placa.touched && form.controls.placa.errors?.required\">Informe a placa</li>\r\n            <li *ngIf=\"form.controls.placa.touched && form.controls.placa.errors?.pattern\">Placa inválida: AAA-9999</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n      <label for=\"marca\" class=\"col-sm-2 control-label\">Marca</label>\r\n      <div class=\"col-sm-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"marca\" name=\"marca\" formControlName=\"marca\" placeholder=\"*Marca do veículo\">\r\n      </div>\r\n      <label for=\"modelo\" class=\"col-sm-1 control-label\">Modelo</label>\r\n      <div class=\"col-sm-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"modelo\" name=\"modelo\" formControlName=\"modelo\" placeholder=\"*Modelo do veiculo\">\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"ano\" class=\"col-sm-1 control-label\">Ano</label>\r\n      <div class=\"col-sm-2\">\r\n        <input type=\"text\" class=\"form-control\" id=\"ano\" name=\"ano\" formControlName=\"ano\" placeholder=\"*ano do veiculo\">\r\n      </div>\r\n      <label for=\"anomodelo\" class=\"col-sm-2 control-label\">Ano modelo</label>\r\n      <div class=\"col-sm-2 col-sm-off-8\">\r\n        <input\r\n          type=\"text\"\r\n          class=\"form-control\"\r\n          id=\"anomodelo\"\r\n          name=\"anomodelo\"\r\n          formControlName=\"anomodelo\" placeholder=\"*Ano modelo\">\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/proprietario/veiculo/veiculo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autenticar_auth_service__ = __webpack_require__("../../../../../src/app/autenticar/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__proprietario_service__ = __webpack_require__("../../../../../src/app/proprietario/proprietario.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VeiculoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VeiculoComponent = (function () {
    function VeiculoComponent(formBuilder, route, router, proprietarioServ, authService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.proprietarioServ = proprietarioServ;
        this.authService = authService;
        this.edit = false;
        this.processing = false;
    }
    VeiculoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this.processing = true;
        this.subsPesquisaAtendimento = this.route.params.subscribe(function (params) {
            _this.veiculoid = params.id;
            if (_this.veiculoid) {
                _this.desabilitaCampos();
                _this.subPesquisa = _this.proprietarioServ
                    .getDadosVeiculo(_this.veiculoid)
                    .subscribe(function (data) {
                    if (!_this.authService.verTokenValido(data.tokeninvalido)) {
                        _this.message = 'Usuário desconectado. Por favor, logue novamente.';
                        _this.messageClass = "alert alert-danger";
                        setTimeout(function () {
                            _this.router.navigate(["/login"]);
                        }, 2000);
                        return;
                    }
                    if (!data.success) {
                        _this.messageErro(data.message);
                        return;
                    }
                    _this.veiculo = {
                        placa: data.veiculo.placa,
                        marca: data.veiculo.marca,
                        modelo: data.veiculo.modelo,
                        ano: data.veiculo.ano,
                        anomodelo: data.veiculo.anomodelo
                    };
                    _this.preencheFormulario();
                    _this.processing = false;
                    _this.habilitaCampo();
                });
            }
        });
    };
    VeiculoComponent.prototype.messageErro = function (message) {
        this.message = message;
        this.messageClass = "alert alert-danger";
    };
    VeiculoComponent.prototype.messageSuccess = function (message) {
        this.message = message;
        this.messageClass = "alert alert-success";
    };
    VeiculoComponent.prototype.preencheFormulario = function () {
        this.form.controls["placa"].setValue(this.veiculo.placa);
        this.form.controls["marca"].setValue(this.veiculo.marca);
        this.form.controls["modelo"].setValue(this.veiculo.modelo);
        this.form.controls["ano"].setValue(this.veiculo.ano);
        this.form.controls["anomodelo"].setValue(this.veiculo.anomodelo);
    };
    VeiculoComponent.prototype.desabilitaCampos = function () {
        this.processing = true;
        this.form.controls["placa"].disable();
        this.form.controls["marca"].disable();
        this.form.controls["modelo"].disable();
        this.form.controls["ano"].disable();
        this.form.controls["anomodelo"].disable();
    };
    VeiculoComponent.prototype.habilitaCampo = function () {
        this.form.controls["placa"].disable();
        this.form.controls["marca"].enable();
        this.form.controls["modelo"].enable();
        this.form.controls["ano"].enable();
        this.form.controls["anomodelo"].enable();
    };
    VeiculoComponent.prototype.createForm = function () {
        var servicosForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormArray */]([]);
        this.form = this.formBuilder.group({
            placa: "",
            marca: "",
            modelo: "",
            ano: "",
            anomodelo: ""
        });
    };
    VeiculoComponent.prototype.onLimpar = function () {
        this.placa.nativeElement.focus();
        this.edit = false;
        this.form.controls["placa"].setValue("");
        this.form.controls["marca"].setValue("");
        this.form.controls["modelo"].setValue("");
        this.form.controls["ano"].setValue("");
        this.form.controls["anomodelo"].setValue("");
    };
    //coloca o formulario em estado de edição.
    VeiculoComponent.prototype.onEditItem = function (index) {
        this.edit = true;
    };
    VeiculoComponent.prototype.enviaDados = function () {
        var _this = this;
        this.processing = true;
        this.desabilitaCampos();
        var veiculo = {
            veiculoid: this.veiculoid,
            placa: this.form.controls["placa"].value,
            marca: this.form.controls["marca"].value,
            modelo: this.form.controls["modelo"].value,
            ano: this.form.controls["ano"].value,
            anomodelo: this.form.controls["anomodelo"].value
        };
        this.subSalvar = this.proprietarioServ.enviarDadosVeiculo(veiculo).subscribe(function (data) {
            if (!data.success) {
                _this.processing = false;
                _this.messageErro(data.message);
                _this.habilitaCampo();
                return;
            }
            _this.messageSuccess('Dados alterado com sucesso');
            setTimeout(function () {
                _this.onVoltar();
            }, 2000);
            return;
        });
    };
    VeiculoComponent.prototype.onVoltar = function () {
        this.router.navigate(['/areaproprietario']);
    };
    VeiculoComponent.prototype.ngOnDestroy = function () {
        if (this.subsPesquisaAtendimento) {
            this.subsPesquisaAtendimento.unsubscribe();
        }
        if (this.subPesquisa) {
            this.subPesquisa.unsubscribe();
        }
        if (this.subSalvar) {
            this.subSalvar.unsubscribe();
        }
    };
    return VeiculoComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["ViewChild"])("placa"),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_core__["ElementRef"]) === "function" && _a || Object)
], VeiculoComponent.prototype, "placa", void 0);
VeiculoComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Component"])({
        selector: "app-veiculo",
        template: __webpack_require__("../../../../../src/app/proprietario/veiculo/veiculo.component.html"),
        styles: [__webpack_require__("../../../../../src/app/proprietario/veiculo/veiculo.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__proprietario_service__["a" /* ProprietarioService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__proprietario_service__["a" /* ProprietarioService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__autenticar_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__autenticar_auth_service__["a" /* AuthService */]) === "function" && _f || Object])
], VeiculoComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=veiculo.component.js.map

/***/ })

});
//# sourceMappingURL=2.chunk.js.map