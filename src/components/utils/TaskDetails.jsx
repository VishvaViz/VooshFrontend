import React from 'react'

function TaskDetails({ trigger, setTrigger, selectedTask }) {
    console.log('selected',selectedTask)
    return trigger ? (
        <div>
            <div className='w-full h-[100vh]  fixed top-0 left-0 bg-[#00000080] flex justify-center items-center'>
                <div className='w-[500px] h-[85vh] bg-white rounded-md p-[20px] flex flex-col justify-between '>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-[18px] font-bold'>Task Details</h1>

                        <div>
                            <span className='text-[16px] font-bold'>Tittle:</span><span>{selectedTask?.title}</span>
                        </div>
                        <div>
                            <span className='text-[16px] font-bold'>
                                Decription
                            </span>
                            <span>
                                {selectedTask?.description}
                            </span>
                            
                        </div>
                        <div>
                            <span className='text-[16px] font-bold'>CreatedDate :</span> {selectedTask?.createdAt}
                        </div>
                    </div>
                    <div className='flex justify-end h-[60px] items-center'>
                        <button className='w-[60px] h-[30px] p-[5px] bg-blue-600 text-white text-[12px] rounded-md font-semibold'
                            onClick={() => setTrigger(false)}
                        >
                            Close
                        </button>
                    </div>


                </div>

            </div>
        </div>
    )
    : null
}

export default TaskDetails