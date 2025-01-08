import { IUser, TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { TLoginRequestFields, TLoginResponse } from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequestFields>({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    register: builder.mutation({
      query: (user: IUser) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
