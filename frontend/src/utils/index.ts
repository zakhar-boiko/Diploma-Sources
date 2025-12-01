import dayjs from "dayjs";

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const DATE_FORMAT = "MMMM D, YYYY";

export const formatDate = (date: string, format = DATE_FORMAT) =>
  dayjs(date).format(format);

export const base64toFile = (
  base64String: string,
  filename: string,
  mimeType: string
) => {
  const base64Data = base64String.split(",")[1];
  const byteCharacters = window.atob(base64Data);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
};
