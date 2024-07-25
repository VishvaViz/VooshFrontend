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
const token = Cookies.get('token')

export const addTaskAction = (details) => {
    return async (dispatch) => {
        try {
            const resp = await Axios.post(`${baseUrl}/api/task/addtask`, details, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (resp.data?.success) {
                dispatch(addTaskSuccess(resp.data))
            }
            else {
                dispatch(addTaskFailure(resp.data))
            }
        } catch (error) {
            dispatch(addTaskFailure(error))
        }
    };
};

export const addTaskSuccess = (data) => ({
    type:TASKADDEDSUCCESS,
    payload:{data}
})

export const addTaskFailure = (error) => ({
    type:TASKADDEDFAILURE,
    payload:{error}
})


export const getTaskDetails = (details) => {
    return async (dispatch) => {
        try {
            const resp = await Axios.get(`${baseUrl}/api/task/gettask`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (resp.data?.success) {
                dispatch(getTaskDetailsSuccess(resp.data))
            }
            else {
                dispatch(getTaskDetailsFailure(resp.data))
            }
        } catch (error) {
            dispatch(getTaskDetailsFailure(error))
        }
    };
};

export const getTaskDetailsSuccess = (data) => ({
    type:TASKDETAILSSUCCESS,
    payload:{data}
})

export const getTaskDetailsFailure = (error) => ({
    type:TASKDETAILSFAILURE,
    payload:{error}
})




