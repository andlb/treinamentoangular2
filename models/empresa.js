///TODO: Criar um validador para tempo, respeitando o formato que permite 6h 5m e etc.

///Dados cadastrais da empresa.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let cepValidation = (cep) => {    
    const regExp = new RegExp(/\d{5}\-\d{3}/);
    return regExp.test(cep);
}

let telefoneValidation = (telefone) => {
    const regExp = new RegExp(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/);
    return regExp.test(telefone);
}

let emailLengthChecker = (email) => {
    if (!email) return false;
    if (email.length < 5 || email.length > 30) return false;
    return true;
}

let emailValidation = (email) => {
    if (!email) return false;
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
}

const cepValidators = [{    
        validator: cepValidation,
        message: 'CEP não válido'
    }
]

const emailValidators = [{
        validator: emailLengthChecker,
        message: 'E-mail deve ter entre 5 e 30 caracteres'
    },
    {
        validator: emailValidation,
        message: 'E-mail deve ser válido'
    }
]

const telefoneValidators = [{    
        validator: telefoneValidation,
        message: 'Telefone inválido'
    }
]

//emailautenticado, é quando ele através do e-mail entra com o login e a senha e acessa o sistema.
const empresaSchema = new Schema({
    razaosocial: { type: String, required: [true, "Razão social não informado"] },
    nomefantasia: { type: String, required: [true, "Nome fantasia não informado"] },
    nomeresponsavel: { type: String, required: [true, "Nome responsável não informado"] },    
    telefone: { type: String,required: [true, "Telefone não informado"],validate:telefoneValidators },
    celular: { type: String, required: [true, "Celular não informado"],validate:telefoneValidators },    
    email: { type: String , validate: emailValidators},    
    endereco: {
        endereco: { type: String },
        bairro: { type: String },
        numero: { type: String },
        complemento: { type: String },
        cidade: { type: String },
        estado: { type: String },
        cep: { type: String, validate:cepValidators },
    },
    convidados: [{
        nome: { type: String },
        email: { type: String, validate: emailValidators },
    }],
    servicos: [{
        descricao: { type: String },
        tempo: { type: String },
        quilometragem: { type: Number }
    }],
    perguntas: [{
        descricao: { type: String },
        tipo: { type: String } ,
        ativo: { type: Boolean }       
    }],    
    respUltimaAlteracao: [{
        usuario: { type: String },
        Data: { type: Date, default: Date.now() }
    }]    
});

module.exports = mongoose.model('Empresa', empresaSchema);