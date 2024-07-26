// DroppableColumn.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableTask from './DraggableTask';

const DroppableColumn = ({ status, tasks, moveTask }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => moveTask(item, status),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`w-[33%] h-[98%] bg-white shadow-lg rounded-md p-[3px] flex flex-col gap-2 items-center ${isOver ? 'bg-blue-100' : ''}`}>
            <div className='w-[90%] h-[30px] bg-blue-500 flex items-center rounded-sm'>
                <span className='text-[16px] text-white p-[8px] font-bold'>{status.toUpperCase()}</span>
            </div>
            <div className='w-full flex flex-col items-center gap-2 overflow-y-scroll Scroll'>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <DraggableTask key={task._id} task={task} index={index} moveTask={moveTask} />
                    ))
                ) : (
                    <div className='w-full h-[300px] flex justify-center items-center'>
                        <span>No Task Found</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DroppableColumn;
