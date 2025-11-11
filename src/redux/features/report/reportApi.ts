import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/report/all?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.report],
    }),
    getReportDetails: builder.query({
      query: (id) => ({
        url: `/report/details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.report],
    }),
  }),
});

export const { useGetAllReportsQuery, useGetReportDetailsQuery } = reportApi;
