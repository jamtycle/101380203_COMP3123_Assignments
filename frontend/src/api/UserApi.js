import { apiPost } from "./ApiBase";

const userPath = `${process.env.REACT_APP_BACKEND_URL}/user`;

export const loginUser = async (_login_info) => await apiPost(`${userPath}/login`, _login_info, false);
export const registerUser = async (_user_info) => await apiPost(`${userPath}/signup`, _user_info, false);