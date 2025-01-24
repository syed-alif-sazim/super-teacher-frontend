import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";

import { TClassroom } from "./classroom.types";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation({
        query: (newClassroom: TClassroom) => ({
          url: "classrooms",
          method: "POST",
          body: newClassroom,
        }),
        invalidatesTags: ["Classrooms"],
        transformResponse: (response: TApiResponse<TClassroom>) => response.data,
      }),
    getClassrooms: builder.query<TClassroom[], void>({
      query: () => "classrooms",
      providesTags: ["Classrooms"],
      transformResponse: (response: TApiResponse<TClassroom[]>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateClassroomMutation, useGetClassroomsQuery } = classroomsApi;
