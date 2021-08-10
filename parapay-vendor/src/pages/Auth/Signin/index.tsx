import React, { useEffect } from "react";
import { SubmitButton, FormInput, useAjaxToast } from "../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { Text, Flex, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginRequest, AppState } from "../../../redux";

const SignIn: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const toast = useAjaxToast();
  const { loading, error, success } = useSelector((state: AppState) => {
    const { login: loading } = state.loadingIndicators;
    const {
      success: { login: success },
      errors: { login: error },
    } = state.ajaxStatuses;
    return { loading, error, success };
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
      password: yup
        .string()
        .test("len", "Password too short", (len) =>
          len ? len.length >= 8 : false
        ),
    }),

    onSubmit: ({ email, password }) => {
      dispatch(loginRequest({ email, password }));
    },
  });
  useEffect(() => {
    if (error)
      toast({
        title: "error",
        description: error,
      });
  }, [error]);
  if (success) return <Redirect to="/dashboard" />;
  return (
    <Box className="bg-white slim-border" p={10} borderRadius={8}>
      <Flex direction="column" mb={5}>
        <Text
          as="h2"
          mb={3}
          className="capitalize color-dark font-md font-weight-600"
        >
          Sign in
        </Text>
        <Text className="capitalize color-dark font-sm">
          Please enter your details
        </Text>
      </Flex>
      <Flex direction="column" align="center">
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            {...formik.getFieldProps("email")}
            placeholder="email@example.com"
            label="Email"
            isRequired
            labelClassName="color-blue-medium"
          />
          <FormInput
            {...formik.getFieldProps("password")}
            placeholder="Password"
            type="password"
            label="Password"
            isRequired
            labelClassName="color-primary"
          />
          {/* <Select label="Role" options={roles} placeholder="--Select role--" /> */}
          {/* <Flex justify="flex-end">
            <Box
              as="button"
              type="button"
              className="color-gray-text font-sm"
              mb={2}>
              Forgot Password?
            </Box>
          </Flex> */}
          <SubmitButton
            loading={loading}
            disabled={!(formik.isValid && formik.dirty)}
            action={formik.handleSubmit}
          >
            Sign in
          </SubmitButton>
        </form>
      </Flex>
    </Box>
  );
};

export default SignIn;
