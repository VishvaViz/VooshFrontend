// Home.jsx
import React, { useEffect, useState } from 'react';
import { MdEventNote } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import TaskDetails from '../utils/TaskDetails';
import TaskEdit from '../utils/TaskEdit';
import AddTask from '../utils/AddTask';
import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DroppableColumn from './DroppableColumn';
import { getTaskDetails, deleteTaskDetails, updateTaskStatus } from '../../redux/action/task.action';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [detailsModel, setDetailsModel] = useState(false);
    const [editModel, setEditModel] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('1');
    const taskDetails = useSelector(({ task }) => task?.task?.task);

    useEffect(() => {
        dispatch(getTaskDetails());
    }, [dispatch]);

    const filteredTasks = taskDetails?.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedTasks = filteredTasks?.sort((a, b) => {
        if (sortOption === '1') {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortOption === '2') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    const moveTask = (task, status) => {
        if (status === 'DELETE') {
            dispatch(deleteTaskDetails(task._id));
        } else if (status === 'EDIT') {
            setSelectedTask(task);
            setEditModel(true);
        } else if (status === 'VIEW') {
            setSelectedTask(task);
            setDetailsModel(true);
        } else {
            dispatch(updateTaskStatus({ taskId: task._id, status }));
        }
    };

    const logOut = () => {
        googleLogout();
        Cookies.remove('profile');
        Cookies.remove('token');
        Cookies.remove('loginmethod');
        localStorage.clear();
        navigate('/');
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <TaskDetails trigger={detailsModel} setTrigger={setDetailsModel} selectedTask={selectedTask} />
                <TaskEdit trigger={editModel} setTrigger={setEditModel} selectedTask={selectedTask} />
                <AddTask trigger={addTask} setTrigger={setAddTask} />
                <div className='w-full h-screen'>
                    <div className='bg-blue-600 h-[8%] flex justify-between items-center'>
                        <div className='text-[34px] text-white'>
                            <MdEventNote />
                        </div>
                        <div className='flex gap-10 items-center mr-[20px]'>
                            <button
                                onClick={logOut}
                                className={`${location.pathname.startsWith('/home') ? 'bg-red-400 h-[30px] w-[70px] p-[1px] text-white rounded-md' : 'h-[30px] w-[70px] p-[1px] rounded-md text-white'}`}>
                                Logout
                            </button>
                            <div>
                                {
                                    profile?.picture ? <img className='w-[45px] h-[45px] rounded-[50%]' src={profile?.picture} alt='' />
                                        :
                                        <img className='w-[45px] h-[45px] rounded-[50%]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSheI9UkWllIpSNbs2UdE18KLLswgDON9qzXg&s' alt='' />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-[20px] p-[20px]'>
                        <div>
                            <button className='w-[180px] h-[35px] p-[2px] bg-blue-600 text-white rounded-md' onClick={() => setAddTask(!addTask)}>
                                Add Task
                            </button>
                        </div>
                        <div className='w-full h-[55px] shadow flex items-center justify-between p-[10px] mt-[10px]'>
                            <div className='flex gap-2'>
                                <label className='text-[15px] font-[500]'>Search:</label>
                                <input className='outline-none border h-[30px] w-[280px] placeholder: pl-[10px] placeholder:text-[14px] rounded-md' placeholder='Search...'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='text-[14px] font-[500]'>Sort By:</label>
                                <select className='text-[14px]' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                                    <option value="1">Recent</option>
                                    <option value="2">Name</option>
                                </select>
                            </div>
                        </div>
                        <div className='w-full h-[64vh] mt-[20px] flex items-center justify-evenly p-[5px] gap-3'>
                            <DroppableColumn status="todo" tasks={sortedTasks?.filter(task => task.status === 'todo') || []} moveTask={moveTask} />
                            <DroppableColumn status="inprogress" tasks={sortedTasks?.filter(task => task.status === 'inprogress') || []} moveTask={moveTask} />
                            <DroppableColumn status="done" tasks={sortedTasks?.filter(task => task.status === 'done') || []} moveTask={moveTask} />
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Home;

