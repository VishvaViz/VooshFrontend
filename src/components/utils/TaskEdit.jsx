import React from 'react'

function TaskEdit({ trigger, setTrigger, selectedTask }) {
    console.log('selected',selectedTask)
    return trigger ? (
        <div>
            <div className='w-full h-[100vh]  fixed top-0 left-0 bg-[#00000080] flex justify-center items-center'>
                <div className='w-[500px] h-[85vh] bg-white rounded-md p-[20px] flex flex-col  justify-between '>
                    <div className='flex flex-col gap-5'>
                        <h1 className='text-[18px] font-bold'>Edit Task</h1>

                        <div className='flex flex-col'>
                            <span>Tittle:</span>
                            <input className='outline-none border-b-2' />
                        </div>
                        <div className='flex flex-col'>
                            <span>
                                Decription
                            </span>
                            <textarea className='outline-none border-b-2' />
                        </div>
                        <div>
                            CreatedDate
                        </div>
                    </div>
                    <div className='flex justify-end h-[60px] items-center gap-3'>
                        <button className='w-[60px] h-[30px] p-[5px] bg-slate-200  text-[12px] rounded-md font-semibold'
                            onClick={() => setTrigger(false)}
                        >
                            Save
                        </button>
                        <button className='w-[80px] h-[30px] p-[5px] bg-slate-300  text-[12px] rounded-md font-semibold'
                            onClick={() => setTrigger(false)}
                        >
                            Cancel
                        </button>

                    </div>


                </div>

            </div>
        </div>
    )
        : null
}

export default TaskEdit