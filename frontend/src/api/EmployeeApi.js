import { apiDelete, apiGet, apiPost, apiPut } from "./ApiBase";

const employeePath = `${process.env.REACT_APP_BACKEND_URL}/employee`;

export const getEmployees = async () => await apiGet(`${employeePath}/`, []);
export const getOneEmployee = async (_eid) => await apiGet(`${employeePath}/${_eid}`, {});

export const createNewEmployee = async (_employee) => await apiPost(`${employeePath}/`, _employee, false);
export const updateEmployee = async (_eid, _employee) => await apiPut(`${employeePath}/${_eid}`, _employee, false);
export const deleteEmployee = async (_eid) => await apiDelete(`${employeePath}?eid=${_eid}`, false);