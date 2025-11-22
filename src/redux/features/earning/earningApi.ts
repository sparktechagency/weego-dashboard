import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarning: builder.query({
      query: ({ search, page, limit }) => ({
        url: `/transaction/earning-transaction?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: [tagTypes.earning],
    }),
    getAllTransaction: builder.query({
      query: ({ search, page, limit }) => ({
        url: `/transaction/alltransactions?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: [tagTypes.earning],
    }),
  }),
});

export const { useGetAllEarningQuery, useGetAllTransactionQuery } = earningApi;
