import React, { useEffect, useLayoutEffect } from "react";
import {
  Box,
  Text,
  Center,
  Flex,
  FormControl,
  NumberInputField,
  NumberInput,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import {
  SubmitButton,
  useAjaxToast,
  FullScreenSpinner,
  Select,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  AppState,
  updateVoteSettingsRequest,
  getVoteSettingsRequest,
} from "../../../redux";

const VoteSettings: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const toast = useAjaxToast();
  const {
    loading,
    error,
    success,
    token,
    getVoteSettingsLoading,
    vote_settings,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const { vote_settings } = state.voteSettings;
    const {
      updateVoteSettings: loading,
      getVoteSettings: getVoteSettingsLoading,
    } = state.loadingIndicators;
    const {
      success: { updateVoteSettings: success },
      errors: { updateVoteSettings: error },
    } = state.ajaxStatuses;
    return {
      loading,
      error,
      success,
      token,
      getVoteSettingsLoading,
      vote_settings,
    };
  });

  const formik = useFormik({
    initialValues: {
      max_vote_per_time: "",
      vote_cost: "",
      contestant_referral_to_vote: "",
      contestant_has_referral_vote: true,
    },
    validationSchema: yup.object({
      max_vote_per_time: yup.string().required("Required"),
      vote_cost: yup.string().required("Required"),
      contestant_referral_to_vote: yup.string().required("Required"),
      contestant_has_referral_vote: yup.bool().required("Required"),
    }),

    onSubmit: (props) => {
      const data: any = props;
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === "boolean") return;
        data[key] = `${data[key]}`;
      });
      dispatch(
        updateVoteSettingsRequest({
          token,
          data,
        })
      );
    },
  });

  useLayoutEffect(() => {
    if (!vote_settings) {
      console.log("Am I working");
      dispatch(getVoteSettingsRequest({ token }));
    }
  }, []);

  useEffect(() => {
    if (vote_settings) {
      formik.setValues(
        (values) => ({
          ...values,
          contestant_has_referral_vote: vote_settings.contestant_has_referral_vote as boolean,
          contestant_referral_to_vote: vote_settings.contestant_referral_to_vote as string,
          max_vote_per_time: vote_settings.max_vote_per_time as string,
          vote_cost: vote_settings.vote_cost as string,
        }),
        true
      );
    }
  }, [vote_settings]);
  useEffect(() => {
    if (error && error)
      toast({
        status: "error",
        description: error,
      });
    if (success && success) {
      toast({
        status: "success",
        description: success,
      });
    }
  }, [success, error]);

  const validateAllFields = formik.dirty && formik.isValid;
  if (getVoteSettingsLoading)
    return <FullScreenSpinner spinning={getVoteSettingsLoading} />;
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box className="bg-white card-shadow" width={"967px"}>
        <Box py={10} px={10}>
          <Center flexDirection="column" mb={5}>
            <Text mb={5} className="font-weight-600 color-primary font-md">
              Vote Settings
            </Text>
          </Center>
          <Box>
            <Flex align="baseline" justify="space-between">
              <FormControl flex={0.3} mb={5}>
                <Text mb={"2px"} className="color-dark font-sm font-weight-500">
                  Max Vote Per Time
                </Text>
                <InputGroup>
                  <NumberInput
                    {...formik.getFieldProps("max_vote_per_time")}
                    placeholder="Max Vote Per Time"
                  >
                    <NumberInputField
                      {...formik.getFieldProps("max_vote_per_time")}
                      px="50px"
                      className="color-dark font-weight-500"
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl flex={0.3} mb={5}>
                <Text mb={"2px"} className="color-dark font-sm font-weight-500">
                  Voting Cost
                </Text>
                <InputGroup>
                  <InputLeftElement>
                    <Text className="color-gray-text font-sm" ml={2}>
                      NGN
                    </Text>
                  </InputLeftElement>
                  <NumberInput
                    {...formik.getFieldProps("vote_cost")}
                    placeholder="Voting Cost"
                  >
                    <NumberInputField
                      {...formik.getFieldProps("vote_cost")}
                      px="50px"
                      className="color-dark font-weight-500"
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl flex={0.3} mb={5}>
                <Text mb={"2px"} className="color-dark font-sm font-weight-500">
                  Contestant Referral to Vote
                </Text>
                <InputGroup>
                  <NumberInput
                    {...formik.getFieldProps("contestant_referral_to_vote")}
                    placeholder="Contestant Referral to Vote"
                  >
                    <NumberInputField
                      {...formik.getFieldProps("contestant_referral_to_vote")}
                      px="50px"
                      className="color-dark font-weight-500"
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
            </Flex>
            <Flex align="baseline" justify="space-between">
              <Select
                label="Contestant Has Referral Vote"
                placeholder="Select..."
                value={`${formik.values.contestant_has_referral_vote}`}
                options={[
                  { label: "True", value: "true" },
                  { label: "False", value: "false" },
                ]}
                onChange={(e) =>
                  formik.setFieldValue(
                    "contestant_has_referral_vote",
                    e.target.value.toLowerCase() === "true"
                  )
                }
              />
            </Flex>
            <Flex align="center" justify="space-between">
              <Flex direction="column" flex={0.25}>
                <SubmitButton
                  mb={0}
                  disabled={!validateAllFields}
                  loading={loading}
                  action={formik.handleSubmit}
                >
                  Update Settings
                </SubmitButton>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VoteSettings;
