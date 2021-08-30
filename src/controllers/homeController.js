let { getSucursales, getAutos } = require('../data/dataBase')

module.exports = {
    index: (req, res) => {
        res.render('home', {
            titulo: "Conocé nuestras sucursales",
            sucursales: getSucursales,
        })
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        let autos = getAutos.filter(auto => 
            auto.marca.toLowerCase() == busqueda || auto.modelo.toLowerCase() == busqueda
        );
        res.render('search',{
            autos,
            busqueda
        })        
    }
}

