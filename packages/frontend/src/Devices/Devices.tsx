import React from "react";
import {DevicesProps} from '../react-app-env'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnDefs = [
    {headerName: "Id", field: "ID"},
    {headerName: "Name", field: "Name"},
    {headerName: "Active", field: "Active", width: 80},
    // { headerName: "Price", field: "Active" },
    {headerName: "Share", field: "Share"},
    {headerName: "Date", field: "Date", minWidth: 180},
    {headerName: "Temperature", field: "Temperature", width: 110},
    {headerName: "Battery", field: "Battery", width: 100},
];

// function adjustColumnWidth(params: any) {
//     params.api.sizeColumnsToFit();
//
// // If you want to resize all columns
//     params.columnApi.autoSizeColumns();
// }

const Devices: React.FC<DevicesProps> = ({devices}) => {

    return <div id="myGrid"
                className="ag-theme-balham"
                style={{
                    height: '100%',
                    width: '100%',
                    // margin: '1rem 2rem'
                }}
    >
        <AgGridReact
            columnDefs={columnDefs}
            rowData={devices}
            // onFirstDataRendered={adjustColumnWidth}
            // onGridSizeChanged={adjustColumnWidth}
        >
        </AgGridReact>
    </div>
};


export default Devices;
