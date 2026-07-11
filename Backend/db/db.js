const mongoose = require('mongoose');
const dns = require("dns"); dns.setServers(["1.1.1.1", "8.8.8.8"]);

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected To DB");
    }).catch((err) => {
        console.log(err);
    })
}
module.exports = connectToDB;