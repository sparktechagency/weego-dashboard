import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({ page, limit, search }) => ({
        url: `category/all?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    addCategory: builder.mutation({
      query: (req) => ({
        url: `/category/add`,
        method: "POST",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation({
      query: (req) => ({
        url: `/category/edit/${req.params.id}`,
        method: "PUT",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation({
      query: (req) => ({
        url: `/category/delete/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
