const User = require('../models/user');
module.exports = (router) => {
    router.post('/register', (req, res) => {
        //  req.body.email
        // req.body.username;
        // req.body.password;
        let erroMsg = ""
        if (!req.body.email) {                        
            if (erroMsg !="")  erroMsg !="," 
            erroMsg += " o e-mail "   
        }
        if (!req.body.username) {            
            if (erroMsg !="")  erroMsg !=","             
            erroMsg += " o username "   
        }
        if (!req.body.password) {           
            if (erroMsg !="")  erroMsg !=","              
            erroMsg += " o senha "   
        }
        if (erroMsg != "" ) {
            erroMsg = "Por favor, preencha o(s) seguinte(s) campos: " + erroMsg
            res.json({sucess:false,message:erroMsg});
        }else {
            let user = new User({
                email:req.body.email.toLowerCase(),
                username:req.body.username.toLowerCase(),
                password:req.body.password
            });
            user.save((err) =>{
                if (err){
                    if (err.code === 11000) {
                        res.json({sucess:false,message:"Usuário já cadastrado"});    
                    }else {
                        if (err.errors) {
                            if (err.errors.email) {
                                res.json({sucess:false,message:err.errors.email.message});                            
                                return;
                            }
                            if (err.errors.username) {
                                res.json({sucess:false,message:err.errors.username.message});                            
                                return;
                            } 
                            if (err.errors.password) {
                                res.json({sucess:false,message:err.errors.password.message});                            
                                return;
                            }                             
                            res.json({sucess:false,message:err});                            
                            return;
                        }else {
                            res.json({sucess:false,message:"Usuário não pode ser salvo",err});
                            return; 
                        }
                        
                    }
                    console.log("Erro> UserJs:"+err);                    
                }else{
                    res.json({sucess:true,message:"Usuário salvo"});
                }
            });
        }        
    });

    return router;
}