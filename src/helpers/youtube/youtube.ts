import { CustomApiErrorMessages } from "@constants/errors";
import { GetMusicLinksInput } from "@customTypes";
import { YoutubeApiResponse } from "./youtube.types";

/**
 * Builds youtube URL using base, artist and track
 * @returns Youtube API URL
 */
export const buildYoutubeApiUrl = ({
  artist,
  title,
}: GetMusicLinksInput): URL => {
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.append("key", process.env.YOUTUBE_API_KEY);
  url.searchParams.append("q", `artist:"${artist}" track:"${title}"`);
  return url;
};

/**
 * Given an id, will return a youtube video url.
 * No testing whether id is actually valid
 * @example https://www.youtube.com/watch?v=8rNuzOUjtE8
 */
export const buildYoutubeVideoUrl = (id: string) => {
  const youtubeUrl = new URL("https://www.youtube.com/watch");
  youtubeUrl.searchParams.append("v", id);
  return youtubeUrl;
};

/**
 * Youtube - Given an artist and title, this helper will return the youtube uri
 * @see https://developers.google.com/youtube/v3/docs
 * @example 'https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=artist:"aloe blacc" track:"i need a dollar"'
 */
export const searchYoutube = async (input: GetMusicLinksInput) => {
  const youtubeUri = buildYoutubeApiUrl(input);

  const response = await fetch(youtubeUri.toString(), {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error(CustomApiErrorMessages.ExternalApiIssue);
  }

  const data = (await response.json()) as YoutubeApiResponse;

  /* TODO: This will need optimising because currently only returns the first element found + need better searching */
  const track = data.items[0]?.id.videoId;

  if (!track) {
    throw new Error(CustomApiErrorMessages.NoTrack);
  }

  return buildYoutubeVideoUrl(track).toString();
};
