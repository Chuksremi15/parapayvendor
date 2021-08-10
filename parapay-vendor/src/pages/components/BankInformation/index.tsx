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
import {
  AppState,
  getBanksRequest,
  saveWalletDetailsRequest,
} from "../../../redux";
// import {   } from 'react-select'

const BankInformation: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    getBanksSuccess,
    getBanksLoading,
    banks,
    token,
    walletDetails,
    success,
    error,
    loading,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const {
      success: { getBanks: getBanksSuccess, saveWalletDetails: success },
      errors: { saveWalletDetails: error },
    } = state.ajaxStatuses;
    const {
      getBanks: getBanksLoading,
      saveWalletDetails: loading,
    } = state.loadingIndicators;
    const { banks } = state.misc;
    const { walletDetails } = state.wallet;
    return {
      getBanksSuccess,
      getBanksLoading,
      banks,
      token,
      walletDetails,
      success,
      error,
      loading,
    };
  });
  const toast = useAjaxToast();
  const formik = useFormik({
    initialValues: {
      bank_name: "",
      account_name: "",
      account_number: "",
      bank_code: "",
    },
    validationSchema: yup.object({
      bank_name: yup.string().required("Required"),
      account_name: yup.string().required("Required"),
      account_number: yup.string().required("Required"),
      bank_code: yup.string().required("Required"),
    }),
    onSubmit: (props) => {
      dispatch(saveWalletDetailsRequest({ data: props, token }));
    },
  });
  useLayoutEffect(() => {
    if (!getBanksSuccess) dispatch(getBanksRequest({ token }));
  }, []);
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

  useEffect(() => {
    if (walletDetails?.bank_details) {
      formik.setValues((values) => ({
        ...values,
        bank_name: walletDetails?.bank_details?.bank_name as string,
        bank_code: walletDetails?.bank_details?.bank_code as string,
        account_number: walletDetails?.bank_details?.account_number as string,
        account_name: walletDetails?.bank_details?.account_name as string,
      }));
    }
  }, [walletDetails?.bank_details]);
  const formatBankCodes = useMemo(
    () => banks.map((bank) => ({ value: bank.bankcode, label: bank.bankname })),
    [banks.length]
  );
  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setValues((values) => ({
      ...values,
      bank_code: e.target.value,
      bank_name: formatBankCodes.find((bank) => bank.value === e.target.value)
        ?.label as string,
    }));
  };
  return (
    <SectionCard
      title={
        <Flex align="center" wrap="nowrap">
          <RiBankCardFill size={25} className="color-primary margin-right-md" />
          <Text>
            <span className="font-weight-500 font-sm color-gray-text capitalize">
              Bank Information
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
        <Box flex={1}>
          <Select
            mb={0}
            isLoading={getBanksLoading}
            label="Bank Name"
            placeholder="Select..."
            options={formatBankCodes}
            onChange={handleBankChange}
            value={
              formatBankCodes.find(
                (bank) => bank.value === formik.values.bank_code
              )?.value
            }
          />
        </Box>
        <FormControl flex={1} mb={5}>
          <Text mb={"2px"} className="color-dark font-sm font-weight-500">
            Account No.
          </Text>
          <InputGroup>
            <NumberInput
              {...formik.getFieldProps("account_number")}
              placeholder="Account Number"
            >
              <NumberInputField
                {...formik.getFieldProps("account_number")}
                px="10px"
                className="color-dark font-weight-500"
              />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormInput
          flex={1}
          mb={0}
          label="Account name"
          {...formik.getFieldProps("account_name")}
          errorText={formik.errors.account_name}
          placeholder="Enter account name"
        />
      </Stack>
      <Flex justify="end">
        <Box flex={0.2}>
          <SubmitButton
            loading={loading}
            disabled={!(formik.dirty && formik.isValid)}
            action={formik.handleSubmit}
          >
            Save Changes
          </SubmitButton>
        </Box>
      </Flex>
    </SectionCard>
  );
};

export default BankInformation;
