import { getSchema } from "./joiSchema";

export const validate = (username, password, email, isLogin) => {
  const schemaToUse = getSchema(isLogin);

  // Only include email in the object if isLogin is false (signup scenario)
  const input = isLogin
    ? { username, password }
    : { email, username, password };

  const { error } = schemaToUse.validate(input, { abortEarly: false });

  if (!error) return null;

  const validationErrors = {};
  for (let item of error.details) {
    validationErrors[item.path[0]] = item.message;
  }

  return validationErrors;
};
