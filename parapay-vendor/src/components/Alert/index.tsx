import React, { useCallback } from "react";
import {
  Alert,
  AlertIcon,
  AlertProps,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";

export interface AjaxStatusAlertProps extends AlertProps {
  message: string;
}
export const AjaxStatusAlert: React.FC<AjaxStatusAlertProps> = ({
  message,
  ...rest
}) => {
  return (
    <Alert {...rest} mv={10} variant="solid">
      <AlertIcon />
      <Text className="color-white font-weight-500 font-xs">{message}</Text>
    </Alert>
  );
};

export const useAjaxToast = () => {
  const toast = useToast();
  const callToast = useCallback(
    ({
      title,
      description,
      isClosable,
      duration = 4000,
      position = "top-right",
      ...rest
    }: UseToastOptions) => {
      toast({
        title,
        description,
        duration,
        isClosable,
        position,
        ...rest,
      });
    },
    []
  );
  return callToast;
};
