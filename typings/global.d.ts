declare namespace NodeJS {
  /**
   * Add custom environment variables
   */
  interface ProcessEnv {
    /* App */
    readonly CI: boolean;
    readonly APP_LOG_LEVEL: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';
    readonly NEXT_PUBLIC_BASE_URL: string;

    readonly IP_INFO_TOKEN: string;

    /* Google tag manager */
    readonly GTAG: string;

    /* Spotify */
    readonly SPOTIFY_CLIENT_ID: string;
    readonly SPOTIFY_CLIENT_SECRET: string;

    /* Deezer */

    /* Youtube */
    readonly YOUTUBE_API_KEY: string;
  }
}

interface ResponseInit {
  timestamp?: string
}
