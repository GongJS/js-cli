import axios, { AxiosResponse } from 'axios';
import { SERVER } from './variable'

const BASE_URL = process.env.JS_CLI_BASE_URL ? process.env.JS_CLI_BASE_URL : SERVER.apiUrl

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
})

request.interceptors.response.use( (response: AxiosResponse) => {
    if (response.status === 200) {
        return response.data
    }},
    (error: any) => {
        return Promise.reject(error)
    })

export default request
