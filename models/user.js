const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {    
    if (!email) return false;
    if (email.length < 5 || email.length > 30 ) return false;
    return true;
}

let usernameLengthChecker = (username) => {
    if (!username) return false;
    if (username.length < 3 || username.length > 15) return false;
    return true;
}

let usernameValid = (username) => {    
    if (!username) return false;
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
}

let passwordValid = (password) => {
    if (!password) return false;
    if (password.length < 5) return false;
    return true;
}

const emailValidators = [
    {
        validator : emailLengthChecker, message: 'Preencha com um e-mail válido'
    }
]

const usernameValidators = [
    {
        validator: usernameLengthChecker, message: 'Preencha o username com mais de três caracteres'
    },
    {
        validator:usernameValid, message:'Preencha o username sem caracteres especiais'
    }
]
const passwordValidator = [
    {
        validator: passwordValid, message:'A senha tem que ter no minimo 5 caracteres'
    }
]

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate:usernameValidators },
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