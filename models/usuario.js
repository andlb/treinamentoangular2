//cadastro do usuário.
///TODO: Se o usuário for do tipo empresa, irá direto para a tele de cadastro de serviço.
///TODO: Se o usuário for do tipo proprietário, irá direto para a tela de cadastro de veiculo.
///TODO: Quando o usuário não terminar o cadastro dele, ele terá que acessar a tela de profile para terminar o cadastro.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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

let passwordValid = (password) => {
    if (!password) return false;
    if (password.length < 5) return false;
    return true;
}

let tipoValidation = (tipo) => {
    if ((tipo < 0) || (tipo > 2)) return false;
    return true;
}

const emailValidators = [{
        validator: emailLengthChecker,
        message: 'E-mail deve ter entre 5 e 30 caracteres'
    },
    {
        validator: emailValidation,
        message: 'E-mail deve ser válido'
    }
]


const passwordValidator = [{
    validator: passwordValid,
    message: 'A senha tem que ter no minimo 5 caracteres'
}]

const tipoValidator = [{
    validator: tipoValidation,
    message: 'Tipo inválido. Selecione 0 para proprietário, 1 para convidado e 2 para funcionário e proprietário'
}]

const usuarioSchema = new Schema({
    nome: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    password: { type: String, required: true, validate: passwordValidator },    
    tipo: { type: Number, required: true, validate:tipoValidator },//0 - proprietário, 1 convidado, 2 proprietário e convidado
    cpf:{type:String},
    endereco: {
        endereco: { type: String },
        bairro: { type: String },
        numero: { type: String },
        complemento: { type: String },
        cidade: { type: String },
        estado: { type: String },
        cep: { type: String },
    },
    cadastrocompleto: { type: Boolean, default: false }
});

usuarioSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

//return true or false
usuarioSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Usuario', usuarioSchema);