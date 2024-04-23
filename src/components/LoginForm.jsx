import React, { useState } from "react";

function LoginForm({ onLogin }) {
    const [token, setToken] = useState('');
    const [error, setError] = useState(false);

    if (localStorage.getItem('user_name')) onLogin();

    async function handleSubmit(e) {
        e.preventDefault();
        await login(token);
        if (localStorage.getItem('user_name')) {
            setError(false);
            onLogin();
        } else {
            setError(true);
        }
    }

    function handleTokenChange(e) {
        setToken(e.target.value);
    }

    async function getUserData(token) {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler((res) => {
                    resolve(res);
                })
                .withFailureHandler((err) => {
                    reject(err);
                })
                .login(token);
        });
    }

    async function login(token) {
        try {
            const userData = await getUserData(token);
            console.log(userData)
            setToken(true);
            localStorage.setItem('user_name', userData.full_name)
            localStorage.setItem('user_id', userData.id)

        } catch {
            console.error("Ошибка входа: неверный токен");
        }
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                className="form-input"
                type="text"
                placeholder="Введите токен"
                onChange={handleTokenChange}
            />
            <button className="form-button" type="submit">Войти</button>
            {error && <p className="error-message">Ошибка входа: неверный токен</p>}
        </form>
    );
}

export default LoginForm;