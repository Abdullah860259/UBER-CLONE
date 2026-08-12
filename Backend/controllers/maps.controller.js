const mapsServices = require('../services/maps.services')
const { validationResult } = require("express-validator")

module.exports.getCoordinates = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { address } = req.query;
    try {
        const coordiates = await mapsServices.getAddressCoordinates(address);
        console.log(coordiates);
        return res.status(500).json({ coordiates });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    const { origin, destination } = req.body;
    try {
        const { distance, duration } = await mapsServices.getDistanceTime(origin, destination);
        return res.status(200).json({ distance, duration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports.getSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { q } = req.query;

    try {
        const data = await mapsServices.getSuggestionsOnQuery(q);
        res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internel Server Error' });
    }
}