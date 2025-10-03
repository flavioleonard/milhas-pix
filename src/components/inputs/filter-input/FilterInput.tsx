import React, { useState, useRef, useEffect } from 'react';
import './FilterInput.css';

interface FilterInputProps extends React.HTMLAttributes<HTMLDivElement> {
    placeholder?: string;
    icon?: React.ReactNode | string;
    onIconClick?: () => void;
    className?: string;
    filters?: string[];
    onFilterSelect?: (filter: string) => void;
    selectedFilter?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
    placeholder = "Filtros",
    icon,
    onIconClick,
    className = '',
    filters = [],
    onFilterSelect,
    selectedFilter,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (filters.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    const handleFilterSelect = (filter: string) => {
        if (onFilterSelect) {
            onFilterSelect(filter);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const displayText = selectedFilter || placeholder;

    const renderIcon = () => {
        if (typeof icon === 'string') {
            return <img src={icon} alt="" className="filter-icon-img" />;
        }
        return icon;
    };


    return (
        <div className="filter-input-wrapper" ref={dropdownRef}>
            <div
                className={`filter-input ${className} ${isOpen ? 'filter-input-open' : ''}`}
                onClick={handleClick}
                {...props}
            >
                <span className="filter-placeholder">{displayText}</span>
                {icon && (
                    <div className="filter-icon" onClick={(e) => {
                        e.stopPropagation();
                        onIconClick?.();
                    }}>
                        {renderIcon()}
                    </div>
                )}
            </div>
            {isOpen && filters.length > 0 && (
                <div className="filter-dropdown">
                    {filters.map((filter, index) => (
                        <div
                            key={index}
                            className={`filter-option ${selectedFilter === filter ? 'filter-option-selected' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFilterSelect(filter);
                            }}
                        >
                            {filter}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterInput;