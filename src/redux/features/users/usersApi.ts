import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllUsersOverview: builder.query({
    //   query: () => "/users/stats",
    //   providesTags: [tagTypes.users],
    // }),
    getAllUsers: builder.query({
      query: ({ page, limit, searchTerm, role }) => ({
        url: `/users/all?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role=${role}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    blockAndUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/users/block/${req.params}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockAndUnblockUserMutation } = UsersApi;
