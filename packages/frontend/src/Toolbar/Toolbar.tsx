import React from "react";
import './Toolbar.css';

const PropTypes = require('prop-types');
interface Props {
    onClickHome(): void
}

const Toolbar: React.FC<Props> = ({onClickHome} : Props) => {

    return (<div className="icon-bar">
        <a className="active" href="#"><i className="fa fa-home"/></a>
        <a onClick={onClickHome}><i className="fa fa-search"/></a>
        <a href="#"><i className="fa fa-envelope"/></a>
        <a href="#"><i className="fa fa-globe"/></a>
        <a href="#"><i className="fa fa-trash"/></a>
    </div>)
};

Toolbar.propTypes = {
    onClickHome: PropTypes.func
};

export default Toolbar;
