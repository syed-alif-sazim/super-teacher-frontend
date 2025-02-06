import { TApiResponse } from "@/shared/typedefs";
import projectApi from "../api.config";
import { TMaterial } from "./materials.types";

const materialsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    addMaterial: builder.mutation({
      query: ({ id, formData }) => ({
        url: `classrooms/${id}/materials`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags:["Materials"]
    }),
    getAllMaterials: builder.query({
      query: (id) => `classrooms/${id}/materials`,
      providesTags: ["Materials"],
      transformResponse: (response: TApiResponse<TMaterial[]>) => response.data,
    }),
  })
});

export const {useAddMaterialMutation, useGetAllMaterialsQuery } = materialsApi;