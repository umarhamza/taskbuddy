var { isEmpty } = require("lodash");

const requiredFields = ["title", "status", "notes"];

const findEmptyFields = (fields) => {
  const emptyFields = [];

  for (const field in fields) {
    if (Object.hasOwnProperty.call(fields, field)) {
      const value = fields[field];
      if (requiredFields.includes(field) && isEmpty(value))
        emptyFields.push(field);
    }
  }

  return emptyFields;
};

// Error response
const errorResponse = ({ res, error = null, message, status = 400 }) => {
  const msg = message ?? error.message;
  if (error) console.error(error);
  return res.status(status).json({ msg });
};

// Is Mongo ID valid
const isValidMongoId = ({
  id,
  res,
  message = "Incorrect ID. No task found!",
}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    errorResponse({ res, message });
    return true;
  }
  return false;
};

module.exports = {
  requiredFields,
  findEmptyFields,
  errorResponse,
  isValidMongoId,
};
