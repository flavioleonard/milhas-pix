import { Button } from "../button/Button";
import NextIcon from "../../assets/Next.png";
import styles from "./NextButton.module.css";

interface NextButtonProps {
    onClick: () => void;
    className?: string;
}

export const NextButton = ({ onClick, className }: NextButtonProps) => {
    return (
        <Button
            name="Prosseguir"
            className={`${styles['next-button']} ${className || ''}`}
            icon={NextIcon}
            iconPosition="right"
            onClick={onClick}
        />
    );
};