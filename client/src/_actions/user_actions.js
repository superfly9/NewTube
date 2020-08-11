import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = Axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function loginUser(dataToSubmit){
    const request =await Axios.post(`${USER_SERVER}/login`,dataToSubmit,{withCredentials:true})
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function auth(){
    const request =await Axios.post(`${USER_SERVER}/auth`,{},{withCredentials:true})
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export async function logoutUser(){
    const request =await Axios.post(`${USER_SERVER}/logout`,{},
    {withCredentials:true})
    .then(response => response.data);
    console.log('when logout:',request);
    return {
        type: LOGOUT_USER,
        payload: request
    }
    /* {
        success : true,
        type: logout_user
    }
    */
}

