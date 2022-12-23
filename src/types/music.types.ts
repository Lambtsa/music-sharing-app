import { GetMusicLinksInput, LinksResponseData } from "./external.types";

export interface ResponseLinksApi {
  links: LinksResponseData[];
  details: GetMusicLinksInput;
}
