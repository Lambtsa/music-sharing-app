declare namespace NodeJS {
  /**
   * Add custom environment variables
   */
  interface ProcessEnv {
    readonly BASE_URL: string;
    readonly GTAG: string;

    readonly SPOTIFY_CLIENT_ID: string;
    readonly SPOTIFY_CLIENT_SECRET: string;
    
    readonly YOUTUBE_API_KEY: string;

    readonly SUPABASE_PASSWORD: string;
    readonly SUPABASE_ANON_KEY: string;

    readonly SUPABASE_URL: string;
  }
}

interface ResponseInit {
  timestamp?: string
}
