//requerimos la base de datos y los metodos para sobreescribir los json
const { validationResult } = require('express-validator');
let { getSucursales, getAutos, writeJson, writeJsonAutos} = require('../data/dataBase');
let db = require('../database/models')

//creamos el controlador
module.exports = {
    index : (req, res) => {
        res.render('admin/adminIndex.ejs',{
            session: req.session
        })
    },
    sucursales: (req, res) => {
        db.Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/adminSucursales',{
                sucursales,
                session: req.session
            })
        })
        /* res.render('admin/adminSucursales', {
            sucursales: getSucursales,
            session: req.session,
            autos: function (idSucursal) {
                return getAutos.filter(auto => {
                    return auto.sucursal === idSucursal
                })
            }
        }) */
    }, 
    formAgregarSucursal: (req, res) => {
        res.render('admin/agregarSucursal',{
            session: req.session
        })
    },
    agregarSucursal: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            let { nombre, direccion, telefono } = req.body
            db.Sucursal.create({
                nombre,
                direccion,
                telefono,
                imagen: req.file ? req.file.filename : "default-image.png"
            })
            .then(() => {
                res.redirect('/admin/sucursales')
            })
            /* let lastId = 1;
        
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
        
        res.redirect(`/admin/sucursales#${nuevaSucursal.id}`) */
        }else{
            res.render('admin/agregarSucursal',{
                errors: errors.mapped(),
                session: req.session,
                old: req.body
            })
        }
                
    },
    editForm: (req, res) => {
        db.Sucursal.findByPk(req.params.id)
        .then(sucursal => {
            res.render('admin/editarSucursal', {
                sucursal,
                session: req.session
            })
        })
        /* let sucursal = getSucursales.find(sucursal => {
            return sucursal.id === +req.params.id
        })

        res.render('admin/editarSucursal', {
            sucursal,
            session: req.session
        }) */
    },
    editarSucursal: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let sucursal = db.Sucursal.findByPk(req.params.id)
            let { nombre, direccion, telefono } = req.body;
            db.Sucursal.update({
                nombre,
                direccion,
                telefono,
                imagen: req.file ? req.file.filename : sucursal.imagen
            },{
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect('/admin/sucursales')
            })
        /* getSucursales.forEach(sucursal => {
            if(sucursal.id === +req.params.id){
                sucursal.id = sucursal.id,
                sucursal.nombre = nombre,
                sucursal.direccion = direccion,
                sucursal.telefono = telefono,
                sucursal.imagen = req.file ? req.file.filename : sucursal.imagen
            }
        })

        writeJson(getSucursales);

        res.redirect('/admin/sucursales') */
        }else{
            
            db.Sucursal.findByPk(req.params.id)
            .then(sucursal => {
                res.render('admin/editarSucursal', {
                    sucursal,
                    session: req.session,
                    errors: errors.mapped(),
                    old: req.body
                })
            })
            /* let sucursal = getSucursales.find(sucursal => sucursal.id === +req.params.id) 
            res.render('admin/editarSucursal', {
                sucursal,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            })*/
        }
        
    },
    borrarSucursal: (req, res) => {
        db.Sucursal.destroy({
            where:{
                id : req.params.id
            }
        })
        .then(() => {
            res.redirect('/admin/sucursales');
        })
        /* getSucursales.forEach(sucursal => {
            if(sucursal.id === +req.params.id){
                let sucursalAEliminar = getSucursales.indexOf(sucursal);
                getSucursales.splice(sucursalAEliminar, 1)
            }
        })
        writeJson(getSucursales);
        res.redirect('/admin/sucursales'); */
    },
    autos: (req, res) => {
        db.Auto.findAll()
        .then(autos => {
            res.render('admin/adminAutos', {
                getAutos: autos,
                session: req.session
            })
        })
        /* res.render('admin/adminAutos', {
            getAutos,
            session: req.session
        }) */
    },
    formAgregarAuto: (req, res) => {
        db.Sucursal.findAll()
        .then(sucursales => {
            res.render('admin/agregarAuto',{
                getSucursales: sucursales,
                session: req.session
            })
        })
        /* res.render('admin/agregarAuto',{
            getSucursales,
            session: req.session
        }) */
    },
    agregarAuto: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
         /* let lastId = 1;
            getAutos.forEach(auto => {
            if(auto.id > lastId){
                lastId = auto.id
            }
        }) */

        let { marca, modelo, anio, color, sucursal } = req.body
        res.send(req.body)
        db.Auto.create({
            marca,
            modelo,
            anio,
            color,
            sucursalId:sucursal,
            imagen: req.file ? req.file.filename : "default-image.png"
        })
        .then((result) => {
            res.send(result)
        })
        .catch(err => console.log(err))
        /* let nuevoAuto = {
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
        */
        }else{
            db.Sucursal.findAll()
            .then(sucursales => {
            res.render('admin/agregarAuto',{
                getSucursales: sucursales,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        })
            /* res.render('admin/agregarAuto',{
                getSucursales,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            }) */
        }
        
    },
    editFormAuto: (req, res) => {
        let sucursales = db.Sucursal.findAll()
        let autoParams = db.Auto.findByPk(req.params.id,{
            include:[{association: 'sucursal'}]
        })
        Promise.all([sucursales, autoParams])
        .then(([getSucursales, auto]) => {
            res.render('admin/editAuto', {
                auto,
                session: req.session,
                getSucursales
            })
        })
        /* let auto = getAutos.find(auto => auto.id === +req.params.id)
        res.render('admin/editAuto', {
            auto,
            session: req.session,
            getSucursales
        }) */
    },
    editAuto: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let auto = db.Auto.findByPk(req.params.id)
            let { marca, modelo, anio, color, sucursal } = req.body
            db.Auto.update({
                marca,
                modelo,
                anio,
                color,
                sucursalId: sucursal,
                imagen: req.file ? req.file.filename : auto.imagen
            },
            { where: { id : req.params.id}})
            .then(() => {
                res.redirect('/admin/autos')
            })
            .catch(error => console.log(error))
            /* getAutos.forEach(auto => {
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

        res.redirect('/admin/autos') */
        }else{
            let sucursales = db.Sucursal.findAll()
            let autoParams = db.Auto.findByPk(req.params.id,{
            include:[{association: 'sucursal'}]
            })
            Promise.all([sucursales, autoParams])
            .then(([getSucursales, auto]) => {
                res.render('admin/editAuto', {
                auto,
                session: req.session,
                getSucursales,
                errors: errors.mapped(),
                old: req.body
                })
            })
            /* let auto = getAutos.find(auto => auto.id === +req.params.id)
            res.render('admin/editAuto', {
                auto,
                getSucursales,
                session: req.session,
                errors: errors.mapped(),
                old: req.body
            }) */
        }
        
    },
    borrarAuto: (req, res) => {
        db.Auto.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(() => {
            return res.redirect('/admin/autos')
          })
        /* getAutos.forEach(auto => {
            if(auto.id === +req.params.id){
                let autoAEliminar = getAutos.indexOf(auto);
                getAutos.splice(autoAEliminar, 1)
            }
        })
        writeJsonAutos(getAutos);
        res.redirect('/admin/autos'); */
    },
}