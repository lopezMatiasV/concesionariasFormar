let express = require('express');
let router = express.Router();
let { login,
    processLogin,
    logout,
    register,
    processRegister,
    profile,
    editProfile,
    eliminar
} = require('../controllers/usersControler')
let upAvatar = require('../middlewares/upAvatar') 
let sessionUserCheck = require('../middlewares/sessionUserCheck')
let registerValidator = require('../validations/registerValidator')
let loginValidator = require('../validations/loginValidator')


router.get('/login',  login);
router.post('/login', loginValidator, processLogin)
router.get('/logout', logout)
router.get('/register', register)
router.post('/register', registerValidator, processRegister)
router.get('/profile', sessionUserCheck, profile)
router.put('/editProfile/:id', upAvatar.single('avatar'),  editProfile)
router.delete('/delete/:id', eliminar )


module.exports = router;