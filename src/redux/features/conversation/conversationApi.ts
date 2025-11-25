import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getConversationList: build.query({
      query: ({ page = 1, limit = 1000000, searchTerm }) => {
        return {
          url: `/chat/admin-chat-list`,
          method: "GET",
          params: {
            page,
            limit,
            searchTerm,
          },
        };
      },
      providesTags: [tagTypes.conversation],
    }),
    getConversationMessageList: build.query({
      query: ({ id, page, limit }) => ({
        url: `/message/chats/${id}`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const {
  useGetConversationListQuery,
  useGetConversationMessageListQuery,
} = conversationApi;

export default conversationApi;
