import React from "react";
import { FaEllipsisV } from "react-icons/fa";

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

import { ContestantsProps } from "../../redux";
import { Link } from "react-router-dom";

export const EvictedontestantsTable: React.FC<{
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
          <td className=""></td>
        </tr>
      </thead>
      <tbody>
        {contestants.map((el, index) => (
          <EvictedContestantRow {...el} key={index} />
        ))}
      </tbody>
    </table>
  );
};

const EvictedContestantRow: React.FC<ContestantsProps> = ({
  firstname,
  lastname,
  _id,
  nickname,
  gender,
  status,
}): JSX.Element => {
  return (
    <tr>
      <td className="">
        {firstname} {lastname}
      </td>
      <td className="">{nickname}</td>
      <td className="">{gender}</td>
      <td className="">{status}</td>

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
