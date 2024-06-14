// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "796525159183-rc7l893frggsviehgtlush7ve0fo015d.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
})
