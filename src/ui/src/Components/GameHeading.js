import React from "react";

const GameHeading = () => {
    const handleGitHubClick = () => {
        window.location.href = "https://github.com/balakumaran247/ManusMapGame";
    };
    return (
        <div>
            <h1 className="text-center strong-yellow">Manu's Map Game</h1>
            <div className="github-icon" onClick={handleGitHubClick}>
                <i className="bi bi-github"></i>
            </div>
        </div>
    );
};

export default GameHeading;
