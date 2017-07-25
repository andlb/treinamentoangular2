///TODO: Criar um validador para tempo, respeitando o formato que permite 6h 5m e etc.

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let emailLengthChecker = (email) => {    
    if (!email) return false;
    if (email.length < 5 || email.length > 30 ) return false;
    return true;
}

let emailValidation = (email) => {
    if (!email) return false;
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
}

const emailValidators = [
    {
        validator : emailLengthChecker, message: 'E-mail deve ter entre 5 e 30 caracteres'
    },
    {
        validator : emailValidation, message: 'E-mail deve ser válido'
    }
]


const empresaSchema = new Schema({
    razaosocial: { type: String, required: [true,"Razão social não definido"] },    
    fantasia: { type: String, required: [true,"Nome fantasia não definido"] },    
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },    
    telefone: { type: String },    
    celular: { type: String, required:[true, "Celular não definido"] },    
    endereco:{
      endereco:{ type: String },    
      bairro:{ type: String },  
      numero:{ type: String },  
      complemento:{ type: String },  
      cidade:{ type: String },    
      estado:{ type: String },    
      cep:{ type: String },    
    },
    convidados:[{
      nome:{ type: String },    
      email:{ type: String, validate: emailValidators },    
    }], 
    servicos:[{
      descricao:{type:String},
      tempo:{type:String},
      quilometragem:{type:Number}
    }],
    respUltimaAlteracao:[{
      usuario:{ type: String },    
      Data:{type:Date, default:Date.now()}
    }]
});


module.exports = mongoose.model('Empresa', empresaSchema);