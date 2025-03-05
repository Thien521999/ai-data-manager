import http from '@/lib/http'

const authApiRequest = {
  login: (body: { token: string }) =>
    http.post('/api/auth/login', body, {
      baseUrl: '',
    }),
  logout: () => http.post(`/api/auth/logout`, {}, { baseUrl: '' }),
}

export default authApiRequest
