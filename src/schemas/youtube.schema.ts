import { z } from 'zod';


export const youtubeVideoApiResponseSchema = z.object({
  kind: z.literal('youtube#searchResult'),
  etag: z.string(),
  id: z.object({
    kind: z.literal('youtube#video'),
    videoId: z.string(),
  }),
  snippet: z.object({
    publishedAt: z.string(),
    channelId: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnails: z.object({
      default: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number()
      }),
      medium: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number()
      }),
      high: z.object({
        url: z.string(),
        width: z.number(),
        height: z.number()
      })
    }),
    channelTitle: z.string(),
    liveBroadcastContent: z.string(),
    publishTime: z.string(),
  })
});

export const youtubeSearchApiResponseSchema = z.object({
  kind: z.literal('youtube#searchListResponse'),
  etag: z.string(),
  /* ISO country codes */
  regionCode: z.string(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number()
  }),
  items: z.array(youtubeVideoApiResponseSchema),
});