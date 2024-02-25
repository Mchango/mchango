import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Parse the cookie header to get the cookies
  const cookieHeader = request.headers.get('cookie')
  const cookies = parseCookies(cookieHeader)
  const walletConnected = cookies['walletConnected']

  console.log('walletConnected', walletConnected)

  // If the wallet is not connected and the user is trying to access a protected path
  if (
    !walletConnected ||
    (walletConnected === 'undefined' && protectedPaths(request))
  ) {
    // Redirect to the signup page
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  // If the wallet is connected or the path is not protected, continue with the request
  return NextResponse.next()
}

// Helper function to parse cookies from the cookie header
function parseCookies(cookieHeader: string | null) {
  const cookies: { [key: string]: string } = {}
  if (cookieHeader) {
    const cookiePairs = cookieHeader.split('; ')
    cookiePairs.forEach((cookie) => {
      const [key, value] = cookie.split('=')
      cookies[key] = value
    })
  }
  return cookies
}

// Helper function to determine if the current path is protected
function protectedPaths(request: NextRequest) {
  const protectedRoutes = ['/home/:path*', '/groups/:path*', '/profile/:path*']
  return protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  )
}

export const config = {
  matcher: ['/home/:path*', '/groups/:path*', '/profile/:path*'],
}
