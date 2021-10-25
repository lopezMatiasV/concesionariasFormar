let { getSucursales, getAutos } = require('../data/dataBase')
let db = require('../database/models')

module.exports = {
    sucursales: (req, res) => {
        db.Sucursal.findAll()
        .then(sucursales => {
            //res.send(sucursales)
            res.render('sucursales',{
                getSucursales: sucursales,
                session: req.session
            })
        })
        /* res.render('sucursales',{
            getSucursales,
            session: req.session
        }) */
    },
    sucursal : (req, res) => {
        db.Sucursal.findByPk(+req.params.IDsucursal,{
            include:[{association: "autos"}]
        })
        .then(sucursal => {
            res.render('sucursal', {
                sucursal,
                autos: sucursal.autos,
                session: req.session
            })
        })
        /* let id_sucursal = req.params.IDsucursal.trim();
        let sucursal = getSucursales.find(element => {
            return element.id === +id_sucursal
        })
        let autos = getAutos.filter(auto => {
            return auto.sucursal === +id_sucursal
        })
        res.render('sucursal', {
            sucursal,
            autos,
            session: req.session
        }) */
        
    }
}