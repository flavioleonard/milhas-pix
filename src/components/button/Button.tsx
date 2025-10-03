import './Button.css';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ButtonProps {
    name: string;
    icon?: string | StaticImageData;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    iconPosition?: 'left' | 'right';
}

export const Button = ({
    name,
    icon,
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    iconPosition = 'left'
}: ButtonProps) => {
    const iconElement = icon ? (
        <Image
            src={icon}
            alt=""
            width={16}
            height={16}
            style={{
                marginRight: iconPosition === 'left' ? '8px' : '0',
                marginLeft: iconPosition === 'right' ? '8px' : '0'
            }}
        />
    ) : null;

    return (
        <button
            className={`button ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {iconPosition === 'left' && iconElement}
            {name}
            {iconPosition === 'right' && iconElement}
        </button>
    );
};