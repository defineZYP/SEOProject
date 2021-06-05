import axios from 'axios'

const instance = axios.create({
    baseURL: '/',               // 基础路径，默认为/
    timeout: 5000               // 请求超时，5000ms
})

export default instance