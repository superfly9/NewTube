import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types';

export function registerUser(dataToSubmit){
    const request = Axios.post(`/users/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function loginUser(dataToSubmit){
    const request =await Axios.post(`/users/login`,dataToSubmit)
                .then(response => response.data);
                console.log('at Client Login Action:',request)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function auth(){
    const request =await Axios.get(`/users/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}


