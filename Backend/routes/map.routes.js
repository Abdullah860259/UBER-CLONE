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
    body("origin").custom((value) => validateStringOrObject(value)),
    body("destination").custom((value) => validateStringOrObject(value)),
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
