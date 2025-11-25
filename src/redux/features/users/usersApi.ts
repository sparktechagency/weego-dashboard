import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUsersOverview: builder.query({
    //   query: () => "/users/stats",
    //   providesTags: [tagTypes.users],
    // }),
    getAllUsers: builder.query({
      query: ({ page, limit, search, role }) => ({
        url: `/users/all?page=${page}&limit=${limit}&search=${search}&role=${role}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `/users/admin/userbyId/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    blockAndUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/users/ban-unban/${req.params}`,
        method: "PUT",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getUserRatio: builder.query({
      query: ({ year }) => ({
        url: `/users/user-ratio?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getAllCounts: builder.query({
      query: () => ({
        url: `/users/counts`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.earning],
    }),
    getAllEarningRatio: builder.query({
      query: ({ year }) => ({
        url: `/transaction/earning-ratio?year=${year}`,
        method: "GET",
      }),
      providesTags: [tagTypes.earning],
    }),
    getAllNotifications: builder.query({
      query: ({ page, limit }) => ({
        url: `/notifications/notification-adminend?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useBlockAndUnblockUserMutation,
  useGetUserRatioQuery,
  useGetAllCountsQuery,
  useGetAllEarningRatioQuery,
  useGetAllNotificationsQuery,
} = UsersApi;
