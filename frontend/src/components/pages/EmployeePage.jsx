import { React, useEffect, useState } from "react";
import DataTable from "../layout/DataTable";
import EmployeeModal from "../modals/EmployeeModal";
import { deleteEmployee, getEmployees } from "../../api/EmployeeApi";

export default function EmployeePage() {
    const [employeeModal, setEmployeeModal] = useState(null);
    const [employeeData, setEmployeeData] = useState([]);

    const [employeeInfo, setEmployeeInfo] = useState(null);

    const [deleteActions, setDeleteActions] = useState({});

    const loadTable = () => { getEmployees().then((x) => setEmployeeData(x)); };

    useEffect(loadTable);

    useEffect(() => {
        if (!employeeModal) return;
        if (employeeModal.open) return;
        if (!employeeModal.returnValue) return;

        const state = employeeModal.returnValue;
        if (state === "accept") loadTable();
    }, [employeeModal?.open]);

    const employeeActions = (_row_data) => {
        // const [deleteAction, setDeleteAction] = useState(false);
        let deleteTimeout;
        // setDeleteActions({ [_row_data._id]: false });
        const id = _row_data._id;

        return (
            <div className="flex gap-3">
                <a className="btn btn-primary btn-sm px-1" onClick={() => {
                    setEmployeeInfo(_row_data);
                    employeeModal.showModal();
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </a>
                <a className={`btn btn-sm px-1 ${deleteActions[_row_data._id] ? "btn-error stroke-white" : "btn-primary stroke-black"}`} onClick={() => {
                    if (!deleteActions[id]) {
                        setDeleteActions((prev) => ({ ...prev, [id]: true }));
                        deleteTimeout = setTimeout(() => {
                            setDeleteActions((prev) => ({ ...prev, [id]: false }));
                            clearTimeout(deleteTimeout);
                        }, 3000);
                        return;
                    }

                    clearTimeout(deleteTimeout);
                    setDeleteActions((prev) => ({ ...prev, [id]: false }));
                    deleteEmployee(id).then((x) => {
                        if (x.deletedCount === 1) loadTable();
                        else console.log("There was an error while deleting.");
                    });
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </a>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-5 w-full justify-center items-center align-middle">

            <EmployeeModal dialogRef={setEmployeeModal} employeeInfo={employeeInfo} />

            <div className="w-3/4 flex flex-col-reverse">
                <h2 className="text-5xl font-semibold text-center w-full">Employee Page</h2>
                <button className="btn btn-primary w-fit self-end absolute" onClick={() => employeeModal.showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <div className="border-l-2 border-black w-1 h-2/3" />
                    <p className="text-base">Add Employee</p>
                </button>
            </div>

            <div className="w-3/6 m-auto flex items-center justify-center align-middle overflow-y-auto">
                <DataTable className="table" data={employeeData} actionsCell={employeeActions}>
                    <tr className="text-lg">
                        <th key={"first_name"}>First Name</th>
                        <th key={"last_name"}>Last Name</th>
                        <th key={"email"}>Email</th>
                        <th key={"gender"}>Gender</th>
                        <th key={"salary"}>Salary</th>
                        <th key={"actions"}>Actions</th>
                    </tr>
                </DataTable>
            </div>

        </div>
    );
}