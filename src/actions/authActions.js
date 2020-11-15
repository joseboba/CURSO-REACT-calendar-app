import Swal from "sweetalert2";
import { types } from "../types/types";
import { eventLogout } from "./eventActions";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"

export const startLogin = ( email, password ) => {
    return async(dispatch) => {
        
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            if( body.msg ){ 
                Swal.fire('Error', body.msg, 'error')
            }else{
                if(body.errors.password) Swal.fire('Error',body.errors.password.msg, 'error')
                else Swal.fire('Error', body.errors.email.msg, 'error')
            }
        }
    }
}

export const startRegister = (email, password, name) => {
    return async(dispatch) => {

        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

    
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            if( body.msg ){ 
                Swal.fire('Error', body.msg, 'error')
            }else{
                if(body.errors.password) {
                    Swal.fire('Error',body.errors.password.msg, 'error')
                }
                else if(body.errors.email){ 
                    Swal.fire('Error', body.errors.email.msg, 'error')
                }else{
                    Swal.fire('Error', body.errors.name.msg, 'error')
                }
            }
        }

    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        }else{
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => {
    return{
        type: types.authCheckingFinish
    }
} 


const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: user
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        
        localStorage.clear();
        dispatch(logout())
        dispatch(eventLogout())

    }
}

const logout = () => {
    return {
        type: types.authLogout
    }
}