import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, Box, Text, Image, Circle } from "@chakra-ui/react";
import user from "../../assets/user.png";
import { BsFillBellFill } from "react-icons/bs";
import { GoThreeBars } from "react-icons/go";

export const HorizontalNavBar: React.FC = (): JSX.Element => {
  return (
    <Flex
      px={20}
      py={2}
      justify="space-between"
      className="slim-border-bottom"
      width="full"
    >
      <Box as="button">
        <GoThreeBars size={25} />
      </Box>
      <Flex align="center">
        <Box as="button" className="notification-bell position-relative" mr={6}>
          <Circle
            size="8px"
            className="bg-danger"
            position="absolute"
            top="-2px"
            right="2px"
          />
          <BsFillBellFill className="color-dark" size={25} />
        </Box>
        <Text mr={2} className="font-sm font-weight-500 color-dark">
          Ibukun Odeku
        </Text>
        <Image
          src={user}
          className="avatar-sm slim-border-primary"
          alt="User avatar"
        />
      </Flex>
    </Flex>
  );
};
