import axios from 'axios'

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authdata) {
        return { 'Authorization': 'Bearer ' + user.authdata };
    } else {
        return {};
    }
}


export function getAxiosInstance(){
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        const axiosInstance = axios.create({
            timeout: 1000,
            headers: {"Authorization" : `Bearer ${user.token}`}
        });
        return axiosInstance;
    }
    return {}
}
