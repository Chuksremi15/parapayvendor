import React from "react";
import { Spinner, Flex } from "@chakra-ui/react";

declare interface SectionSpinnerProp {
  spinning: boolean;
}
export const SectionSpinner: React.FC<SectionSpinnerProp> = ({
  spinning,
}): JSX.Element => {
  return (
    <Flex direction="column" align="center" justify="center">
      <Spinner size="md" spinning={spinning} />
    </Flex>
  );
};

export const FullScreenSpinner: React.FC<SectionSpinnerProp> = ({
  spinning,
}): JSX.Element => {
  return (
    <Flex direction="column" align="center" justify="center" height="70vh">
      <Spinner size="xl" spinning={spinning} />
    </Flex>
  );
};

declare interface FullScreenSpinnerWithTextProps extends SectionSpinnerProp {
  text?: string;
}
export const FullScreenSpinnerWithText: React.FC<FullScreenSpinnerWithTextProps> = ({
  spinning,
  text,
}): JSX.Element => {
  return (
    <div className="d-flex flex-center full-width" style={{ height: "70vh" }}>
      <div className="margin-right-md">
        <span className="color-gray-light font-md font-weight-500">{text}</span>
      </div>
      <Spinner size="xl" spinning={spinning} />
    </div>
  );
};

export const SectionSpinnerWithText: React.FC<FullScreenSpinnerWithTextProps> = ({
  spinning,
  text,
}): JSX.Element => {
  return (
    <div className="full-width full-height d-flex flex-center">
      <div className="margin-right-md">
        <span className="color-gray-light font-md font-weight-500">{text}</span>
      </div>
      <Spinner size="default" spinning={spinning} />
    </div>
  );
};
