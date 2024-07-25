import { useState, useEffect } from 'react'
import { MdEventNote } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import TaskDetails from '../utils/TaskDetails';
import TaskEdit from '../utils/TaskEdit';
import AddTask from '../utils/AddTask';
import Cookies from 'js-cookie';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskDetails, deleteTaskDetails } from '../../redux/action/task.action'



function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [detailsModel, setDetailslModel] = useState(false)
    const [editModel, setEditModel] = useState(false)
    const [addTask, setAddTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const profile = JSON.parse(localStorage.getItem('profile'))
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('1');
    const userDetails = useSelector(({ user }) => user);

    const viewDetailsHanlder = (details) => {
        setSelectedTask(details)
        setDetailslModel(!detailsModel)

    }
    const editDetailsHandler = (details) => {
        setSelectedTask(details)
        setEditModel(!editModel)

    }

    const logOut = () => {
        googleLogout();
        Cookies.remove('profile');
        Cookies.remove('token');
        Cookies.remove('loginmethod');
        localStorage.clear();
        navigate('/');
    };
    useEffect(() => {
        dispatch(getTaskDetails())
    }, [dispatch])

    const taskDetails = useSelector(({ task }) => task?.task?.task)
    console.log('taskDetails', taskDetails)

    const filteredTasks = taskDetails?.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedTasks = filteredTasks?.sort((a, b) => {
        if (sortOption === '1') {
            // Sort by recent
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortOption === '2') {
            // Sort by name
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    // console.log('userdetails', userDetails)


    return (
        <div>
            <TaskDetails trigger={detailsModel} setTrigger={setDetailslModel} selectedTask={selectedTask} />
            <TaskEdit trigger={editModel} setTrigger={setEditModel} selectedTask={selectedTask} />
            <AddTask trigger={addTask} setTrigger={setAddTask} />

            <div className='w-full h-screen'>
                <div className='bg-blue-600 h-[8%] flex justify-between items-center  '>
                    <div className='text-[34px] text-white'>
                        <MdEventNote />
                    </div>
                    <div className='flex gap-10 items-center mr-[20px]'>
                        <button
                            onClick={logOut}
                            className={`${location.pathname.startsWith('/home') ? 'bg-red-400 h-[30px] w-[70px] p-[1px] text-white  rounded-md' : ' h-[30px] w-[70px] p-[1px]  rounded-md text-white'}`}>
                            Logout
                        </button>
                        <div>
                            {
                                profile?.picture ? <img className='w-[50px] h-[50px] rounded-[50%]' src={profile?.picture} alt='' />
                                    :
                                <img className='w-[50px] h-[50px] rounded-[50%]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSheI9UkWllIpSNbs2UdE18KLLswgDON9qzXg&s' alt='' />
                            }
                        </div>
                    </div>
                </div>

                <div className='mt-[20px] p-[20px]'>
                    <div>
                        <button className='w-[180px] h-[35px] p-[2px] bg-blue-600 text-white rounded-md'
                            onClick={() => setAddTask(!addTask)}
                        >
                            Add Task
                        </button>
                    </div>
                    <div className='w-full h-[55px] shadow flex items-center justify-between p-[10px] mt-[10px]'>
                        <div className='flex gap-2'>
                            <label className='text-[15px] font-[500]'>
                                Search:
                            </label>
                            <input className='outline-none border h-[30px] w-[280px] placeholder: pl-[10px] placeholder:text-[14px] rounded-md ' placeholder='Search...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='text-[14px] font-[500]'>
                                Sort By:
                            </label>
                            <select
                                className='text-[14px]'
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option value="1">Recent</option>
                                <option value="2">Name</option>
                            </select>

                        </div>
                    </div>
                    <div className='w-full h-[64vh] mt-[20px] flex items-center justify-evenly p-[5px] gap-3'>
                        <div className='w-[33%] h-[98%] bg-white shadow-lg  rounded-md p-[3px] flex flex-col gap-2 items-center '>
                            <div className='w-[90%] h-[30px] bg-blue-500 flex items-center rounded-sm '>
                                <span className='text-[16px] text-white p-[8px]  font-bold'>TODO</span>
                            </div>
                            <div className='w-full flex flex-col items-center gap-2  overflow-y-scroll Scroll '>
                                {
                                    sortedTasks?.length > 0 ?
                                        <>
                                            {
                                                sortedTasks?.map((task, index) => {
                                                    return (
                                                        <div key={index} className='w-[90%] h-[145px] bg-blue-100 rounded-md  flex flex-col justify-between'>
                                                            <div className='p-[10px]'>
                                                                <span className='text-[16px] font-bold'>
                                                                    {task?.title}
                                                                </span>
                                                                <p>
                                                                    {task?.description}
                                                                </p>
                                                                <span>
                                                                    created at {task?.createdAt}.
                                                                </span>

                                                            </div>
                                                            <div className=' w-full h-[50px] flex justify-end items-center p-[5px]'>
                                                                <div className='flex gap-3'>
                                                                    <button className='w-[50px] h-[25px] bg-red-400 text-white text-[12px] rounded-md'
                                                                        onClick={() => dispatch(deleteTaskDetails(task?._id))}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <button className='w-[50px] h-[25px] bg-blue-400 text-white text-[12px] rounded-md'
                                                                        onClick={() => editDetailsHandler(task)}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button className='w-[80px] h-[25px] bg-blue-600 text-white rounded-md text-[12px]'
                                                                        onClick={() => viewDetailsHanlder(task)}
                                                                    >
                                                                        View Details
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <div className='w-full h-[300px] flex justify-center items-center '>
                                            <span>
                                                No Task Found
                                            </span>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='w-[33%] h-[98%] bg-white shadow-lg  rounded-md p-[3px] flex flex-col gap-2 items-center '>
                            <div className='w-[90%] h-[30px] bg-blue-500 flex items-center rounded-sm '>
                                <span className='text-[16px] text-white p-[8px]  font-bold'>IN PROGRESS</span>
                            </div>
                            <div className='w-full flex flex-col items-center gap-2  overflow-y-scroll Scroll '>
                                {
                                    [1, 2, 3, 4, 5].map((index) => {
                                        return (


                                            <div className='w-[90%] h-[145px] bg-blue-100 rounded-md  flex flex-col justify-between'>
                                                <div className='p-[10px]'>
                                                    <span className='text-[16px] font-bold'>
                                                        Task {index}
                                                    </span>
                                                    <p>
                                                        Description {index}
                                                    </p>
                                                    <span>
                                                        created at 01/20/2020, 04.432.
                                                    </span>

                                                </div>
                                                <div className=' w-full h-[50px] flex justify-end items-center p-[5px]'>
                                                    <div className='flex gap-3'>
                                                        <button className='w-[50px] h-[25px] bg-red-400 text-white text-[12px] rounded-md'>
                                                            Delete
                                                        </button>
                                                        <button className='w-[50px] h-[25px] bg-blue-400 text-white text-[12px] rounded-md'  >
                                                            Edit
                                                        </button>
                                                        <button className='w-[80px] h-[25px] bg-blue-600 text-white rounded-md text-[12px]'>
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='w-[33%] h-[98%] bg-white shadow-lg  rounded-md p-[3px] flex flex-col gap-2 items-center '>
                            <div className='w-[90%] h-[30px] bg-blue-500 flex items-center rounded-sm'>
                                <span className='text-[16px] text-white p-[8px]  font-bold'>DONE</span>
                            </div>
                            <div className='w-full flex flex-col items-center gap-2  overflow-y-scroll Scroll '>
                                {
                                    [1, 2, 3, 4, 5].map((index) => {
                                        return (


                                            <div className='w-[90%] h-[145px] bg-blue-100 rounded-md  flex flex-col justify-between'>
                                                <div className='p-[10px]'>
                                                    <span className='text-[16px] font-bold'>
                                                        Task {index}
                                                    </span>
                                                    <p>
                                                        Description {index}
                                                    </p>
                                                    <span>
                                                        created at 01/20/2020, 04.432.
                                                    </span>

                                                </div>
                                                <div className=' w-full h-[50px] flex justify-end items-center p-[5px]'>
                                                    <div className='flex gap-3'>
                                                        <button className='w-[50px] h-[25px] bg-red-400 text-white text-[12px] rounded-md'>
                                                            Delete
                                                        </button>
                                                        <button className='w-[50px] h-[25px] bg-blue-400 text-white text-[12px] rounded-md'  >
                                                            Edit
                                                        </button>
                                                        <button className='w-[80px] h-[25px] bg-blue-600 text-white rounded-md text-[12px]'>
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home