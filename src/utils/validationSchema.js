import * as yup from "yup";

const URLRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const stringValid = yup
  .string("this input must be string")
  .required("this input is require");

const emailValid = yup
  .string("this input must be string")
  .required("this input is require")
  .email("this input must be email");

const numValid = yup
  .number()
  .required("this input is require")
  .typeError("this input must be number");

const urlValid = () =>
  yup
    .string()
    .required("this input is require")
    .matches(URLRegex,  "this input must be a valid URL");

export const addStreamSchema = yup.object().shape({
  name: stringValid,
  type: yup.string().required("this input is require"), // Explicitly declare type
  path: urlValid(),
});
