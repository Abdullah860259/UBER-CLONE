const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
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
        length: [5, "last name should be atleast of 5 characters"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    otp: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    expiry: {
        type: Date,
        default: null
    },
    sockedId: {
        type: String,
    }
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    console.log('sending token', token);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModal = mongoose.model("User", userSchema);

module.exports = userModal;