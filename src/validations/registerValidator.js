const { check, body } = require('express-validator');
const {getUsers} = require('../data/dataBase')

module.exports = [
    check('nombre')
        .notEmpty().withMessage('Tienes que completar tu nombre').bail()
        .isLength({ min:3 }).withMessage('Tu nombre debe tener mínimo 3 caracteres'),
    
    check('apellido')
        .notEmpty().withMessage('Tienes que completar tu apellido').bail()
        .isLength({ min:3 }).withMessage('El apellido debe tener mas de 3 caracteres'),
    
    check('email')
        .isEmail().withMessage('ingresa un email válido').bail()
        .notEmpty().withMessage('Tienes que completar con tu email'),
    
    body('email')
        .custom(function(value){
        console.log(value)

        let usuario = getUsers.filter(user=>{ //filtro la base de datos y asigno el resultado a una varaible
            return user.email == value //aplico la condición si coincide el mail que el usuario ingresó en el imput con que está registrado
        })
        if(usuario == false){ 
            return true 
        }else{
            return false 
        }
     
    })
    .withMessage('Este email ya está registrado'),

    check('pass')
    .isLength({
        min:6,
        max:12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('pass2')
    .custom(function(value,{req}){
        if(value != req.body.pass){
            return false
        }
        return true
    })
    .withMessage('Las contraseñas no coinciden')

    
]