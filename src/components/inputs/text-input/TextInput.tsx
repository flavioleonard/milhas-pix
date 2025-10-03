import React from 'react';
import './TextInput.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder?: string;
    icon?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    className = '',
    placeholder,
    icon,
    ...props
}) => {
    return (
        <div className={`input-container ${className}`}>
            <input
                className="text-input"
                placeholder={placeholder}
                {...props}
            />
            {icon && <img src={icon} alt="" className="input-icon" />}
        </div>
    );
};

export default TextInput;