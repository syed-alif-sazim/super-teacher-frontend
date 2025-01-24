// import { IUser, TApiResponse } from "@/shared/typedefs";
import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
// import { TLoginRequestFields, TLoginResponse } from "./auth.types";

import { TClassroom } from "./classroom.types";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation({
        query: (newClassroom: TClassroom) => ({
          url: "classrooms",
          method: "POST",
          body: newClassroom,
        }),
        transformResponse: (response: TApiResponse<TClassroom>) => response.data,
      }),
  }),
  overrideExisting: false,
});

export const { useCreateClassroomMutation } = classroomsApi;
