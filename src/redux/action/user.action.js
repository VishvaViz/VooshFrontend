import {
    LOGINSUCCESS,
    LOGINGFAILURE,
    SIGNUPSUCCESS,
    SIGNUPFAILURE,
    USERDETAILSSUCCESS,
    USERDETAILSFAILURE
} from './actiontype'
import Axios from 'axios';
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_API_URL;
export const userSignUpAction = (details) => {
    return async (dispatch) => {
        try {
            const resp = await Axios.post(`${baseUrl}/api/user/register`, details)
            if (resp.data?.success) {
                dispatch(userSignupSuccess(resp.data))
            }
            else {
                dispatch(userSignupfailure(resp.data))
            }
        } catch (error) {
            dispatch(userSignupfailure(error))
        }
    };
};

export const userLoginAction = (details) => {
    console.log('action', details)
    return async (dispatch) => {
        try {
            const resp = await Axios.post(`${baseUrl}/api/user/login`, details)
            console.log(resp)
            if (resp.data?.success) {
                dispatch(userLoginSuccess(resp.data))
            }
            else {
                dispatch(userLoginfailure(resp.data))
            }
        } catch (error) {
            dispatch(userLoginfailure(error))
        }
    };
}

export const userDetailsAction = () => {
    const token = localStorage.getItem('token')

    return async (dispatch) => {
        try {
            const resp = await Axios.get(`${baseUrl}/api/user/userDetails`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(resp)
            if (resp.data?.success) {
                dispatch(userDetailsSuccess(resp.data))
            }
            else {
                dispatch(userDetailsfailure(resp.data))
            }
        } catch (error) {
            dispatch(userDetailsfailure(error))
        }
    };
}

export const userSignupSuccess = (data) => ({
    type: SIGNUPSUCCESS,
    payload: { data }
})

export const userSignupfailure = (error) => ({
    type: SIGNUPFAILURE,
    payload: { error }
})

export const userLoginSuccess = (data) => ({
    type: LOGINSUCCESS,
    payload: { data }
})

export const userLoginfailure = (error) => ({
    type: LOGINGFAILURE,
    payload: { error }
})

export const userDetailsSuccess = (data) => ({
    type: USERDETAILSSUCCESS,
    payload: { data }
})

export const userDetailsfailure = (error) => ({
    type: USERDETAILSFAILURE,
    payload: { error }
})