import React from "react";
import {withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux'; 
import "./nav.css";
import { logoutUser } from '../../redux/actions/authActions';

const mapActionsToProps = dispatch => ({
    commenceLogout() {
      dispatch(logoutUser())
    }
  })

const Nav = (props) => {
    const logout = () => {
        props.commenceLogout();
        props.history.push('/');
    }
    return (
        <div className="nav-strip">
            <Link to={"/order"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Order Form</label>
                </div>
            </Link>
            <Link to={"/view-orders"} className="nav-link" id="middle-link">
                <div className="nav-link-style">
                    <label className="nav-label">View Orders</label>
                </div>
            </Link>
            <div onClick={logout} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Log Out</label>
                </div>
            </div>
        </div>
    );
}

export default withRouter(connect(null, mapActionsToProps)(Nav));