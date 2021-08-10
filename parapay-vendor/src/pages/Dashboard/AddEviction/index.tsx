import React, { useLayoutEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  FilterHeader,
  SectionSpinner,
  ContestantsTable,
  SubmitButton,
  useFileUpload,
  fileTypes,
  FormInput,
  TextArea,
  useAjaxToast,
} from "../../components";
import {
  Box,
  HStack,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Center,
  Square,
  Image,
  Text,
} from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";
// redux import
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  addContestantRequest,
  getContestantsRequest,
  addEvictionRequest,
} from "../../../redux";
import { AiFillCamera } from "react-icons/ai";
import { useEffect } from "react";

const AddEviction: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const toast = useAjaxToast();
  const { file, url, FileUpload } = useFileUpload();
  const [contestantsArray, setContestantsArray] = useState<string[]>([]);
  const {
    token,
    contestantsLoading,
    contestants,
    error,
    success,
    loading,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const { contestants, contestantsLoading } = state.contestant;

    const { addEviction: loading } = state.loadingIndicators;

    const {
      success: { addEviction: success },
      errors: { addEviction: error },
    } = state.ajaxStatuses;
    return {
      token,
      contestants,
      contestantsLoading,
      loading,
      success,
      error,
    };
  });

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

    onSubmit: ({ start_date, end_date, title }) => {
      dispatch(
        addEvictionRequest({
          data: {
            title,
            start_date,
            end_date,
            banner: file as File,
            constestants: contestantsArray,
          },
          token,
        })
      );
    },
  });

  useLayoutEffect(() => {
    dispatch(getContestantsRequest({ token }));
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
  console.log("Array", contestantsArray);
  return (
    <Box>
      <Box className="padding-top-lg padding-horizontal-xlg">
        <div className="my-card">
          <h1>Add Eviction</h1>
          <div className="my-card-content">
            <FormInput
              flex={1}
              mb={0}
              label="Title"
              {...formik.getFieldProps("title")}
              errorText={formik.errors.title}
              placeholder="Enter title"
            />
            <FormInput
              type="date"
              flex={1}
              mb={0}
              label="Date"
              {...formik.getFieldProps("start_date")}
              errorText={formik.errors.start_date}
              placeholder="Enter Start Date"
            />
            <FormInput
              type="date"
              flex={1}
              mb={0}
              label="Date"
              {...formik.getFieldProps("end_date")}
              errorText={formik.errors.end_date}
              placeholder="Enter End Date"
            />
            <FileUpload
              maxFileSize={1}
              fileType={[fileTypes["image/jpeg"], fileTypes["image/png"]]}
            >
              <Square size={150} className="bg-gray border-radius-sm" mb={2}>
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
                {contestants.map((el, index) => (
                  <Checkbox
                    key={index}
                    name="contestants"
                    value={el._id}
                    size="md"
                    colorScheme="blue"
                    checked={contestantsArray.includes(el._id)}
                    onChange={(e) => onChecked(e)}
                  >
                    {el.firstname} {el.lastname}
                  </Checkbox>
                ))}
              </div>
            )}

            <SubmitButton action={formik.handleSubmit} loading={loading}>
              Add Eviction
            </SubmitButton>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default AddEviction;
