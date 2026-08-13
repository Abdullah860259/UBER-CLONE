const { Router } = require("express");
const authUserMiddleware = require("../middleware/authUser.middleware");
const mapsController = require("../controllers/maps.controller");
const { query, body } = require("express-validator");
const { validateStringOrObject } = require("../utils/ValidateStringOrObject");

const router = Router();

router.get(
  "/get-coordinates",
  [query("address").isString().isLength({ min: 3 })],
  authUserMiddleware.authUser,
  mapsController.getCoordinates,
);

router.post(
  "/get-distance-time",
  [
  body("origin").isObject(),
  body("origin.lat").isFloat({ min: -90, max: 90 }),
  body("origin.lng").isFloat({ min: -180, max: 180 }),

  body("destination").isObject(),
  body("destination.lat").isFloat({ min: -90, max: 90 }),
  body("destination.lng").isFloat({ min: -180, max: 180 }),
],
  authUserMiddleware.authUser,
  mapsController.getDistanceTime,
);

router.get(
  "/get-suggestions",
  [query("q").isString().isLength({ min: 3 })],
  authUserMiddleware.authUser,
  mapsController.getSuggestions,
);

module.exports = router;
