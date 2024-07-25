import { useState, useEffect } from 'react';
import { MdEventNote } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Axios from 'axios';

import { userLoginAction } from '../../redux/action/user.action';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    const dispatch = useDispatch();
    const userDetails = useSelector(({ user }) => user);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch user login action here
            await dispatch(userLoginAction(details));
            
        } catch (error) {
            console.log('Login Error:', error);
        }
    };


    useEffect(() => {
        if (user) {
            Axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((resp) => {
                    setProfile(resp.data);
                    Cookies.set('profile', JSON.stringify(resp.data));
                    localStorage.setItem('profile', JSON.stringify(resp.data));
                    navigate('/home');
                })
                .catch((err) => console.log(err));
        }
    }, [user, navigate]);
    if (user?.access_token) {
        // Cookies.set('token',user?.access_token)
        // navigate('/home');
    }
    if(userDetails?.success===true){
        Cookies.set('token',userDetails?.token)
        navigate('/home');
    }
    
    console.log('userDetails',userDetails)


    return (
        <div className='h-screen w-full'>
            <div className='bg-blue-600 h-[8%] flex justify-between items-center'>
                <div className='text-[34px] text-white'>
                    <MdEventNote />
                </div>
                <div className='flex gap-10 items-center mr-[20px]'>
                    <button
                        onClick={() => navigate('/login')}
                        className={`${location.pathname.startsWith('/login') ? 'bg-blue-300 h-[30px] w-[70px] p-[1px] rounded-md' : 'h-[30px] w-[70px] p-[1px] rounded-md text-white'}`}>
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className='h-[30px] w-[70px] p-[1px] rounded-md text-white'>
                        SignUp
                    </button>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-2 mt-[20px]'>
                <div className='w-[32%] flex justify-start ml-2'>
                    <h1 className='text-[#2676c2] text-center font-semibold text-[24px]'>Login</h1>
                </div>
                <div className='h-[300px] w-[450px] border-2 shadow border-blue-600 rounded-md flex justify-center items-center'>
                    <form className='w-[90%] h-[90%] flex flex-col gap-4 mt-[20px]' onSubmit={handleFormSubmit}>
                        <input
                            name='email'
                            type='email'
                            value={details.email}
                            onChange={handleInputChange}
                            className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                            placeholder='Email'
                        />
                        <input
                            name='password'
                            type='password'
                            value={details.password}
                            onChange={handleInputChange}
                            className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                            placeholder='Password'
                        />
                        <span className='text-red-500 text-[12px]'>
                            {userDetails?.success===false?userDetails?.message:null}
                        </span>
                        <button type='submit' className='w-full h-[40px] bg-blue-600 text-white font-[400]'>
                            Login
                        </button>
                        <div className='text-center'>
                            <h1>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>SignUp</span></h1>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                type='button'
                                className='text-white bg-blue-600 w-[180px] h-[40px] rounded-md'
                                onClick={() => {
                                    login();
                                    Cookies.set('loginmethod', 'logingoogle');
                                }}
                            >
                                Login with <span className='font-bold'>Google</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
