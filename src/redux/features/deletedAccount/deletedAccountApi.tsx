import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const deletedAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeleted: builder.query({
      query: ({ page, limit }) => ({
        url: `/delete/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: [tagTypes.deleted],
    }),
  }),
});

export const { useGetAllDeletedQuery } = deletedAccountApi;
