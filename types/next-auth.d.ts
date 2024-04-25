declare module 'next-auth' {
  interface Session {
    user: {
      isAdmin: boolean
    }
  }
}
