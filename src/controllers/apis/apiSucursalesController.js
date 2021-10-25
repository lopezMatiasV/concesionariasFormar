const db =  require('../../database/models')
const getUrl = (req) =>
  req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
    list: (req, res) => {
        db.Sucursal.findAll({
            include: [{association: 'autos'}]
        })
        .then(sucursales => {
            res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: sucursales.length,
                  },
                  data: sucursales
            })
        })
    }
}