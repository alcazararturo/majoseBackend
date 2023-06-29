const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// crear el servidor de express
const app = express()

//Base de datos
dbConnection()

//Cors
app.use(cors({origin: '*'}));

// Path público
// const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( 'public' ) );

// lectura y parseo del body
app.use(express.json());

//rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

//escuchar peticiones
app.listen(process.env.PORT, (err) => {
    if ( err ) {
        console.log(err);
        throw new Error(err);
    }
    console.log( `servidor corriendo en el puerto ${process.env.PORT}` )
})

