import axios from "axios";
import { getToken } from "./cookies";

// const token = getToken();
//"eyJhbGciOiJIUzI1NiJ9.eyJnYmM6YnJ1bm9yYW1pcmV6OmNsYWltIjp0cnVlLCIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiX2lkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsInBhc3N3b3JkIjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7ImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiZW1haWwiOnRydWUsInBhc3N3b3JkIjp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjUyODY1NGE2YjRlOGUyZTg4ZDUyNmU3IiwidXNlcm5hbWUiOiJicmFtaXJleiIsImVtYWlsIjoiYnJhbWlyZXoyMDZAaG90bWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsIl9fdiI6MH0sImlhdCI6MTY5NzE2ODk3OSwiaXNzIjoiZ2JjOmJydW5vcmFtaXJlejoxMDEzODAyMDMiLCJhdWQiOiJnYmM6cGVvcGxlIiwiZXhwIjoxNzAyMzUyOTc5fQ.X60YJRVr_NKqlk5xnkDwTbYzOCemcXR0l9wniyaluLI";
const getConfig = () => {
    const token = getToken();

    if (!token) return undefined;
    else return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

/**
 * 
 * @param {string} _url The URL of the API.
 * @param {any} _default_val A value to return in case of a api call fail.
 * @returns {any}
 */
export const apiGet = async (_url, _default_val) => {
    return await axios.get(_url, getConfig())
        .then((x) => x.data ?? _default_val)
        .catch((ex) => {
            console.error(ex);
            return _default_val;
        });
};

/**
 * 
 * @param {string} _url The URL of the the API.
 * @param {any} _data Payload to be sended to the API.
 * @param {any} _default_val A value to return in case of api call fail.
 * @returns {any}
 */
export const apiPost = async (_url, _data, _default_val) => {
    return await axios.post(_url, _data, getConfig())
        .then((x) => x.data ?? _default_val)
        .catch((ex) => {
            console.error(ex);
            return _default_val;
        });
};

/**
 * 
 * @param {string} _url The URL of the the API.
 * @param {any} _data Payload to be sended to the API.
 * @param {any} _default_val A value to return in case of api call fail.
 * @returns {any}
 */
export const apiPut = async (_url, _data, _default_val) => {
    return await axios.put(_url, _data, getConfig())
        .then((x) => x.data ?? _default_val)
        .catch((ex) => {
            console.error(ex);
            return _default_val;
        });
};

/**
 * 
 * @param {string} _url The URL of the the API.
 * @param {any} _default_val A value to return in case of api call fail.
 * @returns {any}
 */
export const apiDelete = async (_url, _default_val) => {
    return await axios.delete(_url, getConfig())
        .then((x) => x.data ?? _default_val)
        .catch((ex) => {
            console.error(ex);
            return _default_val;
        });
};