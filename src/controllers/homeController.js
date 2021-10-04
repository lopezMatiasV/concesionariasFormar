let { getSucursales, getAutos } = require('../data/dataBase')
//creo
const db = require('../database/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize')

module.exports = {
    index: (req, res) => {
        db.Sucursal.findAll()
            .then(sucursales => {
                res.render('home', {
                    sucursales,
                    titulo: "Conocé nuestras sucursales",
                    session:req.session
                })
            })
        /* res.render('home', {
            titulo: "Conocé nuestras sucursales",
            sucursales: getSucursales,
            session: req.session
        }) */
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        db.Auto.findAll({
            where: {modelo: {[Op.substring]: busqueda}
              }
        })
        .then(autos => {
            res.render('search',{
                autos,
                busqueda,
                session: req.session
            })
        })
        /* let busqueda = req.query.search.toLowerCase()
        let autos = getAutos.filter(auto => 
            auto.marca.toLowerCase() == busqueda || auto.modelo.toLowerCase() == busqueda || auto.anio == busqueda
        );
        res.render('search',{
            autos,
            busqueda,
            session: req.session
        })   */      
    }
}

