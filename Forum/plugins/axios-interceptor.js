export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  })

  $axios.onError((error) => {
    // Xử lý lỗi response
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      return redirect('/auth/login')
    }
    return Promise.reject(error)
  })
}
