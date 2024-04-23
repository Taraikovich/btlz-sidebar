// src/App.jsx
import React, { useState } from 'react';
import GetData from './components/getData.jsx';
import RefreshSidebar from './components/refreshSidebar.jsx';
import LoginForm from './components/LoginForm.jsx';
import UserCard from './components/UserCard.jsx';
import Logout from './components/logout.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin() {
        setIsLoggedIn(true);
    }

    function handleLogout() {
        setIsLoggedIn(false);
    }

    return (
        <div className='hello'>
            <RefreshSidebar />
            {isLoggedIn && <Logout onLogout={handleLogout} />}
            {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
            {isLoggedIn && <UserCard />}
            {isLoggedIn && <GetData />}
        </div>
    );
}

export default App;
