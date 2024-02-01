import  ajv  from "../services/ajv.format.validation.service.js";

const createUserFormatValidation = (schema) => {
  const validateRegisterSchema = ajv.ajv.compile(schema);
  return (req, res, next) => {
    const isValid = validateRegisterSchema(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: false,
        message: "Error Occurs In Validation of the Request body",
        error: validateRegisterSchema.errors,
      });
    }
    next();
  };
};


export default {
  createUserFormatValidation,
};