import React, { useLayoutEffect, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import {
  FilterHeader,
  SectionSpinner,
  ContestantsTable,
  SubmitButton,
  useAjaxToast,
  useFileUpload,
  fileTypes,
} from "../../components";
import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Square,
  Textarea,
  Image,
  Text,
  Select,
} from "@chakra-ui/react";

import { FaUser } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
// redux import
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  addContestantRequest,
  getContestantsRequest,
} from "../../../redux";

const AddContestants: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const toast = useAjaxToast();

  const { replace } = useHistory();

  const { loading, error, addContestant, token } = useSelector(
    (state: AppState) => {
      const { token } = state.auth;
      const { login: loading } = state.loadingIndicators;
      const {
        success: { addContestant },
        errors: { login: error },
      } = state.ajaxStatuses;
      return { loading, error, addContestant, token };
    }
  );
  const { file, url, FileUpload } = useFileUpload();
  useEffect(() => {
    if (error)
      toast({
        title: "error",
        description: error,
      });
  }, [error]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      nickname: "",
      description: "",
      gender: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Required"),
      lastname: yup.string().required("Required"),
      nickname: yup.string().required("Required"),
      description: yup.string().required("Required"),
    }),

    onSubmit: ({ firstname, lastname, nickname, description, gender }) => {
      dispatch(
        addContestantRequest({
          data: {
            nickname,
            firstname,
            lastname,
            description,
            gender,
            contestant_image: file as File,
          },
          token,
        })
      );
    },
  });

  useEffect(() => {
    if (addContestant) {
      replace("/dashboard/contestants");
    }
  }, [addContestant]);

  return (
    <Box>
      <Box className="padding-top-lg padding-horizontal-xlg">
        <div className="my-card">
          <h1>Add Contestant</h1>
          <FormControl mb={5}>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              placeholder="First name"
              {...formik.getFieldProps("firstname")}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last name"
              {...formik.getFieldProps("lastname")}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Nickname</FormLabel>
            <Input
              type="text"
              placeholder="Nickname"
              {...formik.getFieldProps("nickname")}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Gender</FormLabel>
            <Select
              {...formik.getFieldProps("gender")}
              placeholder="Select Gender"
              size="md"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </Select>
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Description</FormLabel>
            <Textarea {...formik.getFieldProps("description")} />
          </FormControl>

          <FileUpload
            maxFileSize={5}
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
              <Text ml={2} className="font-sm color-secondary font-weight-500">
                Upload Image
              </Text>
            </Center>
          </FileUpload>
          <SubmitButton
            disabled={!(formik.dirty && formik.isValid)}
            loading={loading}
            action={formik.handleSubmit}
          >
            Add
          </SubmitButton>
        </div>
      </Box>
    </Box>
  );
};

export default AddContestants;
