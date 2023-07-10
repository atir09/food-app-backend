// Importing External Packages

const mongoose = require("mongoose")

// ..................................................................

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {UserModel};
