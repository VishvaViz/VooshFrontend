import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAction} from '../../redux/action/task.action'

function AddTask({ trigger, setTrigger }) {
  const dispatch = useDispatch()
  const [details, setDetails] = useState(
    {
      title: '',
      description: ''
    }
  )
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleAddTask = () => {
    // Dispatch action to add task
    dispatch(addTaskAction(details))
    // Reset the form
    setDetails({ title: '', description: '' });
    setTrigger(false);
  };

  return trigger ? (
    <div className='fixed top-0 left-0 w-full h-full bg-[#00000080] flex justify-center items-center'>
      <div className='w-[500px] h-[85vh] bg-white rounded-md p-[20px] flex flex-col justify-between'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-[18px] font-bold'>Add Task</h1>

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
            onClick={handleAddTask}
          >
            Add
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

export default AddTask