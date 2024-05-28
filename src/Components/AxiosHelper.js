import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/taskmanagement',
    headers:{
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) =>{
        const email = localStorage.getItem('email');
        if(email){
            config.headers['Email'] = email;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) =>{
        if(error.response.status === '401'){
            localStorage.removeItem('email');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default AxiosHelper;
