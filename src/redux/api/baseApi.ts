/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../helpers/config/envConfig";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("weego_accessToken");

    const forgetPasswordToken = Cookies.get("weego_forget_password_token");
    const resetPasswordToken = Cookies.get("weego_resetPasswordToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (forgetPasswordToken) {
      headers.set("SignUpToken", `signUpToken ${forgetPasswordToken}`);
    }

    if (resetPasswordToken) {
      headers.set("Forget-password", `Forget-password ${resetPasswordToken}`);
    }

    return headers;
  },
});

const baseQueryWithAuthCheck = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status } = result.error;

    if (status === 403) {
      // clear tokens
      Cookies.remove("weego_accessToken");
      window.location.href = "/sign-in";
      window.location.reload();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
