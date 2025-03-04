/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/lib/http'

const authApiRequest = {
  login: (body: { token: string }) =>
    http.post<any>('/api/auth/login', body, {
      baseUrl: '',
    }),
  logout: () => http.post(`/api/auth/logout`, {}, { baseUrl: '' }),
}

export default authApiRequest
