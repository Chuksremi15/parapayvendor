import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
  Text,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AppState, withdrawalRequest } from "../../../redux";
import { SubmitButton } from "../../Form";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useAjaxToast } from "../../Alert";
import { formatAmount } from "../../../utils";

export const WithdrawalModal: React.FC<UseDisclosureProps> = ({
  onClose,
  isOpen,
}) => {
  const dispatch = useDispatch();
  const toast = useAjaxToast();
  const { loading, error, success, token } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const { withdrawal: loading } = state.loadingIndicators;
    const {
      success: { withdrawal: success },
      errors: { withdrawal: error },
    } = state.ajaxStatuses;
    return {
      loading,
      error,
      success,
      token,
    };
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
      pin: "",
    },
    validationSchema: yup.object({
      amount: yup.string().required("Required"),
      pin: yup.string().required("Required"),
    }),

    onSubmit: ({ amount, pin }) => {
      dispatch(
        withdrawalRequest({
          token,
          data: { amount, pin },
        })
      );
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
      onClose && onClose();
    }
  }, [success, error]);

  return (
    <Modal
      onClose={onClose as () => void}
      size={"md"}
      isOpen={isOpen as boolean}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Withdrawal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Flex direction="column" py="15px">
              <FormControl mb={5} width="full">
                <Text mb={"2px"} className="color-dark font-sm font-weight-500">
                  Amount
                </Text>
                <InputGroup>
                  <InputLeftElement>
                    <Text className="color-gray-text font-sm" ml={2}>
                      NGN
                    </Text>
                  </InputLeftElement>
                  <NumberInput
                    width="full"
                    {...formik.getFieldProps("amount")}
                    placeholder="Amount"
                  >
                    <NumberInputField
                      {...formik.getFieldProps("amount")}
                      px="50px"
                      className="color-dark font-weight-500"
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl flex={1} mb={5} width="full">
                <Text mb={"2px"} className="color-dark font-sm font-weight-500">
                  Wallet Pin
                </Text>
                <InputGroup>
                  <NumberInput
                    {...formik.getFieldProps("pin")}
                    placeholder="Wallet Pin"
                    width="full"
                  >
                    <NumberInputField
                      {...formik.getFieldProps("pin")}
                      px="10px"
                      className="color-dark font-weight-500"
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <Flex direction="row" justify="flex-end" flex={0.6}>
                <SubmitButton loading={loading} action={formik.handleSubmit}>
                  Withdraw {formatAmount(+formik.values.amount)}
                </SubmitButton>
              </Flex>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
