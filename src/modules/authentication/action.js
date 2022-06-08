import API from "../../utils/api";
import { apiUrl } from "../../utils/apiUrl";
import { setCookie } from "../../utils/cookie";
import { pushSnackbarAction } from "../layout/actions";

export const signIn = async (values, Checked, navigate) => {
  return API()
    .post(apiUrl.eHRService.auth.signin, {
      username: values.email,
      password: values.password,
    })
    .then((response) => {
      const { access_token, ID, NeedResetPassword } = response.data;
      const uid = ID;
      const a = access_token;
      if (NeedResetPassword) {
        setCookie("uid", uid, { expires: 0 });
        setCookie("a", a, { expires: 0 });
        navigate("/reset-password");
        return { status: "success" };
      } else {
        ///setRememberMeCookie
        if (Checked) {
          setCookie("uid", uid, 1000 * 3600 * 24 * 30);
          setCookie("a", a, 1000 * 3600 * 24 * 30);
        } else {
          setCookie("uid", uid, { expires: 0 });
          setCookie("a", a, { expires: 0 });
        }
        navigate("/news");
        return { status: "success" };
      }
    })
    .catch((error) => {
      try {
        let status = error.response.status;
        if (status === 401)
          pushSnackbarAction("error", "username or password incorrect");
        if (status === 404)
          pushSnackbarAction("error", error.response.data.message);
      } catch (e) {
        pushSnackbarAction("error", "Server error");
      }
      return { status: "fail" };
    });
};

export const forgotPassword = async (values) => {
  return API()
    .post(apiUrl.eHRService.auth.forgotPassword, {
      username: values.email,
    })
    .then((response) => {
      pushSnackbarAction("success", "Send Link Reset Password has successful");
      return { status: "success" };
    })
    .catch((error) => {
      pushSnackbarAction("error", "Email not found.");
      return { status: "fail" };
    });
};

export const resetPassword = async (values, navigate) => {
  // console.log(values);
  return API()
    .post(apiUrl.eHRService.auth.resetPassword, {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmPassword,
    })
    .then((response) => {
      pushSnackbarAction("success", "Reset password success.");
      if (navigate) {
        setTimeout(() => {
          navigate("/news");
          return { status: "success" };
        }, 1000);
      }
      return { status: "success" };
    })
    .catch((error) => {
      console.log(error);
      try {
        let status = error.response.status;
        console.log(status);
        if (status === 401) {
          pushSnackbarAction("Error", "New Password same as Old Password");
        }
        if (status === 404) {
          pushSnackbarAction("Error", "Old Password Incorret");
        }
      } catch (e) {
        pushSnackbarAction("error", "Server error");
      }
      return { status: "fail" };
    });
};
