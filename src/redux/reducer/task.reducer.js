const initialState = {
    task: {},
    success: null,
    message: ''
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKADDEDSUCCESS':
            return {
                ...state,
                task: action.payload.data,
                message: action.payload.data.message,
                success: action.payload.data.success,
            }
        case 'TASKADDEDFAILURE':
            return {
                ...state,
                message: action.payload.error.message,
                success: action.payload.error.success,
            }
        case 'TASKDETAILSSUCCESS':
            return {
                ...state,
                task: action.payload.data,
                message: action.payload.data.message,
                success: action.payload.data.success,
            }
        case 'TASKDETAILSFAILURE':
            return {
                ...state,
                message: action.payload.error.message,
                success: action.payload.error.success,
            }
        default:
            return state

    }
}

export { taskReducer }