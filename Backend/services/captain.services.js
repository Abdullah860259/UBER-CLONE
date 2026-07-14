const captainModel = require("../modals/captain.modal");

module.exports.createCaptain = async ({
    fullname, email, password, vehicle
}) => {
    const captain = await captainModel.create({
        fullname,
        email,
        password,
        vehicle
    });
    return captain;
}