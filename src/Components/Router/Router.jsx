import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Router_App = () => (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


                <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </Link>


                <hr className="sidebar-divider my-0"></hr>

                <li className="nav-item active">
                    <Link to="/" className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Home</span>
                    </Link>
                </li>

                <hr className="sidebar-divider"></hr>

                <div className="sidebar-heading">Interface</div>
                <li className="nav-item">
                    <Link to="/" className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/examplePage2" className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>ExamplePage2</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/examplePage3" className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-wrench"></i>
                        <span>ExamplePage3</span>
                    </Link>
                </li>
            </ul>

            <hr />
        </div>
);



export default Router_App;