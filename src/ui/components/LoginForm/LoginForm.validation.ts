// yup validation for login

import * as yup from "yup";

export const loginValidation = yup.object().shape({
  username: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});