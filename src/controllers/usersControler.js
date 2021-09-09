const {getUsers, writeJsonUsers} = require('../data/dataBase')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

module.exports = {
    login: (req, res) => {
        res.render('users/login',{
            session: req.session
        })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            let user = getUsers.find(user => user.email === req.body.email)

        req.session.user = { 
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            avatar: user.avatar,
            rol: user.rol
        }
        if(req.body.recordar){
            res.cookie('concesionarias', req.session.user, {maxAge:1000*60*10})
        }
        res.redirect('/')
        }else{
            res.render('users/login',{
                errors: errors.mapped(),
                old : req.body,
                session: req.session
            })
        }
        
    },
    logout: (req, res) => {
        req.session.destroy();
        if(req.cookies.concesionarias){
            res.cookie('concesionarias','',{maxAge:-1})
        }
        
        res.redirect('/')
    },
    register: (req, res) => {
        res.render('users/register', {
            session: req.session
        })
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let lastId = 0;
        getUsers.forEach(user => {
            if(user.id > lastId){
                lastId = user.id
            }
        });
        let { nombre, apellido, email, pass } = req.body;
        
        let newUser = {
            id: lastId + 1,
            nombre,
            apellido,
            email,
            pass : bcrypt.hashSync(pass, 10),
            avatar: "default-image.png",
            rol: "user",
        };
        
        getUsers.push(newUser);

        writeJsonUsers(getUsers);

        res.redirect('/users/login')
        }else{
            res.render('users/register', {
                errors : errors.mapped(),
                session: req.session,
                old : req.body
            })
        }
        
    },
    profile: (req, res) => {
        let user = getUsers.find( user => user.id == req.session.user.id)
        res.render('users/profile', {
            session: req.session,
            user
        })
    },
    editProfile: (req, res) => {
        let user = getUsers.find(user => user.id === req.session.user.id)
        let { nombre, direccion, telefono } = req.body
        user.id = user.id
        user.nombre = nombre
        user.direccion = direccion
        user.telefono = telefono
        user.avatar = req.file ? req.file.filename : user.avatar

        writeJsonUsers(getUsers)

        req.session.user = user
        res.redirect('/users/profile')

    }
}