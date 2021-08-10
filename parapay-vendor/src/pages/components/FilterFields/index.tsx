import React from "react";
import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  Circle,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

declare interface FilterHeaderProps {
  title: string;
  buttonLink: string;
  url: string;
}
export const FilterHeader: React.FC<FilterHeaderProps> = ({
  title,
  buttonLink,
  url,
}): JSX.Element => {
  return (
    <Box className="bg-white" py={5} px={20}>
      <Text mb={5} className="font-md color-primary font-weight-600">
        {title}
      </Text>
      <Flex align="center" justify="space-between">
        <Flex>
          <Text mr={2}>Filter</Text>
          <Flex
            align="center"
            borderRadius="45px"
            backgroundColor="rgba(49, 50, 108, 0.05)"
            className="padding-horizontal-sm"
          >
            <Circle size="4px" className="bg-dark" mr={2} />
            <Text className="font-sm color-dark" mr={1}>
              All
            </Text>
            <IoIosArrowDown size={15} className="color-secondary" />
          </Flex>
        </Flex>
        <FormControl width="250px" variant="unstyled">
          <InputGroup>
            <InputLeftElement>
              <Box as="button">
                <FiSearch size={20} className="color-gray-text" />
              </Box>
            </InputLeftElement>
            <Input placeholder="Search Contestant" borderRadius={20} />
          </InputGroup>
        </FormControl>
        <Flex
          align="center"
          as="button"
          className="bg-primary padding-horizontal-sm padding-vertical-xs"
          borderRadius={20}
        >
          <BsPlus size={15} className="color-white margin-right-sm" />
          <Link to={url}>
            <Text className="font-sm color-white">{buttonLink}</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
