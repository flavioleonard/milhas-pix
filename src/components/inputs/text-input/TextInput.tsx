import React from 'react';
import styles from './TextInput.module.css';

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
        <div className={`${styles['input-container']} ${className}`}>
            <input
                className={styles['text-input']}
                placeholder={placeholder}
                {...props}
            />
            {icon && <img src={icon} alt="" className={styles['input-icon']} />}
        </div>
    );
};

export default TextInput;