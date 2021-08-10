import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";

import { SubmitButton } from "../../components";

import { ContestantsProps } from "../../redux";
import { Link } from "react-router-dom";

import { AppState, manageContestantRequest } from "../../redux";

// redux import
import { useSelector, useDispatch } from "react-redux";

export const ContestantsTable: React.FC<{
  contestants: ContestantsProps[];
}> = ({ contestants }): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <td className="">Name</td>
          <td className="">Nickname</td>
          <td className="">Gender</td>
          <td className="">Status</td>
          <td className="">Change Status</td>

          <td className=""></td>
        </tr>
      </thead>
      <tbody>
        {contestants.map((el, index) => (
          <ContestantRow {...el} key={index} />
        ))}
      </tbody>
    </table>
  );
};

const ContestantRow: React.FC<ContestantsProps> = ({
  firstname,
  lastname,
  _id,
  nickname,
  gender,
  status,
}): JSX.Element => {
  const dispatch = useDispatch();

  const { token, loading } = useSelector((state: AppState) => {
    const { token } = state.auth;

    const { manageContestant: loading } = state.loadingIndicators;

    return { token, loading };
  });
  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: yup.object({
      status: yup.string().required("Required"),
    }),

    onSubmit: ({ status }) => {
      console.log(status, _id);
      dispatch(
        manageContestantRequest({
          data: {
            status,
          },
          token,
          id: _id,
        })
      );
    },
  });
  return (
    <tr>
      <td className="">
        {firstname} {lastname}
      </td>
      <td className="">{nickname}</td>
      <td className="">{gender}</td>
      <td className="">{status}</td>
      <td className="">
        <FormControl mb={1}>
          <Select
            {...formik.getFieldProps("status")}
            placeholder="Change Status"
            size="md"
          >
            <option value="active">Active</option>
            <option value="evicted">Evited</option>
          </Select>
        </FormControl>
        <SubmitButton
          disabled={!(formik.dirty && formik.isValid)}
          loading={false}
          action={formik.handleSubmit}
        >
          Change
        </SubmitButton>
      </td>
      <td className="">
        <Popover placement="top" trigger="hover" closeOnBlur={true}>
          <PopoverTrigger>
            <button type="button">
              <FaEllipsisV size={15} className="color-secondary" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="bg-white slim-border card-shadow"
            border="none"
            width="150px"
          >
            <Box as="button" p={3}>
              <Link to={`/dashboard/contestant/${_id}`}>View Contestant</Link>
            </Box>
            <Box as="button" p={3}>
              <Link to={`/dashboard/edit-contestant/${_id}`}>
                Edit Contestant
              </Link>
            </Box>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
};
