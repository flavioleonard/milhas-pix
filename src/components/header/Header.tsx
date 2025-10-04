import React from "react";
import Image from "next/image";
import MilhaLogo from "../../assets/MilhaLogo.png"
import styles from "./Header.module.css";

export const Header: React.FC = () => {
    return (
        <header className={styles['header-container']}>
            <div className={styles['header-content']}>
                <div className={styles['logo-container']}>
                    <Image
                        src={MilhaLogo}
                        alt="MilhasPix Logo"
                        width={120}
                        height={40}
                    />
                </div>
                <div className={styles['balance-section']}>
                    <span>R$ 283,12</span>
                </div>
            </div>
        </header>
    );
};