import PropTypes from "prop-types";
import { React, useMemo } from "react";

function DataTable(props) {
    const dataKeys = props.children.props.children.map((x) => x.key);
    const actionsCell = props.actionsCell;

    const generateTableRow = (_data, _ri) => {
        if (actionsCell) _data = { ..._data, actions: actionsCell(_data) };
        return (
            <tr className="hover" key={_ri}>{
                dataKeys.map((key, di) =>
                    <td key={di}>{
                        _data[key]
                    }</td>)
            }</tr>
        );
    };

    const generateRows = useMemo(() => props.data.map((data, ri) => generateTableRow(data, ri)));
    // const generateRows = () => props.data.map((data, ri) => generateTableRow(data, ri));

    return (
        <table className={props.className}>
            <thead>
                {props.children}
            </thead>
            <tbody>
                {generateRows}
            </tbody>
        </table>
    );
}

DataTable.propTypes = {
    children: PropTypes.any,
    className: PropTypes.any,
    data: PropTypes.array,
    actionsCell: PropTypes.any,
};

export default DataTable;