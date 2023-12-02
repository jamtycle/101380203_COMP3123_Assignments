import { React } from "react";
import MainBase from "./components/MainBase";
import { EmployeePage, HomePage, LoginPage, MissingPage, RegisterPage } from "./components/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="auth">
                    <Route index element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="/" element={<MainBase />}>
                    <Route index element={<HomePage />} />
                    <Route path="employees" element={<EmployeePage />} />
                    <Route path="*" element={<MissingPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
