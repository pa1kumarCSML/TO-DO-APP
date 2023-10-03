const mongoose = require('mongoose')

const todolists = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please provide title'],
    },
    description: {
        type: String,
        required: [true, 'please provide description'],
    },
    status: {
        type: Boolean,
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('todolists', todolists)