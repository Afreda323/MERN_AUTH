export const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password", "confirm"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.password && values.password.length < 6) {
    errors.password = "Enter a longer password";
  }
  if (
    values.confirm &&
    values.confirm.length >= 6 &&
    values.confirm !== values.password
  ) {
    errors.confirm = "Passwords do not match.";
  }
  return errors;
};