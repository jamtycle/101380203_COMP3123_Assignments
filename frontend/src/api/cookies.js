import Cookies from "universal-cookie";

const cookie_name = "auth_token";
const cookies = new Cookies();
const expTime = 7;

export const setToken = (_token) => {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + expTime);
    cookies.set(cookie_name, _token, { path: "/", expires: expDate });
};

export const invalidateToken = () => {
    cookies.set(cookie_name, "", { path: "/", expires: new Date(Date.now()) });
};

export const getToken = () => cookies.get(cookie_name);