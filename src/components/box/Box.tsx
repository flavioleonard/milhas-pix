import './box.css';

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export const Box = ({ children, className = '' }: BoxProps) => {
    return (
        <div className={`box ${className}`}>
            {children}
        </div>
    );
};