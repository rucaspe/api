import { route } from "../../../Utils";
import { Auth } from "../../";

const signup = route("/auth/signup", (params: any) => Auth.signup(params), [
  "name",
  "phone",
  "email",
  "password"
]);

const sendCode = route("/auth/sendCode", (params: any) => Auth.sendCode(params), [
  "phone",
  "operation_id"
]);

export default [
  signup,
  sendCode
];