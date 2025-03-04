import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// const privatePaths = [`/dashboard`, `/projects`]
// const unAuthPaths = [`/login`]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [`/login`, `/dashboard`, '/', `/projects`],
}
