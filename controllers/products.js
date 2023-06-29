const { request, response } = require('express');
const Product = require('../models/Product');

const getProducto = async(req, res = response) => {
    try {
        const product = await Product.find().populate('user', 'fullName');
        return res.status(200).json({
            ok: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const getProductoxSlug = async(req=request, res = response) => {
    const { slug } = req.params.id;
    
    try {
        const product = await Product.findOne({ slug })
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe con ese slug'
            })
        }
        
        return res.status(200).json({
            ok: true,
            product
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const crearProducto = async(req, res = response) => {    
    const product = new Product(req.body);
    const slug = product.slug;
    try {

        let data = await Product.findOne({ slug })
        if (data) {
            return res.status(400).json({
                ok:false,
                msg: 'El producto ya existe'
            })
        }
        
        product.user = req.uid;
        await product.save();

        return res.status(201).json({
            ok: true,
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const putProducto = async(req=request, res = response) => {
    const { id } = req.params.id;
    
    try {
        const product = await Product.findOne({ id })
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe con ese slug'
            })
        }
        if (product.user.toString() !== req.uid ){
            return res.status(401).json({
                ok:false,
                msg: 'no tiene privilegios para editar este producto'
            })
        }
        const newProducto = {
            ...req.body,
            user: uid
        }

        const productUpdated = await Product.findByIdAndUpdate(product.id, newProducto, { new: true });

        return res.status(200).json({
            ok: true,
            product: productUpdated
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const deleteProducto = async(req=request, res = response) => {
    const { id } = req.params.id;
    
    try {

        const product = await Product.findOne({ id })
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe'
            })
        }

        await Product.findOneAndDelete({id});

        return res.status(200).json({ ok: true })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

module.exports = {
    crearProducto,
    getProducto,
    getProductoxSlug,
    putProducto,
    deleteProducto
}