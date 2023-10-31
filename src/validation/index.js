import { getSchema } from "./joiSchema";

export const validate = (
  username,
  password,
  email,
  isLogin,
  confirmPassword
) => {
  const schemaToUse = getSchema(isLogin);

  const input = isLogin
    ? { email, password }
    : { email, username, password, confirmPassword };

  const { error } = schemaToUse.validate(input, { abortEarly: false });

  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }

  return validationErrors;
};
