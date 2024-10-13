import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/v1`,
});

const baseQueryExtented: BaseQueryFn = async (args, appi, extraOptions) => {
  const result = await baseQuery(args, appi, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtented,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["todo"],
  endpoints: () => ({}),
});
