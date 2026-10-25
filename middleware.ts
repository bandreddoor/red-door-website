
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname
  const pathname = request.nextUrl.pathname

  if (
    (hostname === 'reddoorband.com' ||
      hostname === 'www.reddoorband.com') &&
    pathname !== '/' &&
    !pathname.startsWith('/videos/')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|videos).*)',
  ],
}
