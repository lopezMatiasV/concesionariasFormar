const { check, body } = require('express-validator');
const { getUsers } = require('../data/dataBase');
const bcrypt = require('bcryptjs')
const db = require('../database/models')

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('pass')
    .custom((value, {req}) => {
        return db.User.findOne({
            where:{
                email : req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value,user.dataValues.pass)){ 
                return Promise.reject('No coincide la contraseña')
            }
        })
        .catch(() => {
            return Promise.reject('Credenciales Inválidas')
        })
    })
]   