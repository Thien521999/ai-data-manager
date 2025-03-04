// import { HttpError } from '@/libs/common/http'
import { HttpError } from '@/lib/http'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = (await request.json()) as { token: string }
  const cookieStore = cookies()

  try {
    // dummy data
    cookieStore.set('token', body.token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(Date.now() + 100000000 * 1000),
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      })
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra',
        },
        {
          status: 500,
        },
      )
    }
  }
}
