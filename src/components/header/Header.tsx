import React from "react";
import "./Header.css";

export const Header: React.FC = () => {
    return (
        <header className="header-container">
            <div className="header-content">
                <div className="logo-container">
                    <img src="../src/assets/MilhaLogo.png" alt="MilhasPix Logo" />
                </div>
                <div className="balance-section">
                    <span>R$ 283,12</span>
                </div>
            </div>
        </header>
    );
};