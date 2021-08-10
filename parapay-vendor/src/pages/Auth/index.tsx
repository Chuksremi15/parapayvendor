import React from "react";
import Signin from "./Signin";
import { Flex, Box } from "@chakra-ui/react";
const Auth: React.FC = (): JSX.Element => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      flex={1}
      width="100%"
      height="90vh"
    >
      <Box
        className="bg-primary border-radius-circle position-absolute"
        top={15}
        right="20%"
        width={{ base: "100px", md: "10rem" }}
        height={{ base: "100px", md: "10rem" }}
      />
      <Box
        className="bg-primary border-radius-circle position-absolute"
        bottom="0px"
        right="0px"
        width={{ base: "89px" }}
        height={{ base: "89px" }}
      />
      <Box
        className="bg-secondary border-radius-circle position-absolute"
        bottom="-10%"
        left="-10%"
        width={{ base: "100px", md: "10rem" }}
        height={{ base: "100px", md: "10rem" }}
      />
      <Box zIndex={3}>
        <Signin />
      </Box>
    </Flex>
  );
};

export default Auth;
