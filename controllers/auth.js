const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generaJWT } = require('../helpers/jwt')

const crearUsuario = async(req=request, res = response) => {
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese email'
            })
        }

        user = new User(req.body);

        // Encriptar contraseña        
        const salt = bcrypt.genSaltSync();
        
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        
        // GENERAR JWT
        const token = await generaJWT(user.id, user.fullName)

        res.status(201).json({
            ok: true,
            id: user.id,
            name: user.fullName,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}

const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    console.log(email);

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario o password no existe'
            })
        }
        // Confirmar los passwords
        const validPass = bcrypt.compareSync(password, user.password)
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'user o password incorrectos'
            })
        }

        //Generar JWT
        const token = await generaJWT(user.id, user.fullName)

        res.status(200).json({
            ok: true,
            id: user.id,
            name: user.fullName,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}

const revalidaToken = async(req, res = response) => {
    const uid  = req.uid;
    const name = req.fullName; 

    // Generar JWT
const token = await generaJWT(uid, name)
    res.json({
        ok: true,
        token
    })
}

module.exports =  { crearUsuario, loginUsuario, revalidaToken }