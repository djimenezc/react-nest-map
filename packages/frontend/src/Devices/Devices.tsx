import React from "react";
import {DevicesProps} from '../react-app-env'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnDefs = [
    {headerName: "Id", field: "ID"},
    {headerName: "Name", field: "Name"},
    {headerName: "Active", field: "Active"},
    // { headerName: "Price", field: "Active" },
    {headerName: "Share", field: "Share"},
    {headerName: "Date", field: "Date"},
    {headerName: "Temperature", field: "Temperature"},
    {headerName: "Battery", field: "Battery"},
];

const Devices: React.FC<DevicesProps> = ({devices}) => {
    // return (<ul>
    //     {devices.map(device => (
    //         <li key={device.ID}>{device.Name}</li>
    //     ))
    //     }
    // </ul>)

    return <div className="ag-theme-balham"
                style={{height: '200px', width: '600px'}}>
        <AgGridReact
            columnDefs={columnDefs}
            rowData={devices}>
        </AgGridReact>
    </div>
};

export default Devices;
