let express = require('express');
let router = express.Router();
let {sucursales, 
    formAgregarSucursal, 
    agregarSucursal, 
    index,
    editForm,
    editarSucursal,
    borrarSucursal,
    autos,
    formAgregarAuto,
    agregarAuto,
    editFormAuto,
    editAuto,
    borrarAuto,
} = require('../controllers/adminController');
//Middlewares
let uploadFile = require('../middlewares/uploadFiles');
let adminCheck = require('../middlewares/userAdminCheck')
//Validations
let autosValidator = require('../validations/autosValidator')
let sucursalValidator = require('../validations/sucursalValidator')
/* Index del admin */
router.get('/', /* adminCheck, */ index)

/* Mostrar todas las sucursales */
router.get('/sucursales', /* adminCheck, */ sucursales)

/* Formulario para Agregar sucursal */
router.get('/agregarSucursal', /* adminCheck, */ formAgregarSucursal);
/* Envia y guarda los datos para Agregar sucursal */
router.post('/agregarSucursal', /* adminCheck, */ uploadFile.single('image'), sucursalValidator, agregarSucursal);

/* Formulario de edicion */
router.get('/editarSucursal/:id',/* adminCheck, */ editForm);
/* PUT - Recibe los datos de edicion */
router.put('/editarSucursal/:id',/* adminCheck, */ uploadFile.single('image'), sucursalValidator, editarSucursal);

/* DELETE - Borra una sucursal */
router.delete('/eliminarSucursal/:id', /* adminCheck, */ borrarSucursal)

/*ADMINISTRACION DE AUTOS*/
router.get('/autos', /* adminCheck, */ autos);
router.get('/agregarAuto', /* adminCheck, */ formAgregarAuto);
router.post('/agregarAuto', /* adminCheck, */ uploadFile.single('image'), autosValidator, agregarAuto);
router.get('/editarAuto/:id', /* adminCheck, */ editFormAuto);
router.put('/editarAuto/:id', /* adminCheck, */ uploadFile.single('image'), autosValidator, editAuto);
router.delete('/eliminarAuto/:id', /* adminCheck, */ borrarAuto)

module.exports = router;