import axios from "axios"


const makeRequest = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true
})


export default makeRequest