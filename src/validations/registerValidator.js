const { check, body } = require('express-validator');
const {getUsers} = require('../data/dataBase')
const db = require('../database/models')

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
        .custom( value => {
            return db.User.findOne({
                where:{
                    email : value
                }
                })
                .then(user => {
                    if(user){
                        return Promise.reject('Este mail ya está registrado')
                    }
                })
     
    })
    .withMessage('Este email ya está registrado'),

    check('pass')
    .isLength({
        min:6,
        max:12
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),
    
    check('pass')
    .isAlphanumeric(['es-ES'])
    .withMessage('La contraseña debe tener al menos una letra y un número'),

    body('pass2')
    .custom(function(value,{req}){
        if(value != req.body.pass){
            return false
        }
        return true
    })
    .withMessage('Las contraseñas no coinciden')

    
]