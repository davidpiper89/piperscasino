import Joi from "joi-browser";

export const getSchema = (isLogin) => {
  let baseSchema = {
    username: Joi.string().min(4).max(30).required().label("Username"),
    password: Joi.string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=^\S*$).{8,30}$/
      )
      .label("Password")
      .options({
        language: {
          string: {
            regex: {
              base: "must have at least 1 uppercase letter, 1 lowercase letter, 1 numeric number, 1 special character and no spaces.",
            },
          },
        },
      }),
  };

  if (!isLogin) {
    baseSchema.email = Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email");

    baseSchema.confirmPassword = Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
      .error((errors) => {
        errors.forEach((err) => {
          if (err.path && err.path[0] === 'confirmPassword' && err.type === "any.allowOnly") {
            err.message = "Passwords do not match";
          }
        });
        return errors;
      });
  } 

  return Joi.object(baseSchema);
};

