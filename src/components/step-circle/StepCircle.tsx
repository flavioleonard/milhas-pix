import "./StepCircle.css"

interface StepCircleProps {
    isCurrent: boolean;
    isDone: boolean;
}

export const StepCircle = ({ isCurrent, isDone }: StepCircleProps) => {
    const getCircleClass = () => {
        if (isCurrent) return "circle current";
        if (isDone) return "circle done";
        return "circle pending";
    };

    const getCenterCircleClass = () => {
        if (isCurrent) return "center-circle current";
        if (isDone) return "center-circle done";
        return "center-circle pending";
    };

    return (
        <div className="container">
            <div className={getCircleClass()}>
                <div className={getCenterCircleClass()}>
                </div>
            </div>
        </div>
    )
}