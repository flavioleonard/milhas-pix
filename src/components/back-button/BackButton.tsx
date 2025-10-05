import { Button } from "../button/Button";
import BackIcon from "../../assets/Back.png";
import styles from "./BackButton.module.css";

interface BackButtonProps {
    onClick: () => void;
    className?: string;
}

export const BackButton = ({ onClick, className }: BackButtonProps) => {
    return (
        <Button
            name="Voltar"
            className={`${styles['back-button']} ${className || ''}`}
            icon={BackIcon}
            iconPosition="left"
            onClick={onClick}
        />
    );
};