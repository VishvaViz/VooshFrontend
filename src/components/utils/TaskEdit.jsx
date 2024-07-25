import  { useState, useEffect } from 'react';
import {editTaskDetails} from '../../redux/action/task.action'
import { useDispatch } from 'react-redux';

function TaskEdit({ trigger, setTrigger, selectedTask }) {
  const dispatch = useDispatch()
    const [details, setDetails] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        if (selectedTask) {
            setDetails({
                title: selectedTask?.title,
                description: selectedTask?.description,
                taskId:selectedTask?._id,
                status:'inprogress'
            });
        }
    }, [selectedTask]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const handleSaveTask = () => {
        // Dispatch action to save edited task
        console.log('Saving Task:', details);
        dispatch(editTaskDetails(details))
        // Close the modal
        
        setTrigger(false);
    };

    return trigger ? (
        <div className='fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center'>
            <div className='w-[500px] h-[85vh] bg-white rounded-md p-[20px] flex flex-col justify-between'>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-[18px] font-bold'>Edit Task</h1>

                    <div className='flex flex-col'>
                        <label className='font-semibold'>Title:</label>
                        <input
                            className='outline-none border-b-2 p-2'
                            name='title'
                            value={details.title}
                            onChange={handleInputChange}
                            placeholder='Enter title'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold'>Description:</label>
                        <textarea
                            className='outline-none border-b-2 p-2'
                            name='description'
                            value={details.description}
                            onChange={handleInputChange}
                            placeholder='Enter description'
                        />
                    </div>
                   
                </div>
                <div className='flex justify-end items-center gap-3'>
                    <button
                        className='w-[60px] h-[30px] p-[5px] bg-slate-200 text-[12px] rounded-md font-semibold'
                        onClick={handleSaveTask}
                    >
                        Save
                    </button>
                    <button
                        className='w-[80px] h-[30px] p-[5px] bg-slate-300 text-[12px] rounded-md font-semibold'
                        onClick={() => setTrigger(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default TaskEdit;
