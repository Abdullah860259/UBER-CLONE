const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            length: [3, "first name should be atleast of 3 characters"]
        },

        lastname: {
            type: String,
            required: true,
            length: [3, "last name should be atleast of 3 characters"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        length: [5, "email should be atleast of 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    sockedId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, "color should be atleast of 3 characters"]
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, "plate should be atleast of 3 characters"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "capacity should be atleast of 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['bike', 'car', 'auto'],
        }

    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashedPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const Captain = mongoose.model('Captain', captainSchema);

module.exports = Captain;