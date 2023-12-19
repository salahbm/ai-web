import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const rapidApiKey =
    import.meta.env.VITE_APP_API_KEY

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ai-summarizer.p.rapidapi.com/'
    }),
    prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', rapidApiKey);
        headers.set('X-RapidAPI-Host', 'ai-summarizer.p.rapidapi.com')

        return headers;
    },
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (param) => `/summarize?url=${encodeURIComponent(param.articleUrl)}&length=3`
        })
    })
})

export const {
    useLazyGetSummaryQuery
} = articleApi