import axios from 'axios'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const baseURL = process.env.API || '/api'

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {},
})

instance.interceptors.request.use(
  (config) => {
    const conf = config
    // const { token } = useUserStore.getState()
    // @ts-ignore
    if (!conf.headers) conf.headers = {}
    // if (token) conf.headers.token = token
    return conf
  },
  (error) => Promise.reject(new Error(error))
)

instance.interceptors.response.use(async (response) => {
  if (response && response.data && response.data.code) {
    if (response.data.code !== 200) {
      // if (response.data.code === 401) {
      //   const { signOut } = userStore.getState();
      //   signOut();
      // }
      return Promise.reject(new Error(response.data.msg || 'server error!'))
    }
  }
  return response.data
})

export default instance
