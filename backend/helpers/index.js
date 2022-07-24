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

module.exports = {
  requiredFields,
  findEmptyFields,
};
