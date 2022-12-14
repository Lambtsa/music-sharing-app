interface YoutubeItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    /* The important ID */
    videoId: string;
  };
}

export interface YoutubeApiResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeItem[];
}
