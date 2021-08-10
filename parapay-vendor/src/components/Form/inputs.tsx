import React, { useState, memo } from "react";
import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text,
  Textarea as ChakraTextarea,
  BoxProps,
} from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";

export interface GlobalProps
  extends Pick<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  formHelperText?: string;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
}
export type FormInputProps = GlobalProps &
  FormControlProps & {
    type?: string;
    labelClassName?: string;
    errorText?: string;
  };
export const FormInput: React.FC<FormInputProps> = memo(
  ({
    formHelperText,
    type = "text",
    name,
    value,
    label,
    placeholder,
    errorText,
    onChange,
    labelClassName,
    ...rest
  }) => {
    return (
      <FormControl mb={5} {...rest}>
        <Text as="label" className="font-weight-500 font-sm margin-bottom-xs">
          {label}
        </Text>
        <Input
          type={type}
          value={value}
          name={name}
          id={name}
          placeholder={placeholder}
          aria-describedby={`${name}-helper-text`}
          onChange={onChange}
          className="font-xs"
          focusBorderColor="#a6a6a6"
        />
        <Text as="p" className="color-error font-weight-500 font-sm">
          {errorText}
        </Text>
        <FormHelperText id={`${name}-helper-text`}>
          {formHelperText}
        </FormHelperText>
      </FormControl>
    );
  },
  (prev, next) => prev.value === next.value
);

declare type TextAreaProps = Omit<GlobalProps, "onChange"> &
  Pick<React.HTMLAttributes<HTMLTextAreaElement>, "onChange"> &
  FormControlProps & {
    height?: string | number;
  };
export const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  label,
  placeholder,
  onChange,
  my = 5,
  height,
  ...rest
}) => {
  return (
    <FormControl {...rest} my={my}>
      <Text as="label" className="font-weight-600 font-md margin-bottom-xs">
        {label}
      </Text>
      <ChakraTextarea
        value={value}
        name={name}
        id={name}
        height={height}
        placeholder={placeholder}
        aria-describedby={`${name}-helper-text`}
        onChange={onChange}
        className="font-xs"
        focusBorderColor="#C4C4C4"
      />
    </FormControl>
  );
};

declare interface SelectProps extends ChakraSelectProps {
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}
export const Select: React.FC<SelectProps> = ({
  label,
  options,
  ...rest
}): JSX.Element => {
  return (
    <Box mb={5}>
      <Text as="label" className="font-weight-500 font-sm margin-bottom-xs">
        {label}
      </Text>
      <ChakraSelect
        fontSize="0.8em"
        iconColor="#a6a6a6"
        focusBorderColor="#a6a6a6"
        className="capitalize"
        {...rest}
        _placeholder={{ textColor: "#e0e0e0" }}
      >
        {options.map((option) => (
          <option
            className="font-sm capitalize"
            key={option.value}
            value={option.value}
            label={option.label}
          >
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </Box>
  );
};

declare interface SubmitButtonProps extends BoxProps {
  action: () => void;
  loading?: boolean;
  disabled?: boolean;
  spinColor?: "white" | "primary";
}
export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  action,
  loading,
  disabled,
  className,
  spinColor = "white",
  my = 5,
  ...rest
}): JSX.Element => {
  const colors = {
    white: "#fff",
    primary: "#31326c",
  };
  return (
    <Box
      as="button"
      width="full"
      type="button"
      textAlign="center"
      className={`${
        disabled ? "btn-primary-disabled cursor-disabled" : "bg-primary"
      } color-white btn ${className}`}
      onClick={action}
      disabled={disabled}
      my={my}
      {...rest}
    >
      {!loading ? (
        children
      ) : (
        <ClipLoader size={20} color={colors[spinColor]} loading={loading} />
      )}
    </Box>
  );
};
