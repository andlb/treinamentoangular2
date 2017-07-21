const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

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

let passwordValid = (password) => {
    if (!password) return false;
    if (password.length < 5) return false;
    return true;
}

const emailValidators = [
    {
        validator : emailLengthChecker, message: 'E-mail deve ter entre 5 e 30 caracteres'
    },
    {
        validator : emailValidation, message: 'E-mail deve ser válido'
    }
]


const passwordValidator = [
    {
        validator: passwordValid, message:'A senha tem que ter no minimo 5 caracteres'
    }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },    
    password: { type: String, required: true, validate: passwordValidator },
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) 
    return next();
    
    bcrypt.hash(this.password,null,null,  (err,hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

//return true or false
userSchema.methods.comparePassword = (password) =>{
    return bcrypt.compareSync(password,this.password);
}
module.exports = mongoose.model('User', userSchema);