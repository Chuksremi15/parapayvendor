import React, { useLayoutEffect, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import {
  FilterHeader,
  SectionSpinner,
  ContestantsTable,
  useAjaxToast,
  useFileUpload,
  SubmitButton,
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

// redux import
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  getContestantsRequest,
  updateContestantRequest,
} from "../../../redux";

import { AiFillCamera } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

import { RouteComponentProps } from "react-router-dom";

const UpdateContestant: React.FC<RouteComponentProps<{ id: string }>> = ({
  match: { params },
}): JSX.Element => {
  const dispatch = useDispatch();

  const { replace } = useHistory();

  const id = params.id;

  const toast = useAjaxToast();

  const {
    token,
    error,
    contestantLoading,
    contestant,
    addContestant,
    loading,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;

    const { login: loading } = state.loadingIndicators;

    const {
      success: { addContestant },
      errors: { login: error },
    } = state.ajaxStatuses;
    const { contestant, contestantLoading } = state.contestant;

    return {
      token,
      contestant,
      contestantLoading,
      addContestant,
      error,
      loading,
    };
  });

  const { file, url, FileUpload, setUrl } = useFileUpload();
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
      gender: yup.string().required("Required"),
    }),
    onSubmit: (prop) => {
      const data: any = prop;
      if (file) {
        data.contestant_image = file;
      } else {
        data.contestant_image = url;
      }
      dispatch(
        updateContestantRequest({
          id,
          token,
          data: prop,
        })
      );
    },
  });
  useEffect(() => {
    if (contestant) {
      formik.setValues((values) => ({
        ...values,
        firstname: contestant.firstname,
        lastname: contestant.lastname,
        nickname: contestant.nickname,
        description: contestant.description,
        gender: contestant.gender,
      }));
      setUrl(contestant.contestant_image);
    }
  }, [contestant]);
  useEffect(() => {
    if (addContestant) {
      replace(`/dashboard/contestant/${contestant?._id}`);
    }
  }, [addContestant]);

  return (
    <Box>
      <Box className="padding-top-lg padding-horizontal-xlg">
        <div className="my-card">
          <h1>Edit Contestant</h1>
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
              <Image src={url} flex={1} alt="User Avatar" />
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
            Update
          </SubmitButton>
        </div>
      </Box>
    </Box>
  );
};

export default UpdateContestant;
