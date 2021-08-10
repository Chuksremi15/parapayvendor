import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import {
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  InputGroup,
  FormControl,
  Box,
  Stack,
} from "@chakra-ui/react";
import { SectionCard, SubmitButton, Select } from "../../components";
import { TiWarning } from "react-icons/ti";
import { RiBankCardFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAjaxToast, FormInput } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppState, getBanksRequest, setWalletPinRequest } from "../../../redux";
// import {   } from 'react-select'

const SetWalletPin: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { token, success, error, loading } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const {
      success: { setWalletPin: success },
      errors: { setWalletPin: error },
    } = state.ajaxStatuses;
    const { setWalletPin: loading } = state.loadingIndicators;
    const { banks } = state.misc;
    return {
      banks,
      token,
      success,
      error,
      loading,
    };
  });
  const toast = useAjaxToast();
  const formik = useFormik({
    initialValues: {
      old_pin: "",
      new_pin: "",
      confirm_new_pin: "",
    },
    validationSchema: yup.object({
      old_pin: yup.string().required("Required"),
      new_pin: yup.string().required("Required"),
      confirm_new_pin: yup.string().required("Required"),
    }),
    onSubmit: (props) => {
      dispatch(setWalletPinRequest({ data: props, token }));
    },
  });
  useEffect(() => {
    if (error)
      toast({
        status: "error",
        description: error,
      });
    if (success) {
      toast({
        status: "success",
        description: success,
      });
    }
  }, [success, error]);

  return (
    <SectionCard
      title={
        <Flex align="center" wrap="nowrap">
          <RiBankCardFill size={25} className="color-primary margin-right-md" />
          <Text>
            <span className="font-weight-500 font-sm color-gray-text capitalize">
              Set Wallet Pin
            </span>
          </Text>
        </Flex>
      }
    >
      <Stack
        direction="row"
        align="center"
        spacing={2}
        justify="space-between"
        width="full"
      >
        <FormControl flex={1} mb={5}>
          <Text mb={"2px"} className="color-dark font-sm font-weight-500">
            Old Pin
          </Text>
          <InputGroup>
            <NumberInput
              {...formik.getFieldProps("old_pin")}
              placeholder="Old Pin"
            >
              <NumberInputField
                {...formik.getFieldProps("old_pin")}
                px="10px"
                className="color-dark font-weight-500"
              />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl flex={1} mb={5}>
          <Text mb={"2px"} className="color-dark font-sm font-weight-500">
            New Pin
          </Text>
          <InputGroup>
            <NumberInput
              {...formik.getFieldProps("new_pin")}
              placeholder="New Pin"
            >
              <NumberInputField
                {...formik.getFieldProps("new_pin")}
                px="10px"
                className="color-dark font-weight-500"
              />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl flex={1} mb={5}>
          <Text mb={"2px"} className="color-dark font-sm font-weight-500">
            Confirm New Pin
          </Text>
          <InputGroup>
            <NumberInput
              max={4}
              {...formik.getFieldProps("confirm_new_pin")}
              placeholder="Confirm New Pin"
            >
              <NumberInputField
                max={4}
                {...formik.getFieldProps("confirm_new_pin")}
                px="10px"
                className="color-dark font-weight-500"
              />
            </NumberInput>
          </InputGroup>
        </FormControl>
      </Stack>
      <Flex justify="end">
        <Box flex={0.2}>
          <SubmitButton
            loading={loading}
            disabled={!(formik.dirty && formik.isValid)}
            action={formik.handleSubmit}
          >
            Set Pin
          </SubmitButton>
        </Box>
      </Flex>
    </SectionCard>
  );
};

export default SetWalletPin;
