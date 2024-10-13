import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
// import SpotifyProvider, { SpotifyProfile } from "next-auth/providers/spotify";
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 11, // 11 hours
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  // pages: {
  //   signIn: '/auth/signin',
  // },
  providers: [
    // SpotifyProvider({
    //   clientId: process.env.SPOTIFY_CLIENT_ID,
    //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    //   profile(profile: SpotifyProfile) {
    //     return {
    //       id: profile.id,
    //       name: profile.display_name,
    //       email: profile.email,
    //       image: profile.images?.[0]?.url,
    //     }
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          sub: profile.sub,
          email: profile.email,
          email_verified: profile.email_verified,
          family_name: profile.family_name,
          given_name: profile.given_name,
          name: profile.name,
          picture: profile.picture,
          iat: profile.iat,
          iss: profile.iss,
          jti: profile.jti,
          exp: profile.exp,
        };
      },
    })
  ],
  callbacks: {
    async jwt({ token: defaultToken, user }) {
      const token: JWT = {
        ...defaultToken,
        ...(user || {}),
      };
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token
        },
      };
    },

  },
};
