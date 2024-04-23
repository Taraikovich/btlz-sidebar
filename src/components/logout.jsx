import React from "react";

function Logout({ onLogout }) {

    function logoutUser() {
        localStorage.clear();
        onLogout();
    }

    return (
        <button className="logout-button" onClick={logoutUser}>Выход из системы...</button>
    );
}

export default Logout;