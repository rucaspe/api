import { route } from "../../../Utils";
import { Auth } from "../../";

const signup = route("/auth/signup", (params: any) => Auth.signup(params), [
  "name",
  "phone",
  "email",
  "password"
]);

export default [
  signup
];