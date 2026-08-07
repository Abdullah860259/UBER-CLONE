const axios = require("axios");

const getAddressCoordinates = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=jsonv2`;

    try {
        const res = await axios.get(url, {
            headers: {
                "User-Agent": "UberClone/1.0"
            }
        });

        if (!res.data.length) {
            throw new Error("Address not found");
        }

        return {
            lat: parseFloat(res.data[0].lat),
            lng: parseFloat(res.data[0].lon)
        };

    } catch (error) {
        console.error(error.message);
        throw new Error(error);
    }
};

module.exports.getAddressCoordinates = getAddressCoordinates;

module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin.lng || !origin.lat) {
        const coordinates = await getAddressCoordinates(origin);
        origin.lng = coordinates.lng;
        origin.lat = coordinates.lat;
    }

    if (!destination.lng || !destination.lat) {
        const coordinates = await getAddressCoordinates(destination);
        destination.lng = coordinates.lng;
        destination.lat = coordinates.lat;
    }

    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;

        const response = await axios.get(url);

        const route = response.data.routes[0];
        return {
            distance: `${(route.distance / 1000).toFixed(2)}`,
            duration: `${(route.duration / 60).toFixed(2)}`
        };
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}

module.exports.getSuggestionsOnQuery = async (q) => {
    try {
        const response = await axios.get(
            "https://photon.komoot.io/api/",
            {
                params: {
                    q: q,
                    limit: 5
                }
            }
        );
        const suggestions = response.data.features.map(place => ({
            name: place.properties.name,
            city: place.properties.city,
            country: place.properties.country,
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
        }));
        return suggestions;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}