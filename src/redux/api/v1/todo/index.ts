import { api as index } from "../..";

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    postTodo: builder.mutation<TODO.PostTodoResponse, TODO.PostTodoRequest>({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    getTodo: builder.query<TODO.GetTodoResponse, TODO.GetTodoRequest>({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<
      TODO.DeleteTodoResponse,
      TODO.DeleteTodoRequest
    >({
      query: (_id) => ({
        url: `${ENDPOINT}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: builder.mutation({
      query: (data) => {
        const { _id, ...updateData } = data;
        return {
          url: `${ENDPOINT}/${_id}`,
          method: "PUT",
          body: updateData,
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  usePostTodoMutation,
  useGetTodoQuery,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = api;
