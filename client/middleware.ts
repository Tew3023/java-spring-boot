import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const userRole = request.cookies.get('userRole')?.value

  if (!userRole) {
    return NextResponse.redirect(new URL('/',request.url))
  }


  if (userRole !== 'admin' && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/error', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*', 
}
