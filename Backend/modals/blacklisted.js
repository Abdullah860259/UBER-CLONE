const mongoose = require('mongoose');

const blackListTokenSchema = mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400 //in seconds
    }
})

const blackListTokenModal = mongoose.model('BlackListed Tokens', blackListTokenSchema);

module.exports = blackListTokenModal;