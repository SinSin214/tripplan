import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signUpSchema = yup.object().shape({
  username: yup.string().min(8, 'At least 8 characters').required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required")
});

export const signInSchema = yup.object().shape({
  username: yup.string().min(8, 'At least 8 characters').required("Required"),
  password: yup
    .string()
    .required("Required")
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
})