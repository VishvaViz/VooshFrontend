import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import PrivateRoute from "./PrivateRoute";

const Signup = lazy(() => import('../components/login/Signup'))
const Login = lazy(() => import('../components/login/Login'))
const Home = lazy(() => import('../components/page/Home'))



function Routecomp() {
    return (
        <div>
            <BrowserRouter>
                <Suspense
                    fallback={<div>Loading...</div>}
                >

                    <Routes>
                        <Route element={<PrivateRoute/>} >
                            <Route path="/home" element={<Home />} />
                        </Route>
                        <Route path="/" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}

export default Routecomp