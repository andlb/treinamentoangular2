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
        if (!req.body.password) {           
            if (erroMsg !="")  erroMsg !=","              
            erroMsg += " o senha "   
        }
        if (erroMsg != "" ) {
            erroMsg = "Por favor, preencha o(s) seguinte(s) campos: " + erroMsg
            res.json({success:false,message:erroMsg});
        }else {
            let user = new User({
                email:req.body.email.toLowerCase(),                
                password:req.body.password
            });
            user.save((err) =>{
                if (err){
                    if (err.code === 11000) {
                        res.json({success:false,message:"Usuário já cadastrado"});    
                    }else {
                        if (err.errors) {
                            if (err.errors.email) {
                                res.json({success:false,message:err.errors.email.message});                            
                                return;
                            }

                            if (err.errors.password) {
                                res.json({success:false,message:err.errors.password.message});                            
                                return;
                            }                             
                            res.json({success:false,message:err});                            
                            return;
                        }else {
                            res.json({success:false,message:"Usuário não pode ser salvo",err});
                            return; 
                        }                        
                    }
                    console.log("Erro> UserJs:"+err);                    
                }else{
                    res.json({success:true,message:"Usuário salvo"});
                }
            });
        }        
    });

    router.get('/checkEmail/:email',(req,res)=>{
        const retorno = {success : false, message : ''};
        if (!req.params.email){            
            retorno.message = 'e-mail não fornecido';                        
            res.json(retorno);
            return;
        }
        User.findOne({email: req.params.email},(err, user)=>{
            if (err){                
                retorno.message = err;
            }else{
                if (user) {
                    retorno.message = 'Usuário já cadastrado';
                }else {
                    retorno.success = true;
                    retorno.message = "Usuário disponível"
                }
            }
            res.json(retorno);
            return;
        });
    })

    return router;
}