const mongoose = require('mongoose');
require('dotenv').config()

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('DB Online')
    } catch (error) {
        console.log(error);
        //main().catch(error => console.log(error));
        throw new Error('Error al conectarse a la DB')
    }
}

module.exports = {
    dbConnection
}