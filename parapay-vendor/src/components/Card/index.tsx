import React, { useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Stack,
  useDisclosure,
  toast,
} from "@chakra-ui/react";
import { BiDownArrowCircle } from "react-icons/bi";
import {
  AppState,
  ContestantUpForEvictionProps,
  manageContestantRequest,
} from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useAjaxToast } from "../Alert";

declare interface StatsCard {
  caption: string;
  value: string | number | undefined;
  icon: string;
}

export const DashboardCard: React.FC<StatsCard> = ({
  value,
  caption,
  icon,
}): JSX.Element => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      flex={1}
      height="194px"
      width="200px"
      px={5}
      py={5}
      className="bg-white stats-card"
    >
      <Flex direction="column" justify="space-between" flex={1}>
        <Text
          mb={2}
          lineHeight="18px"
          className="color-primary font-sm font-weight-600"
        >
          {caption}
        </Text>
        <Text mb={1} className="color-dark font-md font-weight-bold">
          {value}
        </Text>
      </Flex>
      <Flex justify="flex-end">
        <Image src={icon} alt="Icon" width="50px" height="auto" />
      </Flex>
    </Flex>
  );
};

export interface ThemeCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
}

export const SectionCard: React.FC<ThemeCardProps> = ({
  children,
  className,
  title,
  ...rest
}): JSX.Element => {
  return (
    <div {...rest} className={`card-shadow bg-white`}>
      {title && (
        <div className="slim-border-bottom padding-vertical-sm padding-horizontal-md">
          {title}
        </div>
      )}
      <div className={`padding-vertical-md padding-horizontal-md ${className}`}>
        {children}
      </div>
    </div>
  );
};

export const EvictionCard: React.FC<ContestantUpForEvictionProps> = ({
  contestant,
  ...rest
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useAjaxToast();
  const { token, success, error, loading } = useSelector((state: AppState) => {
    const { token } = state.auth;
    const {
      success: { manageContestant: success },
      errors: { manageContestant: error },
    } = state.ajaxStatuses;
    const { manageContestant: loading } = state.loadingIndicators;
    return {
      token,
      success,
      error,
      loading,
    };
  });
  const changeContestantState = (val: string) => {
    dispatch(
      manageContestantRequest({
        token,
        data: { status: val },
        id: contestant._id,
      })
    );
    onOpen();
  };
  useEffect(() => {
    if (error && isOpen) {
      onClose();
      toast({
        status: "error",
        description: error,
      });
    }
    if (success && isOpen) {
      onClose();
      toast({
        status: "success",
        description: success,
      });
    }
  }, [success, error]);

  return (
    <Box
      flex={1}
      maxW="32%"
      p="15px 20px"
      className="card-shadow bg-white"
      borderRadius={5}
    >
      <Box mb={5}>
        <Image width="100%" height="300px" src={contestant.contestant_image} />
      </Box>
      <Box mb={5}>
        <Text
          as="h3"
          fontWeight="500px"
          fontSize="18px"
          lineHeight="30.02px"
          className="color-dark"
          isTruncated
        >
          {contestant.firstname} {contestant.lastname}
          <Text
            className="color-gray-text"
            fontWeight="400px"
            as="span"
            ml="5px"
          >
            ({contestant.nickname})
          </Text>
        </Text>
        <Text
          as="h4"
          fontWeight="normal"
          fontSize="18px"
          lineHeight="29px"
          className="color-gray-text capitalize"
        >
          {contestant.gender}
        </Text>
      </Box>
      <Stack direction="row" justify="space-between">
        <Flex
          flex={0.8}
          align="center"
          justify="space-between"
          p="5px 10px"
          borderRadius={5}
          className="bg-primary color-white"
        >
          <Text fontSize="14px" lineHeight="28.51px" fontWeight="normal">
            No. of Votes
          </Text>
          <Text fontSize="16px" lineHeight="39.48px" fontWeight="700">
            {rest.vote}
          </Text>
        </Flex>
        <Box position="relative" className="tooltip-wrapper">
          <Box className="bg-primary" borderRadius={5} p="10px 5px">
            <BiDownArrowCircle className="color-white" size={24} />
          </Box>
          <Flex
            direction="column"
            mb={5}
            py={3}
            position="absolute"
            right="130%"
            top="0px"
            tabindex="0"
            className="bg-white slim-border card-shadow tooltip"
            border="none"
            minWidth="150px"
          >
            <Box
              className="font-sm font-weight-500 color-dark"
              as="button"
              onClick={() => changeContestantState("evicted")}
              p={3}
            >
              Evict
            </Box>
            <Box
              className="font-sm font-weight-500 color-dark"
              as="button"
              onClick={() => changeContestantState("active")}
              p={3}
            >
              Save
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};
