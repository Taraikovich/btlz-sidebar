import React from "react";

function RefreshSidebar() {
    async function refreshSigebar() {
        return new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler((res) => {
                    resolve(res);
                })
                .withFailureHandler((err) => {
                    reject(err);
                })
                .openSidebar();
        });
    }

    async function handleClick() {
        await refreshSigebar()
    }

    return (
        <button className="reload-button" onClick={handleClick}>Перезагрузить сайдбар</button>
    )
}

export default RefreshSidebar;