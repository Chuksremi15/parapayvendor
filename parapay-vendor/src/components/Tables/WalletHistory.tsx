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
import { ContestantsProps, WalletHistoryProps } from "../../redux";
import { Link } from "react-router-dom";

export const WalletHistoryTable: React.FC<{
  transactions: WalletHistoryProps[];
}> = ({ transactions }): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <td className="">Ref No.</td>
          <td className="">Type</td>
          <td className="">Narration</td>
          <td className="">Name</td>
          <td className="">Amount</td>

          <td className="">Date</td>
        </tr>
      </thead>
      <tbody>
        {transactions.map((el, index) => (
          <WalletHistoryRow {...el} key={index} />
        ))}
      </tbody>
    </table>
  );
};

const WalletHistoryRow: React.FC<WalletHistoryProps> = ({
  transaction_id,
  transaction_type,
  transaction_description,
  name,
  amount,
  created_at,
}): JSX.Element => {
  return (
    <tr>
      <td className="">{transaction_id}</td>
      <td className="">{transaction_type}</td>
      <td className="">{transaction_description}</td>
      <td className="">{name}</td>
      <td className="">{amount}</td>
      <td className="">
        {" "}
        <Moment format="YYYY/MM/DD">{created_at}</Moment>
      </td>
    </tr>
  );
};
