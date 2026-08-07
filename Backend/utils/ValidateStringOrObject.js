module.exports.validateStringOrObject = (value) => {
    if (typeof value === "string") {
        if (value.length < 3) {
            throw new Error("Input must be at least 3 characters");
        }
        return true;
    }

    if (typeof value === "object" && value !== null) {
        if (!value.lat || !value.lng) {
            throw new Error("Input must contain lat and lng");
        }

        return true;
    }

    throw new Error("Invalid origin format");
}