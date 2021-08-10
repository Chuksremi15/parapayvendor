import React, { ReactText, useEffect, useLayoutEffect, useState } from "react";
import Moment from "react-moment";

import {
  FilterHeader,
  SectionSpinner,
  ContestantsTable,
  EvictionCard,
  FormInput,
  useFileUpload,
  SubmitButton,
  useAjaxToast,
  fileTypes,
} from "../../components";
import {
  Box,
  Stack,
  Flex,
  Text,
  Image,
  useDisclosure,
  Checkbox,
  FormControl,
  Select,
  CheckboxGroup,
  Center,
  Square,
} from "@chakra-ui/react";

import { AiFillCamera } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

import { RouteComponentProps } from "react-router-dom";

// redux import
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  changeEvictionStateRequest,
  getEvictionRequest,
  updateEvictionRequest,
  getContestantsRequest,
} from "../../../redux";
import { BsPencil } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import { argv } from "process";

const Eviction: React.FC<RouteComponentProps<{ id: string }>> = ({
  match: { params },
}): JSX.Element => {
  const dispatch = useDispatch();
  const toast = useAjaxToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    token,
    evictionLoading,
    eviction,
    error,
    success,
    loading,
    changeEvictionStateError,
    changeEvictionStateSuccess,
    contestantsLoading,
    contestants,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const { eviction, evictionLoading } = state.eviction;
    const { updateEviction: loading } = state.loadingIndicators;
    const { contestants, contestantsLoading } = state.contestant;
    const {
      success: {
        updateEviction: success,
        changeEvictionState: changeEvictionStateSuccess,
      },
      errors: {
        updateEviction: error,
        changeEvictionState: changeEvictionStateError,
      },
    } = state.ajaxStatuses;
    return {
      token,
      eviction,
      evictionLoading,
      loading,
      error,
      success,
      changeEvictionStateError,
      changeEvictionStateSuccess,
      contestantsLoading,
      contestants,
    };
  });

  useLayoutEffect(() => {
    dispatch(getContestantsRequest({ token }));
  }, []);
  const { url, FileUpload, file, setUrl } = useFileUpload(eviction?.banner);
  const [contestantsArray, setContestantsArray] = useState<ReactText[]>([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      start_date: "",
      end_date: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Required"),
      start_date: yup.string().required("Required"),
      end_date: yup.string().required("Required"),
    }),

    onSubmit: (props) => {
      const data: any = props;
      if (file) {
        data.banner = file;
      } else {
        data.banner = url;
      }
      console.log("data file", data.banner);
      data.contestants = contestantsArray;
      dispatch(
        updateEvictionRequest({
          token,
          data,
          id: params.id,
        })
      );
    },
  });

  const formie = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: yup.object({
      status: yup.string().required("Required"),
    }),

    onSubmit: ({ status }) => {
      console.log(status);
      dispatch(
        changeEvictionStateRequest({
          data: {
            status,
          },
          token,
          id: params.id,
        })
      );
    },
  });

  const onChecked = (e: any) => {
    e.preventDefault();
    console.log("event", e.target.value);
    if (contestantsArray.find((el) => el === e.target.value)) {
      setContestantsArray(
        contestantsArray.filter((el) => el !== e.target.value)
      );
    } else {
      setContestantsArray([...contestantsArray, e.target.value]);
    }
  };

  const id = params.id;
  useLayoutEffect(() => {
    dispatch(getEvictionRequest({ token, id }));
  }, [evictionLoading]);

  useEffect(() => {
    if (eviction) {
      formik.setValues((values) => ({
        ...values,
        title: eviction?.title as string,
        start_date: eviction?.start_date as string,
        end_date: eviction?.end_date as string,
      }));
      setUrl(eviction.banner);
      formie.setValues((values) => ({ values, status: eviction.status }));
      setContestantsArray(
        eviction.contestants.map((e) => {
          return e.contestant._id;
        }) as string[]
      );
    }
  }, [eviction]);
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
    if (changeEvictionStateError)
      toast({
        status: "error",
        description: changeEvictionStateError,
      });
    if (changeEvictionStateSuccess) {
      toast({
        status: "success",
        description: changeEvictionStateSuccess,
      });
    }
  }, [changeEvictionStateSuccess, changeEvictionStateError]);
  console.log("contestantsArray", contestantsArray);
  return (
    <Box>
      <Box className="padding-top-lg padding-horizontal-xlg">
        {evictionLoading ? (
          <SectionSpinner spinning={true} />
        ) : (
          <Box className="eviction-card">
            <Text className="heading" mb={5}>
              Eviction Details
            </Text>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="15px"
              mb={5}
            >
              <Box flex={1}>
                {!isOpen ? (
                  <Box>
                    <p className="eviction-name">Title</p>
                    <p className="eviction-heading">{eviction?.title}</p>
                    <p className="eviction-name">Status</p>
                    <p className="eviction-heading">{eviction?.status}</p>
                    <p className="eviction-name">Start Date</p>
                    <p className="eviction-heading">
                      <Moment format="YYYY/MM/DD">
                        {eviction?.start_date}
                      </Moment>
                    </p>
                    <p className="eviction-name">End Date</p>
                    <p className="eviction-heading">
                      {" "}
                      <Moment format="YYYY/MM/DD">{eviction?.end_date}</Moment>
                    </p>
                    <div className="display-grid-32">
                      <FormControl mt={5}>
                        <Select
                          {...formie.getFieldProps("status")}
                          placeholder="Change Status"
                          size="md"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </Select>
                      </FormControl>
                      <SubmitButton
                        disabled={!(formie.dirty && formie.isValid)}
                        loading={false}
                        action={formie.handleSubmit}
                      >
                        Change
                      </SubmitButton>
                    </div>
                  </Box>
                ) : (
                  <Box>
                    <FormInput
                      flex={1}
                      mb={0}
                      label="Title"
                      {...formik.getFieldProps("title")}
                      errorText={formik.errors.title}
                      placeholder="Title"
                    />
                    <Stack direction="row" spacing="10px" align="baseline">
                      <FormInput
                        type="date"
                        flex={1}
                        mb={0}
                        label="Start Date"
                        {...formik.getFieldProps("start_date")}
                        errorText={formik.errors.start_date}
                        placeholder="Start Date"
                      />
                      <FormInput
                        type="date"
                        flex={1}
                        mb={0}
                        label="End Date"
                        {...formik.getFieldProps("end_date")}
                        errorText={formik.errors.end_date}
                        placeholder="End Date"
                      />
                    </Stack>

                    <FileUpload
                      maxFileSize={1}
                      fileType={[
                        fileTypes["image/jpeg"],
                        fileTypes["image/png"],
                      ]}
                    >
                      <Square
                        size={150}
                        className="bg-gray border-radius-sm"
                        mb={1}
                      >
                        {file ? (
                          <Image src={url} flex={1} alt="User Avatar" />
                        ) : (
                          <FaUser size={120} className="color-gray-text" />
                        )}
                      </Square>
                      <Center direction="row" align="center">
                        <AiFillCamera size={20} className="color-primary" />
                        <Text
                          ml={2}
                          className="font-sm color-secondary font-weight-500"
                        >
                          Upload Image
                        </Text>
                      </Center>
                    </FileUpload>

                    {contestantsLoading ? (
                      <SectionSpinner spinning={true} />
                    ) : (
                      <div className="display-grid-3">
                        <CheckboxGroup
                          value={contestantsArray}
                          onChange={setContestantsArray}
                        >
                          {contestants.map((el, index) => {
                            console.log(
                              "contestantsArray.includes(el._id)",
                              contestantsArray.includes(el._id)
                            );
                            return (
                              <Checkbox
                                key={index}
                                name="contestants"
                                value={el._id}
                                size="md"
                                colorScheme="blue"
                                checked={true}
                              >
                                {el.firstname} {el.lastname}
                              </Checkbox>
                            );
                          })}
                        </CheckboxGroup>
                      </div>
                    )}
                  </Box>
                )}
                <Flex justify="flex-end">
                  {!isOpen ? (
                    <Stack
                      direction="row"
                      align="center"
                      spacing="5px"
                      as="button"
                      className="bg-primary"
                      borderRadius={5}
                      p="5px 10px"
                      onClick={onOpen}
                    >
                      <BsPencil className="color-white" size={20} />
                      <Text
                        fontSize="16px"
                        fontWeight="600"
                        className="color-white"
                      >
                        Edit Details
                      </Text>
                    </Stack>
                  ) : (
                    <Stack direction="row" align="baseline" spacing="10px">
                      <SubmitButton
                        loading={loading}
                        disabled={!(formik.isValid && formik.dirty)}
                        action={formik.handleSubmit}
                      >
                        Save Changes
                      </SubmitButton>
                      <Box
                        as="button"
                        className="bg-gray-light color-gray-light"
                        borderRadius={5}
                        p="5px 10px"
                        onClick={onClose}
                      >
                        Cancel
                      </Box>
                    </Stack>
                  )}
                </Flex>
              </Box>

              <Box flex={0.7} className="eviction-image img-wrap">
                <FileUpload maxFileSize={1}>
                  <Image src={url} alt="Eviction Banner" />
                </FileUpload>
              </Box>
            </Stack>

            <p className="heading">Contestants</p>

            <Stack direction="row" spacing="10px" wrap="wrap">
              {eviction?.contestants.map((contestant) => (
                <EvictionCard {...contestant} key={contestant._id} />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Eviction;
