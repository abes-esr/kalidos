import React from "react";
import { Link } from "react-router-dom";
import KALIDOS from '../../../static/kalidos_blanc.png';

const Router_App = () => (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
        style={{
            zIndex: 1
        }}>


        <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon">
                <img
                    height={57}
                    width={200}
                    src={KALIDOS}
                    alt="KALIDOS"
                />
            </div>
        </Link>


        <hr className="sidebar-divider my-0"></hr>

        <li className="nav-item">
            <Link to="/" className="nav-link">
                <i className="fas fa-pencil-alt" style={{ marginRight: "3px" }}></i>
                <span>Saisie des identifiants</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/interfaceVerif" className="nav-link">
                <i className="far fa-list-alt" style={{ marginRight: "3px" }}></i>
                <span>Interface de vérification</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/interfaceRegles" className="nav-link">
                <i className="fas fa-fw fa-wrench" style={{ marginRight: "3px" }}></i>
                <span>Interface des règles</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/noticesErreurs" className="nav-link">
                <i className="fas fa-history" style={{ marginRight: "3px" }}></i>
                <span>Historique</span>
            </Link>
        </li>
    </ul>

);



export default Router_App;