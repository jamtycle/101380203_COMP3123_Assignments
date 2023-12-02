import React, { createRef, useEffect, useState } from "react";
import * as api from "../../api/UserApi";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../api/cookies";

export default function LoginPage() {
    const navigator = useNavigate(); 
    const loginForm = {
        username: { ref: createRef(), valid: useState(true) },
        password: { ref: createRef(), valid: useState(true) },
    };
    const [loginError, setLoginError] = useState(null);

    useEffect(() => {
        const token = getToken();
        if (token) navigator("/");
    });

    const loginUser = () => {
        loginForm.username.valid[1](true);
        loginForm.password.valid[1](true);

        const login_info = {
            username: loginForm.username.ref.current.value,
            password: loginForm.password.ref.current.value,
        };

        if (!login_info.username) {
            loginForm.username.valid[1](false);
            return;
        }
        if (!login_info.password) {
            loginForm.password.valid[1](false);
            return;
        }

        api.loginUser(login_info).then((x) => {
            setLoginError(null);
            if (!x) {
                setLoginError("Auth internal error. Try again later.");
                return;
            }
            if (!x.status) {
                setLoginError("Incorrect user or password.");
                return;
            }

            const token = x.jwt_token;
            console.log(token);
            setToken(token);
            navigator("/");
        });
    };

    const generateErrorElement = () => {
        if (!loginError) return;

        return (
            <div>
                <span className="flex gap-3 justify-center items-center align-middle rounded-lg bg-red-600 text-white py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    {loginError}
                </span>
            </div>
        );
    };

    return (
        <main className="w-screen h-screen flex items-center justify-center align-middle">
            <div className="w-1/4 h-fit shadow-xl border-2 border-slate-700 p-10">
                <h1 className="text-4xl font-bold w-full text-center pb-9">Login</h1>
                <div className="divider py-0 my-0 px-2 pb-10" />
                <div className="w-full flex flex-col gap-7">
                    <label className="flex justify-center items-center align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <input className={`input w-full ${loginForm.username.valid[0] ? "input-primary" : "input-error"}`} placeholder="Username" type="text" ref={loginForm.username.ref} />
                    </label>

                    <label className="flex justify-center items-center align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 mx-3">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        <input className={`input w-full ${loginForm.password.valid[0] ? "input-primary" : "input-error"}`} placeholder="Password" type="password" ref={loginForm.password.ref} />
                    </label>

                    <button className="btn btn-primary uppercase" onClick={() => loginUser()}>Login</button>
                    {generateErrorElement()}
                    <p className="text-lg">
                        Don&apos;t have an account? Create one <Link className="link" to="register">here!</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}