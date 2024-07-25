const initialState={
    task:{},
    success:null,
    message:''
}

const taskReducer=(state=initialState, action)=>{
    switch(action.type){
        case 'TASKADDEDSUCCESS':
            return {
                ...state,
                task: action.payload,
                message: action.payload.message,
                success: action.payload.success,
            }
        case 'TASKADDEDFAILURE':
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
            }
        default:
            return state

    }
}

export  {taskReducer}