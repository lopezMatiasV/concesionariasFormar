//requerimos la base de datos y los metodos para sobreescribir los json
const { validationResult } = require('express-validator');
let { getSucursales, getAutos, writeJson, writeJsonAutos} = require('../data/dataBase');

//creamos el controlador
module.exports = {
    index : (req, res) => {
        res.render('admin/adminIndex.ejs',{
            session: req.session
        })
    },
    sucursales: (req, res) => {

        res.render('admin/adminSucursales', {
            sucursales: getSucursales,
            session: req.session,
            autos: function (idSucursal) {
                return getAutos.filter(auto => {
                    return auto.sucursal === idSucursal
                })
            }
        })
    }, 
    formAgregarSucursal: (req, res) => {
        res.render('admin/agregarSucursal',{
            session: req.session
        })
    },
    agregarSucursal: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let lastId = 1;
        
        getSucursales.forEach(sucursal => {
            if(sucursal.id > lastId){
                lastId = sucursal.id
            }
        })

        let { nombre, direccion, telefono } = req.body

        let nuevaSucursal = {
            id: lastId + 1,
            nombre: nombre.trim(),
            direccion: direccion.trim(),
            telefono: telefono.trim(),
            imagen: req.file ? req.file.filename : "default-image.png" //Si existe req.file (si subieron un archivo), guarda el nombre de ese archivo en el JSON, y si no guarda el "default-image.png".
        }


        getSucursales.push(nuevaSucursal)

        writeJson(getSucursales);
        
        res.redirect(`/admin/sucursales#${nuevaSucursal.id}`)
        }else{
            res.render('admin/agregarSucursal',{
                errors: errors.mapped(),
                session: req.session,
                old: req.body
            })
        }
                
    },
    editForm: (req, res) => {
        let sucursal = getSucursales.find(sucursal => {
            return sucursal.id === +req.params.id
        })

        res.render('admin/editarSucursal', {
            sucursal,
            session: req.session
        })
    },
    editarSucursal: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let { nombre, direccion, telefono } = req.body;

        getSucursales.forEach(sucursal => {
            if(sucursal.id === +req.params.id){
                sucursal.id = sucursal.id,
                sucursal.nombre = nombre,
                sucursal.direccion = direccion,
                sucursal.telefono = telefono,
                sucursal.imagen = req.file ? req.file.filename : sucursal.imagen
            }
        })

        writeJson(getSucursales);

        res.redirect('/admin/sucursales')
        }else{
            let sucursal = getSucursales.find(sucursal => sucursal.id === +req.params.id)
            res.render('admin/editarSucursal', {
                sucursal,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })
        }
        
    },
    borrarSucursal: (req, res) => {
        getSucursales.forEach(sucursal => {
            if(sucursal.id === +req.params.id){
                let sucursalAEliminar = getSucursales.indexOf(sucursal);
                getSucursales.splice(sucursalAEliminar, 1)
            }
        })
        writeJson(getSucursales);
        res.redirect('/admin/sucursales');
    },
    autos: (req, res) => {
        res.render('admin/adminAutos', {
            getAutos,
            session: req.session
        })
    },
    formAgregarAuto: (req, res) => {
        res.render('admin/agregarAuto',{
            getSucursales,
            session: req.session
        })
    },
    agregarAuto: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            let lastId = 1;
        getAutos.forEach(auto => {
            if(auto.id > lastId){
                lastId = auto.id
            }
        })

        let { marca, modelo, anio, color, sucursal } = req.body

        let nuevoAuto = {
            id: lastId + 1,
            marca: marca.trim(),
            modelo: modelo.trim(),
            anio: anio,
            color: color,
            sucursal: +sucursal,
            imagen: req.file ? req.file.filename : "default-image.png" //Si existe req.file (si subieron un archivo), guarda el nombre de ese archivo en el JSON, y si no guarda el "default-image.png".
        }
        
        getAutos.push(nuevoAuto)
        writeJsonAutos(getAutos);
        res.redirect(`/admin/autos#${nuevoAuto.id}`)
        //res.redirect('/admin/autos')
        }else{
            res.render('admin/agregarAuto',{
                getSucursales,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })
        }
        
    },
    editFormAuto: (req, res) => {
        let auto = getAutos.find(auto => auto.id === +req.params.id)
        res.render('admin/editAuto', {
            auto,
            session: req.session,
            getSucursales
        })
    },
    editAuto: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let { marca, modelo, anio, color, sucursal } = req.body
        getAutos.forEach(auto => {
            if(auto.id === +req.params.id){
                auto.id = auto.id,
                auto.marca = marca,
                auto.modelo = modelo,
                auto.anio = anio,
                auto.color = color,
                auto.sucursal = +sucursal,
                auto.imagen = req.file ? req.file.filename : auto.imagen
            }
        })

        writeJsonAutos(getAutos);

        res.redirect('/admin/autos')
        }else{
            let auto = getAutos.find(auto => auto.id === +req.params.id)
            res.render('admin/editAuto', {
                auto,
                getSucursales,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })
        }
        
    },
    borrarAuto: (req, res) => {
        getAutos.forEach(auto => {
            if(auto.id === +req.params.id){
                let autoAEliminar = getAutos.indexOf(auto);
                getAutos.splice(autoAEliminar, 1)
            }
        })
        writeJsonAutos(getAutos);
        res.redirect('/admin/autos');
    },
}