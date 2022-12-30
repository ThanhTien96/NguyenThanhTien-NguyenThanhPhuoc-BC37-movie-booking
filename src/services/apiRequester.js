import axios from "axios";


// request severvices
const requester = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        TokenCybersoft: process.env.REACT_APP_API_TOKEN,
    },
});

// interceptor
requester.interceptors.request.use((req) => {
    req.headers = {
        ...req.headers,
        Authorization: "Bearer " + localStorage.getItem('TOKEN'),
    }
    return req;
});

export default requester;