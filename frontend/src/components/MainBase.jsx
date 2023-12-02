import { React, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuBar from "./layout/MenuBar";
import Footerbar from "./layout/FooterBar";
import { getToken } from "../api/cookies";

export default function MainBase() {
    const navigator = useNavigate(); 

    useEffect(() => {
        const token = getToken();
        console.log(token);
        if (!getToken()) navigator("/auth/");
    });

    return (
        <div className="flex flex-col gap-10 h-screen">
            <MenuBar />
            <main className="grow flex-auto shrink-0 basis-0 w-full max-h-[77%]">
                <Outlet />
            </main>
            <Footerbar />
        </div>
    );
}