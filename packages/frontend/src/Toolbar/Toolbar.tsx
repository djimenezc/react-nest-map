import React from "react";
import './Toolbar.css';
import {Link} from "react-router-dom";

const {withRouter} = require('react-router');

const PropTypes = require('prop-types');

interface Props {
    location: Location
}

function linkActive(pathname: string, locationPathname: string) {
    return pathname === locationPathname ? 'active' : '';
}

const Toolbar: React.FC<Props> = (props) => {

    return (<div className="icon-bar">
        <Link className={linkActive('/map', props.location.pathname)}
              to="/map"><i className="fa fa-home"/></Link>
        <Link className={linkActive('/devices', props.location.pathname)}
              to="/devices"><i className="fa fa-search"/></Link>
        <Link className={linkActive('/about', props.location.pathname)}
              to="/about"><i className="fa fa-info-circle"/></Link>
    </div>)
};

// <Link to="/map">Home</Link> * /}
{/*    <Link to="/devices">Devices</Link>*/
}
{/*    <Link to="/about">About</Link>*/
}

Toolbar.propTypes = {
    // onClickHome: PropTypes.func
};

export default withRouter(Toolbar);
