import { useState } from "react";
import "../App.css";
import hexagon from "../assets/hexagon.svg";
import OrderDisplay from "../components/orderDisplay.tsx";

function Admin() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function logIn() {
        const password = document.getElementById("password").value;
        if (password === process.env.REACT_APP_ADMIN_CONSOLE_PASSWORD) {
            setIsAuthenticated(true);
        }
    }

    return (
        <div className="Admin">
        {!isAuthenticated && 
            <>
                <div className="admin-onload-container">
                    <img src={hexagon} className="admin-header-hexagon" style={{ margin: 0, width: 50, marginBottom: "1em" }} alt="logo"></img>
                    <input type="password" id="password" placeholder="PASSWORD" className="admin-onload-input"></input>
                    <button type="button" className="order-button" style={{ width: 200, marginTop: 0 }} onClick={logIn}>LOG IN</button>
                </div>
            </>
        }
        {isAuthenticated && 
            <>
                <div className="header">
                    <span className="title">ADMIN</span>
                </div>
                <div className="content-container">
                    <span className="product-header">ORDERS</span>
                    <OrderDisplay></OrderDisplay>
                </div>
            </>
        }
        <div className="admin-footer">
            <span className="admin-footer-text">Honeycomb Studios Admin Page | <img src={hexagon} className="admin-footer-hexagon" alt="logo"></img></span>
        </div>
        </div>
    );
}

export default Admin;
