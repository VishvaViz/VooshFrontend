// DraggableTask.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableTask = ({ task, index, moveTask }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { ...task, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={`w-[90%] h-[145px] bg-blue-100 rounded-md flex flex-col justify-between ${isDragging ? 'opacity-50' : ''}`}>
            <div className='p-[10px]'>
                <span className='text-[16px] font-bold'>{task.title}</span>
                <p>{task.description}</p>
                <span>created at {task.createdAt}</span>
            </div>
            <div className='w-full h-[50px] flex justify-end items-center p-[5px]'>
                <div className='flex gap-3'>
                    <button className='w-[50px] h-[25px] bg-red-400 text-white text-[12px] rounded-md' onClick={() => moveTask(task, 'DELETE')}>Delete</button>
                    <button className='w-[50px] h-[25px] bg-blue-400 text-white text-[12px] rounded-md' onClick={() => moveTask(task, 'EDIT')}>Edit</button>
                    <button className='w-[80px] h-[25px] bg-blue-600 text-white rounded-md text-[12px]' onClick={() => moveTask(task, 'VIEW')}>View Details</button>
                </div>
            </div>
        </div>
    );
};

export default DraggableTask;
