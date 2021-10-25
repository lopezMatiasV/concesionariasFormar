let express = require('express');
let router = express.Router();
let controller = require('../controllers/apis/apiSucursalesController')

router.get('/sucursales', controller.list)

module.exports = router;