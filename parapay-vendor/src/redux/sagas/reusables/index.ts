/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "../axios";
export const clientErrorMessage =
  "Could not send request. Kindly check your internet connection";

export const delay = (time = 4000) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const sendMediaToS3 = async ({
  file,
  token,
}: {
  file: File;
  token: string;
}) => {
  const response = await axios.get(
    `/vendor/media/get-media-temporary-url?filename=${encodeURIComponent(
      file.name
    )}&filetype=${file.type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `${file.type}`,
      },
    }
  );
  return response;
};
