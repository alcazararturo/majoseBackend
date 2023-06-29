/* 
Rutas auth: host + /api/auth
*/
const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginUsuario, revalidaToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');

router.post(
    '/new',
    [
        check('fullName', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe de ser mínimo de 6 caracteres').isLength({min:6}),
        validarCampos,
    ],
    crearUsuario );
router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe de ser mínimo de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario );

router.get('/renew', validarJWT ,revalidaToken );

module.exports = router;