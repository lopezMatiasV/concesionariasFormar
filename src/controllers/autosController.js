//let { getAutos, getSucursales } = require('../data/dataBase')
let db = require('../database/models')

let autosController = {
    listar: (req, res) => {
        db.Auto.findAll()
        .then(autos => {
            res.render('autos', {
                autos,
                session:req.session
            })
        })
        /* res.render('autos', {
            autos: getAutos,
            session:req.session
        }) */
    },   
    auto : (req, res) => {
        db.Auto.findByPk(req.params.id,{
            include:[{association: 'sucursal'}]
        })
        .then(auto => {
            res.render('autoDetail', {
                auto,
                sucursal: auto.sucursal,
                session:req.session
            })
        })
        /* let auto = getAutos.find(auto => {
            return auto.id === +req.params.id 
        })
        let sucursal = getSucursales.find(sucursal => sucursal.id == auto.sucursal)
        res.render('autoDetail', {
            auto,
            sucursal,
            session:req.session
        })  */  
    }
}

module.exports = autosController