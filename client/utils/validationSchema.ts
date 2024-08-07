import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signUpSchema = yup.object().shape({
  username: yup.string().min(8, 'Username must be a least 8 characters').required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  displayName: yup.string().required("Required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, { message: "Password must be at least 8 characters included uppercase, lowercase and number" })
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

export const forgotPasswordSchema = yup.object().shape({
  username: yup.string().min(8, 'At least 8 characters').required("Required"),
})

export const changePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "Password must be at least 8 characters included uppercase, lowercase and number" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required")
})

export const newThreadSchema = yup.object().shape({
  title: yup
    .string()
    .required("Required"),
  description: yup
    .string()
    .required("Required")
})