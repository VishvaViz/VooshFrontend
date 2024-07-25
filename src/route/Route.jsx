import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Signup=lazy(()=>import('../components/login/Signup'))
const Login=lazy(()=>import('../components/login/Login'))
const Home=lazy(()=>import('../components/page/Home'))



function Routecomp() {
    return (
        <div>
            <BrowserRouter>
                <Suspense
                    fallback={<div>Loading...</div>}
                >
                    <Routes>
                        <Route path="/" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}

export default Routecomp