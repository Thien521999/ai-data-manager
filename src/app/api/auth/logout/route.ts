// import authApiRequest from '@/libs/actions/auth'
import authApiRequest from '@/apiRequests/auth'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()

  const token = cookieStore.get('token')?.value

  cookieStore.delete('token')

  if (!token) {
    return Response.json(
      {
        message: 'Không nhận được access token hoặc refresh token',
      },
      {
        status: 200,
      },
    )
  }

  try {
    const result = await authApiRequest.logout()
    return Response.json(result.payload)
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        message: 'Lỗi khi gọi api logout đến server BE',
      },
      {
        status: 200,
      },
    )
  }
}
