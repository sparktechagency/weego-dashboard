import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUsersOverview: builder.query({
    //   query: () => "/users/stats",
    //   providesTags: [tagTypes.users],
    // }),
    getAllBooking: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/booking/all?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    getBookingDetails: builder.query({
      query: (id) => ({
        url: `/booking/admin/request-details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
  }),
});

export const { useGetAllBookingQuery, useGetBookingDetailsQuery } = bookingApi;
