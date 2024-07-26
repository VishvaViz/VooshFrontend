import Axios from 'axios';
import {
    TASKADDEDSUCCESS,
    TASKADDEDFAILURE,
    TASKEDITEDSUCCESS,
    TASKEDITEDFAILURE,
    TASKDELETEDSUCCESS,
    TASKDELETEDFAILURE,
    TASKDETAILSSUCCESS,
    TASKDETAILSFAILURE,
    TASKSTATUSSUCCESS,
    TASKSTATUSFAILURE
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
    type: TASKADDEDSUCCESS,
    payload: { data }
})

export const addTaskFailure = (error) => ({
    type: TASKADDEDFAILURE,
    payload: { error }
})


export const getTaskDetails = (details) => {
    return async (dispatch) => {
        try {
            const resp = await Axios.get(`${baseUrl}/api/task/gettask`, {
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
    type: TASKDETAILSSUCCESS,
    payload: { data }
})

export const getTaskDetailsFailure = (error) => ({
    type: TASKDETAILSFAILURE,
    payload: { error }
})

export const editTaskDetails = (details) => {

    return async (dispatch) => {
        try {
            const resp = await Axios.put(`${baseUrl}/api/task/edittask`, { details }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (resp.data?.success) {
                dispatch(editTaskDetailsSuccess(resp.data))
            }
            else {
                dispatch(editTaskDetailsFailure(resp.data))
            }
        } catch (error) {
            dispatch(editTaskDetailsFailure(error))
        }
    };
};

export const editTaskDetailsSuccess = (data) => ({
    type: TASKEDITEDSUCCESS,
    payload: { data }
})

export const editTaskDetailsFailure = (error) => ({
    type: TASKEDITEDFAILURE,
    payload: { error }
})


export const deleteTaskDetails = (taskId) => {
    console.log('taskId', taskId)
    return async (dispatch) => {
        try {
            const resp = await Axios.delete(`${baseUrl}/api/task/deletetask/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('action', resp.data)
            if (resp.data?.success) {
                dispatch(deleteDetailsSuccess(resp.data))
            }
            else {
                dispatch(deleteDetailsFailure(resp.data))
            }
        } catch (error) {
            dispatch(deleteDetailsFailure(error))
        }
    };
};

export const deleteDetailsSuccess = (data) => ({
    type: TASKDELETEDSUCCESS,
    payload: { data }
})

export const deleteDetailsFailure = (error) => ({
    type: TASKDELETEDFAILURE,
    payload: { error }
})

export const updateTaskStatus = (taskId) => {
    console.log('taskId', taskId)
    return async (dispatch) => {
        try {
            const resp = await Axios.patch(`${baseUrl}/api/task/updatestatus/${taskId?.taskId}`, {status:taskId?.status} , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('action', resp.data)
            if (resp.data?.success) {
                dispatch({
                    type: TASKSTATUSSUCCESS,
                    payload: { data: resp.data }
                })
            }
            else {
                dispatch({
                    type: TASKSTATUSFAILURE,
                    payload: { error: resp.data }
                })
            }
        } catch (error) {
            dispatch({
                type: TASKSTATUSFAILURE,
                payload: { error: error }
            })
        }
    };
};





