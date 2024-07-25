const initialState = {
    user: {},
    token:'',
    success: null,
    message: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUPSUCCESS':
            return {
                ...state,
                user: action.payload.data.user,
                token:action.payload.data.token,
                message: action.payload.data.message,
                success: action.payload.data.success,
            }
        case 'SIGNUPFAILURE':
            return {
                ...state,
                message: action.payload.error.message,
                success: false,
            }
        case 'LOGINSUCCESS':
            return {
                ...state,
                user: action.payload.data.user,
                token:action.payload.data.token,
                message: action.payload.data.message,
                success: action.payload.data.success,
            }
        case 'LOGINGFAILURE':
            return {
                ...state,
                message: action.payload.error.message,
                success: action.payload.error.success,
            }
        default:
            return state

    }
}

export { userReducer };