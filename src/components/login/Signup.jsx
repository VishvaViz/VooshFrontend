import { useState, useEffect, useRef } from 'react';
import { MdEventNote } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../../redux/action/user.action'
// import Axios from 'axios';
import Axios from 'axios'


function Signup() {
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [errors, setErrors] = useState({});

    const inputRefs = useRef([]);

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
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmpassword } = details;

        const newErrors = {};
        let valid = true;

        if (!firstName) {
            newErrors.firstName = 'First name is required';
            valid = false;
        }

        if (!lastName) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        if (password !== confirmpassword) {
            newErrors.confirmpassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            dispatch(userSignUpAction(details))
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };
    useEffect(() => {
        if (user?.access_token) {
            const details = {
                firstName: profile?.name,
                lastName: profile?.given_name,
                email: profile?.email,
                password: profile?.name,
            }
            dispatch(userSignUpAction(details))
        }
    }, [dispatch, profile])
    if (userDetails?.success) {
        Cookies.set('token', userDetails?.token)
        navigate('/home');
    }

    return (
        <div className='h-screen w-full'>
            <div className='bg-blue-600 h-[8%] flex justify-between items-center'>
                <div className='text-[34px] text-white'>
                    <MdEventNote />
                </div>
                <div className='flex gap-10 items-center mr-[20px]'>
                    <button
                        onClick={() => navigate('/login')}
                        className={`${location.pathname.startsWith('/login') ? 'bg-blue-300' : 'h-[30px] w-[70px] p-[1px] rounded-md text-white'}`}>
                        Login
                    </button>
                    <button className={`${location.pathname.startsWith('/') ? 'bg-blue-200 h-[30px] w-[70px] p-[1px] rounded-md' : 'h-[30px] w-[70px] p-[1px] rounded-md text-white'}`}>
                        SignUp
                    </button>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-2 mt-[20px]'>
                <div className='w-[32%] flex justify-start ml-2'>
                    <h1 className='text-[#2676c2] text-center font-semibold text-[24px]'>SignUp</h1>
                </div>
                <div className='h-[490px] w-[450px] border-2 shadow border-blue-600 rounded-md flex justify-center items-center'>
                    <div className='w-[94%] h-[94%] mt-[20px] flex flex-col gap-3'>
                        {/* <form className=''> */}
                        <div>
                            <input
                                ref={(el) => (inputRefs.current[0] = el)}
                                name='firstName'
                                value={details.firstName}
                                onChange={handleChange}
                                onKeyPress={(e) => handleKeyPress(e, 0)}
                                className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                                placeholder='First Name'
                            />
                            {errors.firstName && <span className='text-red-500 text-[11px]'>{errors.firstName}</span>}
                        </div>
                        <div>
                            <input
                                ref={(el) => (inputRefs.current[1] = el)}
                                name='lastName'
                                value={details.lastName}
                                onChange={handleChange}
                                onKeyPress={(e) => handleKeyPress(e, 1)}
                                className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                                placeholder='Last Name'
                            />
                            {errors.lastName && <span className='text-red-500 text-[12px]'>{errors.lastName}</span>}
                        </div>
                        <div>
                            <input
                                ref={(el) => (inputRefs.current[2] = el)}
                                name='email'
                                value={details.email}
                                onChange={handleChange}
                                onKeyPress={(e) => handleKeyPress(e, 2)}
                                className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                                placeholder='Email'
                            />
                            {errors.email && <span className='text-red-500 text-[12px]'>{errors.email}</span>}
                        </div>
                        <div>
                            <input
                                ref={(el) => (inputRefs.current[3] = el)}
                                name='password'
                                type='password'
                                value={details.password}
                                onChange={handleChange}
                                onKeyPress={(e) => handleKeyPress(e, 3)}
                                className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                                placeholder='Password'
                            />
                            {errors.password && <span className='text-red-500 text-[12px]'>{errors.password}</span>}
                        </div>
                        <div>
                            <input
                                ref={(el) => (inputRefs.current[4] = el)}
                                name='confirmpassword'
                                type='password'
                                value={details.confirmpassword}
                                onChange={handleChange}
                                onKeyPress={(e) => handleKeyPress(e, 4)}
                                className='w-full h-[37px] placeholder:text-[18px] pl-[10px] border-2 border-[#E3E3E3] outline-none'
                                placeholder='Confirm Password'
                            />
                            {errors.confirmpassword && <span className='text-red-500 text-[12px]'>{errors.confirmpassword}</span>}
                        </div>
                        {/* </form> */}
                        <button
                            onClick={handleSubmit}
                            className='w-full h-[40px] bg-blue-600 text-white font-[400]'>
                            SignUp
                        </button>
                        <div className='text-center'>
                            <h1>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/login')}>Login</span></h1>
                        </div>
                        <div className='flex justify-center'>
                            <button className='text-white bg-blue-600 w-[180px] h-[40px] rounded-md' onClick={() => {
                                login()
                            }}>
                                SignUp with <span className='font-bold'>Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

