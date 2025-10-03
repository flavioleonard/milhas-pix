import React from "react";
import Image from "next/image";
import MilhaLogo from "../../assets/MilhaLogo.png"
import "./Header.css";

export const Header: React.FC = () => {
    return (
        <header className="header-container">
            <div className="header-content">
                <div className="logo-container">
                    <Image
                        src={MilhaLogo}
                        alt="MilhasPix Logo"
                        width={120}
                        height={40}
                    />
                </div>
                <div className="balance-section">
                    <span>R$ 283,12</span>
                </div>
            </div>
        </header>
    );
};