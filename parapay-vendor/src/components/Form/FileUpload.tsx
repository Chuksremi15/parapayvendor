import React, { useState, useCallback, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
export enum fileTypes {
  "image/jpeg" = "image/jpeg",
  "image/png" = "image/png",
}

interface InputFileProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  multiple?: boolean;
  /**This should indicate the maximum file size (in MB unit) that can be uploaded */
  maxFileSize: number;
  /**Takes an array of any of the defined @enum {fileTypes} */
  fileType?: Array<string>;
  className?: string;
}

export const useFileUpload = (initialUrl?: string) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [url, setUrl] = useState<string | undefined>(initialUrl);
  useEffect(() => {
    if (initialUrl) setUrl(initialUrl);
  }, [initialUrl]);
  const FileUpload: React.FC<InputFileProps> = ({
    multiple,
    maxFileSize,
    fileType = ["all"],
    children,
    className,
    ...rest
  }): JSX.Element => {
    const handleFile = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        const file: File = event.target.files![0];
        // if(fileType.includes)
        const fileTypeIsValid: boolean =
          fileType.includes(file.type) || fileType.includes("all");
        if (!fileTypeIsValid)
          return setError(`you can only upload ${fileType.concat(",")} file`);
        const sizeIsValid: boolean = file.size / 1024 ** 2 <= maxFileSize;
        if (!sizeIsValid)
          return setError(`File must not exceed ${maxFileSize}MB`);
        setFile(file);
        setUrl(URL.createObjectURL(file));
      },
      []
    );
    const fileId = uuid();
    return (
      <Box
        flex={1}
        display="inline-flex"
        align="center"
        justify="center"
        className={className}
      >
        <label
          htmlFor={`file-${fileId}`}
          style={{ flex: 1 }}
          className="display-inline-block"
        >
          {children}
          <input
            id={`file-${fileId}`}
            type="file"
            onChange={handleFile}
            multiple={multiple}
            accept={fileType.join(",")}
            className="custom-file-input"
            {...rest}
          />
        </label>
        <span className="color-danger">{error}</span>
      </Box>
    );
  };
  return { file, FileUpload, url, setUrl };
};
