import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { TClassroom, TClassroomTeacher, TEnrolledStudent, TUnenrolledStudent } from "./classroom.types";

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
    getClassroomTeacher: builder.query({
      query: (id) => `classrooms/${id}/teacher`,
      transformResponse: (response: TApiResponse<TClassroomTeacher>) => response.data,
    }),
    getEnrolledStudents: builder.query({
      query: (id) => `classrooms/${id}/enrolled-students`,
      providesTags: ["EnrolledStudents"],
      transformResponse: (response: TApiResponse<TEnrolledStudent[]>) => response.data,
    }),
    getUnenrolledStudents: builder.query({
      query: (id) => `classrooms/${id}/unenrolled-students`,
      providesTags:['UnenrolledStudents'],
      transformResponse: (response: TApiResponse<TUnenrolledStudent[]>) => response.data,
    }),
    addStudents: builder.mutation({
      query: ({id, students}) => ({
        url: `classrooms/${id}/students`,
        method: "POST",
        body: students,
      }),
      invalidatesTags: ['UnenrolledStudents', 'EnrolledStudents']
    }),
    removeStudent: builder.mutation({
      query: ({id, student}) => ({
        url: `classrooms/${id}/students`,
        method: "DELETE",
        body: student,
      }),
      invalidatesTags: ['UnenrolledStudents', 'EnrolledStudents']
    }),
  }),
  overrideExisting: false,
});

export const { useCreateClassroomMutation, useGetClassroomsQuery, useAddStudentsMutation,
   useGetUnenrolledStudentsQuery, useGetEnrolledStudentsQuery, useGetClassroomTeacherQuery 
  ,useRemoveStudentMutation} = classroomsApi;
