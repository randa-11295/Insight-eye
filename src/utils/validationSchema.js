import * as yup from "yup";

const URLRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const stringValid = yup
  .string("validation.string")
  .required("validation.require");

const emailValid = yup
  .string("validation.string")
  .required("validation.require")
  .email("validation.email");

const numValid = yup
  .number()
  .required("validation.require")
  .typeError("validation.number");

const urlValid = () =>
  yup
    .string()
    .required("validation.require")
    .matches(URLRegex,  "must be a valid URL");

export const addStreamSchema = yup.object().shape({
  name: stringValid,
  type: yup.string().required("validation.require"), // Explicitly declare type
  path: urlValid(),
});
