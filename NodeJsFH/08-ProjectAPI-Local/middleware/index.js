
const validateField = require("../middleware/validate_fields");
const validateJWT = require("../middleware/validateJWT");
const validateRoles = require("../middleware/validateRoles");

module.exports = {
      ...validateField,
      ...validateJWT,
      ...validateRoles
}