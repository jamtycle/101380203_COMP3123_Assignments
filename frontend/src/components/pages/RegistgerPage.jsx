import React, { createRef, useState } from "react";
import * as api from "../../api/UserApi";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const userForm = {
        username: { ref: createRef(), validator: (x) => x, valid: useState(true) },
        email: { ref: createRef(), validator: (x) => x, valid: useState(true) },
        password: { ref: createRef(), validator: (x) => x, valid: useState(true) },
        confirmPassword: { ref: createRef(), validator: (x) => x, valid: useState(true) },
    };

    const validateForm = (_user) => {
        const validate_map = Object.keys(_user).map((k) => {
            let valid = true;
            if (!userForm[k].validator(_user[k])) valid = false;
            userForm[k].valid[1](valid);
            return valid;
        });

        if (_user.password !== _user.confirmPassword) {
            userForm.password.valid[1](false);
            userForm.confirmPassword.valid[1](false);
            return false;
        }

        return validate_map.every((x) => x);
    };

    const registerUser = () => {
        const user_info = {
            username: userForm.username.ref.current.value,
            email: userForm.email.ref.current.value,
            password: userForm.password.ref.current.value,
            confirmPassword: userForm.confirmPassword.ref.current.value,
        };

        if (!validateForm(user_info)) return;

        delete user_info.confirmPassword;
        console.log(user_info);
        api.registerUser(user_info).then((x) => {
            console.log(x);
            if (x) navigate("..");
            else console.log("Error while creating the User.");
        });
    };

    return (
        <main className="w-screen h-screen flex items-center justify-center align-middle">
            <div className="w-1/4 h-fit shadow-xl border-2 border-slate-700 p-10">
                <div className="flex items-center justify-center align-middle pb-9">
                    <Link to=".." className="stroke-white btn btn-circle btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </Link>
                    <div className="w-full flex justify-center items-center align-middle">
                        <h1 className="text-4xl font-bold text-center h-fit">Register</h1>
                    </div>
                </div>
                <div className="divider py-0 my-0 px-2 pb-10" />
                <div className="w-full flex flex-col gap-7">
                    <label className="flex justify-center items-center align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mx-3">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                        <input className={`input w-full ${userForm.username.valid[0] ? "input-primary": "input-error"}`} placeholder="Username" type="text" ref={userForm.username.ref} />
                    </label>

                    <label className="flex justify-center items-center align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-3">
                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>
                        <input className={`input w-full ${userForm.email.valid[0] ? "input-primary": "input-error"}`} placeholder="Email" type="text" ref={userForm.email.ref} />
                    </label>

                    <label className="flex justify-center items-center align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 mx-3">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        <input className={`input w-full ${userForm.password.valid[0] ? "input-primary": "input-error"}`} placeholder="Password" type="password" ref={userForm.password.ref} />
                    </label>

                    <label className="flex justify-center items-center align-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 mx-3">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                        <input className={`input w-full ${userForm.confirmPassword.valid[0] ? "input-primary": "input-error"}`} placeholder="Confirm Password" type="password" ref={userForm.confirmPassword.ref} />
                    </label>

                    <button className="btn btn-primary uppercase" onClick={() => registerUser()}>Register</button>
                </div>
            </div>
        </main>
    );
}