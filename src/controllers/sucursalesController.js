let { getSucursales, getAutos } = require('../data/dataBase')

module.exports = {
    sucursales: (req, res) => {
        res.render('sucursales',{
            getSucursales
        })
    },
    sucursal : (req, res) => {
        let id_sucursal = req.params.IDsucursal.trim(); // Capturo el parametro de la ruta
        //guardo en una variable la sucursal que coincida con el parametro
        let sucursal = getSucursales.find(element => {
            return element.id === +id_sucursal
        })
        //guardo en una variable os autos que sean de esa sucursal
        let autos = getAutos.filter(auto => {
            return auto.sucursal === +id_sucursal
        })
        //renderiso la vista con los datos obtenidos
        res.render('sucursal', {
            sucursal,
            autos
        })
        
    }
}