import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import Moment from "react-moment";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { EvictionProps } from "../../redux";
import { Link } from "react-router-dom";

export const UpForEvictionTable: React.FC<{
  evictions: EvictionProps[];
}> = ({ evictions }): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <td className="">
            <Checkbox colorScheme="purple" />
          </td>
          <td className="">Title</td>
          <td className="">Start Date</td>
          <td className="">End Date</td>
          <td className="">Status</td>

          <td className=""></td>
        </tr>
      </thead>
      <tbody>
        {evictions.map((el, index) => (
          <EvictionRow {...el} key={index} />
        ))}
      </tbody>
    </table>
  );
};

const EvictionRow: React.FC<EvictionProps> = ({
  title,
  banner,
  _id,
  start_date,
  end_date,
  status,
}): JSX.Element => {
  return (
    <tr>
      <td className="">
        <Checkbox colorScheme="purple" />
      </td>
      <td className="">{title}</td>
      <td className="">
        <Moment format="YYYY/MM/DD">{start_date}</Moment>
      </td>
      <td className="">
        <Moment format="YYYY/MM/DD">{end_date}</Moment>
      </td>
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
              <Link to={`/dashboard/eviction/${_id}`}>View Eviction</Link>
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
