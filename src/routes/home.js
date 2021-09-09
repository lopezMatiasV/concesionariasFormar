let express = require('express');
let router = express.Router();
let controller = require('../controllers/homeController')
let cookieCheck = require('../middlewares/cookieCheck')

router.get('/', cookieCheck, controller.index)
router.get('/search', controller.search)


module.exports = router;