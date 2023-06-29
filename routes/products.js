/* 
Rutas auth: host + /api/products
*/
const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearProducto, getProducto, getProductoxSlug,  putProducto, deleteProducto } = require('../controllers/products');
const { validarCampos } = require('../middlewares/validarcampos');
const { validarJWT } = require('../middlewares/validarjwt');


router.get('/', getProducto)
router.get('/:id', getProductoxSlug)
router.put('/:id', putProducto)
router.delete('/:id', deleteProducto)
router.post(
    '/',
    [
        check('brand'      , 'La marca es obligatorio').not().isEmpty(),
        check('subbrand'   , 'La submarca es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatorio').not().isEmpty(),
        check('slug'       , 'El slug es obligatorio').not().isEmpty(),
        check('title'      , 'El nombre del producto es obligatorio').not().isEmpty(),
        // check('user', 'El usuario es obligatorio').not().isEmpty(),
        validarCampos, validarJWT
    ],
    crearProducto
    );

    module.exports = router;
     
    
   
