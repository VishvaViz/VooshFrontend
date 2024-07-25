import Axios from 'axios';
import {
    TASKADDEDSUCCESS,
    TASKADDEDFAILURE,
    TASKEDITEDSUCCESS,
    TASKEDITEDFAILURE,
    TASKDELETEDSUCCESS,
    TASKDELETEDFAILURE,
    TASKDETAILSSUCCESS,
    TASKDETAILSFAILURE
} from './actiontype'
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_API_URL;
const token=Cookies.get('token')

export const addTaskAction = (details) => {
    return async (dispatch) => {
        try {
            const resp = await Axios.post(`${baseUrl}/api/user/register`, details,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if (resp.data?.success) {
                // dispatch(userSignupSuccess(resp.data))
            }
            else {
                // dispatch(userSignupfailure(resp.data))
            }
        } catch (error) {
            // dispatch(userSignupfailure(error))
        }
    };
};