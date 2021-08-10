import {
  Modal,
  Flex,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useLayoutEffect } from "react";
import { BsWallet } from "react-icons/bs";
import { formatAmount } from "../../../utils";
import {
  BankInformation,
  FullScreenSpinnerWithText,
  SectionCard,
  SetWalletPin,
  SubmitButton,
  useAjaxToast,
  WithdrawalModal,
} from "../../components";
import { FaWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  AppState,
  saveWalletDetailsRequest,
  getBanksRequest,
  getWalletDetailsRequest,
} from "../../../redux";

const Wallet = (): JSX.Element => {
  const dispatch = useDispatch();
  const {
    getWalletDetailsSuccess,
    getWalletDetailsLoading,
    token,
    walletDetails,
    success,
    error,
    loading,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const {
      success: {
        getWalletDetails: getWalletDetailsSuccess,
        withdrawal: success,
      },
      errors: { saveWalletDetails: error },
    } = state.ajaxStatuses;
    const {
      getWalletDetails: getWalletDetailsLoading,
      saveWalletDetails: loading,
    } = state.loadingIndicators;
    const { walletDetails } = state.wallet;
    return {
      getWalletDetailsSuccess,
      getWalletDetailsLoading,
      token,
      walletDetails,
      success,
      error,
      loading,
    };
  });
  const toast = useAjaxToast();
  useLayoutEffect(() => {
    if (!getWalletDetailsSuccess) dispatch(getWalletDetailsRequest({ token }));
  }, []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (getWalletDetailsLoading)
    return (
      <FullScreenSpinnerWithText
        spinning={getWalletDetailsLoading}
        text="Preparing Wallet"
      />
    );
  return (
    <div>
      <Stack direction="column" spacing="40px">
        <Stack direction="row" spacing="10px" align="stretch">
          <Box flex={0.25}>
            <SectionCard
              title={
                <Flex align="center" justify="space-between" wrap="nowrap">
                  <FaWallet size={25} className="color-primary" />
                  <Text>
                    <span className="font-weight-500 font-sm color-gray-text capitalize">
                      Wallet balance
                    </span>
                  </Text>
                </Flex>
              }
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                className="padding-vertical-sm"
              >
                <span className="font-xlg">
                  {formatAmount(
                    walletDetails?.available_balance
                      ? +walletDetails?.available_balance
                      : 0
                  )}
                </span>
              </Flex>
              <div className="d-flex flex-center">
                <SubmitButton className="margin-top-md" action={onOpen}>
                  Withdraw Fund
                </SubmitButton>
              </div>
              <WithdrawalModal isOpen={isOpen} onClose={onClose} />
            </SectionCard>
          </Box>
          <Box flex={0.75}>
            <BankInformation />
          </Box>
        </Stack>
        <SetWalletPin />
      </Stack>
    </div>
  );
};

export default Wallet;
