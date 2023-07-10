// Importing External Packages

const mongoose = require("mongoose")

// ..................................................................

const menuSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
})

const ResSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zip: {
            type: String
        }
    },
    menu: [menuSchema]
});

const Res = mongoose.model('Res', ResSchema);

module.exports = { Res };
