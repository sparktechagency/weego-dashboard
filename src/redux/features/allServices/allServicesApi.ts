import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const allServicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUsersOverview: builder.query({
    //   query: () => "/users/stats",
    //   providesTags: [tagTypes.users],
    // }),
    getAllServices: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/service/admin/all?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
  }),
});

export const { useGetAllServicesQuery } = allServicesApi;
