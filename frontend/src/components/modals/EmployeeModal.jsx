import PropTypes from "prop-types";
import { React, createRef, useEffect, useState } from "react";
import * as api from "../../api/EmployeeApi";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function EmployeeModal(props) {
    const dialog = createRef();
    const formObject = {
        first_name: { ref: createRef(), valid: useState(true), resetControl: (x) => x.value = "", validator: (x) => x },
        last_name: { ref: createRef(), valid: useState(true), resetControl: (x) => x.value = "", validator: (x) => x },
        email: { ref: createRef(), valid: useState(true), resetControl: (x) => x.value = "", validator: (x) => validateEmail(x) },
        gender: { ref: createRef(), valid: useState(true), resetControl: (x) => x.value = "Gender", validator: (x) => ["Male", "Female", "Other"].includes(x) },
        salary: {
            ref: createRef(), valid: useState(true), resetControl: (x) => x.value = 0, validator: (x) => {
                const info = parseFloat(x);
                if (isNaN(info)) return false;
                return info > 0;
            }
        }
    };

    const [modalError, setModalError] = useState(null);
    const [modalAction, setModalAction] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        props.dialogRef(dialog.current);
        dialog.current.addEventListener("cancel", (e) => e.preventDefault());
    }, []);

    useEffect(() => {
        const info = props.employeeInfo;
        if (!info) return;
        setId(info._id);
        Object.keys(formObject).forEach((k) => formObject[k].ref.current.value = info[k]);
    }, [props.employeeInfo]);

    useEffect(() => {
        if (modalAction === null) return;

        if (!modalAction) {
            setModalError(errorElement("There was an error while saving the Employee"));
            return;
        }

        clearModal();
        dialog.current.returnValue = "accept";
        dialog.current.close();
    }, [modalAction]);

    /**
     * @returns {boolean}
     */
    const validateModal = (_obj) => {
        const validMap = Object.keys(_obj).map((k) => {
            let info = true;
            if (!formObject[k].validator(_obj[k])) info = false;
            formObject[k].valid[1](info);
            return info;
        });

        return validMap.every((x) => x);
    };

    const clearModal = () => {
        setId(null);
        Object.values(formObject).forEach((x) => {
            x.valid[1](true);
            if (x.ref.current) x.resetControl(x.ref.current);
        });
        setModalAction(null);
    };

    const acceptOnClick = () => {
        if (id) updateEmployee();
        else newEmployee();
    };

    const newEmployee = () => {

        const new_employee = {
            first_name: formObject.first_name.ref.current.value,
            last_name: formObject.last_name.ref.current.value,
            email: formObject.email.ref.current.value,
            gender: formObject.gender.ref.current.value,
            salary: formObject.salary.ref.current.value,
        };

        if (!validateModal(new_employee)) return;
        api.createNewEmployee(new_employee).then((x) => setModalAction(x._id));
    };

    const updateEmployee = () => {
        const employee_info = {
            first_name: formObject.first_name.ref.current.value,
            last_name: formObject.last_name.ref.current.value,
            email: formObject.email.ref.current.value,
            gender: formObject.gender.ref.current.value,
            salary: formObject.salary.ref.current.value,
        };

        if (!validateModal(employee_info)) return;
        api.updateEmployee(id, employee_info).then((x) => setModalAction(x));
    };

    const errorElement = (_message) => {
        return (
            <div className="w-full text-center flex gap-3 justify-center align-middle items-center bg-red-300 rounded-lg text-black py-2 select-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span className="font-semibold text-lg">{_message}</span>
            </div>
        );
    };

    return (
        <div>
            <dialog className="modal modal-bottom sm:modal-middle" ref={dialog}>
                <div className="modal-box flex flex-col gap-5">
                    <h3 className="font-bold text-3xl select-none">Employee</h3>
                    <div className="divider p-0 m-0" />
                    <div className="modal-action p-0 m-0">
                        <form className="w-full h-full flex flex-col gap-3" method="dialog">
                            <div className="w-full flex gap-5">
                                <input type="text" placeholder="First Name" className={`input w-1/2 max-w-xs ${formObject.first_name.valid[0] ? "input-primary" : "input-error"}`} ref={formObject.first_name.ref} />
                                <input type="text" placeholder="Last Name" className={`input w-1/2 max-w-xs ${formObject.last_name.valid[0] ? "input-primary" : "input-error"}`} ref={formObject.last_name.ref} />
                            </div>

                            <input type="email" placeholder="Email" className={`input w-full ${formObject.email.valid[0] ? "input-primary" : "input-error"}`} ref={formObject.email.ref} />

                            <div className="w-full flex gap-5">
                                <select className={`select w-full max-w-xs ${formObject.gender.valid[0] ? "select-primary" : "select-error"}`} ref={formObject.gender.ref} defaultValue="Gender">
                                    <option disabled>Gender</option>
                                    <option key="Male">Male</option>
                                    <option key="Female">Female</option>
                                    <option key="Other">Other</option>
                                </select>
                                <input type="number" placeholder="Salary" className={`input w-full max-w-xs ${formObject.salary.valid[0] ? "input-primary" : "input-error"}`} ref={formObject.salary.ref} defaultValue={0} />
                            </div>

                            <div className="flex gap-5 flex-row-reverse pt-5">
                                <a className="btn btn-success text-base px-7 uppercase" onClick={() => acceptOnClick()}>Accept</a>
                                <a className="btn btn-error text-base px-7 uppercase" onClick={() => {
                                    clearModal();
                                    dialog.current.returnValue = "cancel";
                                    dialog.current.close();
                                }}>Cancel</a>
                            </div>
                        </form>
                    </div>
                    {modalError}
                </div>
                <div className="bg-black opacity-60 w-full h-full absolute -z-20" />
            </dialog>
        </div>
    );
}

EmployeeModal.propTypes = {
    dialogRef: PropTypes.any,
    employeeInfo: PropTypes.object
};