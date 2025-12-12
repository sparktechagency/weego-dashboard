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
    getAppReport: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/reportAproblem/all?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.report],
    }),
    getImprovementSuggestion: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/improvement/all?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.report],
    }),
    markAsSolved: builder.mutation({
      query: (req) => ({
        url: `/report/read-unread/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.report],
    }),
  }),
});

export const {
  useGetAllReportsQuery,
  useGetReportDetailsQuery,
  useGetAppReportQuery,
  useGetImprovementSuggestionQuery,
  useMarkAsSolvedMutation,
} = reportApi;
