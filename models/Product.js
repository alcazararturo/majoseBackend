const { Schema, model } = require('mongoose')
const User = require('./User')

const ProductSchema = Schema({    
    brand      : { type: String, required: true },
    subbrand   : { type: String, required: true },
    description: { type: String, required: true },
    inStock    : { type: Number, default: 0 },
    price      : { type: Number, default: 0 },
    sizes      : [{type: String }],
    color      : { type: String  },
    weight     : { type: String  },
    slug       : { type: String, required: true, unique: true },
    tags       : [{type: String }],
    title      : { type: String, required: true },
    type       : { type: String  },
    gender     : { type: String  },
    images     : [{type: String }],
    user       : { type: Schema.Types.ObjectId, ref: User, required: true },
    createdAt  : { type: String  },
    updatedAt  : { type: String  },
})

ProductSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Product', ProductSchema)
