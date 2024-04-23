import React from "react";

function UserCard() {
    const userName = localStorage.getItem('user_name');
    return (
        <p className="user-name">{userName}</p>
    )
}

export default UserCard;