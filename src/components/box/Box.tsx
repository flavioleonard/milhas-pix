import styles from './Box.module.css'

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export const Box = ({ children, className = '' }: BoxProps) => {
    return (
        <div className={`${styles.box} ${className}`}>
            {children}
        </div>
    );
};