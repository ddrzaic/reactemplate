import React from "react";
import * as S from "./LoginForm.styled";
import { Button, Input } from "..";
import { useFormik } from "formik";
import { loginValidation } from "./LoginForm.validation";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { replace } = useRouter();
  const { values, setFieldValue, errors, submitForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      replace("/dashboard");
    },
    validationSchema: loginValidation,
    validateOnBlur: true,
  });

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <S.LoginFormContainer>
      <Input
        label="Username"
        value={values.username}
        onChange={(value) => setFieldValue("username", value)}
        error={errors.username}
      />
      <Input
        label="Password"
        value={values.password}
        onChange={(value) => setFieldValue("password", value)}
        type="password"
        error={errors.password}
      />
      <Button onClick={() => handleSubmit()}>Login</Button>
    </S.LoginFormContainer>
  );
}
