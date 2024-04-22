import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  //TODO: tirar depois que tela home for concluída.
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
