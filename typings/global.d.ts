declare namespace NodeJS {
  /**
   * Add custom environment variables
   */
  interface ProcessEnv {
    readonly GTAG: string;

    readonly SPOTIFY_CLIENT_ID: string;
    readonly SPOTIFY_CLIENT_SECRET: string;
    
    readonly YOUTUBE_API_KEY: string;
  }
}

interface ResponseInit {
  timestamp?: string
}
