import React from "react";
import {DevicesProps} from './react-app-env'

const Devices: React.FC<DevicesProps> = ({devices}) => {
    return (<ul>
        {devices.map(device => (
            <li key={device.ID}>{device.Name}</li>
        ))
        }
    </ul>)
};

// Devices.propTypes = {
//     devices: PropTypes.array
// };

export default Devices;
