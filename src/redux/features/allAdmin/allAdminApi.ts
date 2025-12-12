import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const allAdmin_url = "/admin";

const allAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (req) => ({
        url: `${allAdmin_url}/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
    getAdmin: build.query({
      query: ({ page, limit, searchTerm }) => {
        return {
          url: `${allAdmin_url}/all`,
          method: "GET",
          params: {
            page,
            limit,
            search: searchTerm,
          },
        };
      },
      providesTags: [tagTypes.allAdmin],
    }),
    updateAdmin: build.mutation({
      query: (req) => ({
        url: `/admin/edit/${req?.params}`,
        method: "PUT",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
    deleteAdmin: build.mutation({
      query: (req) => ({
        url: `/admin/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.allAdmin],
    }),
  }),
});

export const {
  useAddAdminMutation,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = allAdminApi;

export default allAdminApi;
