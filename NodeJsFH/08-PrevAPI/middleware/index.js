
const validateField = require("./validate_fields");
const validateJWT = require("./validateJWT");
const validateRoles = require("./validateRoles");

module.exports = {
      ...validateField,
      ...validateJWT,
      ...validateRoles
}