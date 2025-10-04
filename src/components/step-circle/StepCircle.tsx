import styles from "./StepCircle.module.css"

interface StepCircleProps {
    isCurrent: boolean;
    isDone: boolean;
}

export const StepCircle = ({ isCurrent, isDone }: StepCircleProps) => {
    const getCircleClass = () => {
        if (isCurrent) return `${styles.circle} ${styles.current}`;
        if (isDone) return `${styles.circle} ${styles.done}`;
        return `${styles.circle} ${styles.pending}`;
    };

    const getCenterCircleClass = () => {
        if (isCurrent) return `${styles['center-circle']} ${styles.current}`;
        if (isDone) return `${styles['center-circle']} ${styles.done}`;
        return `${styles['center-circle']} ${styles.pending}`;
    };

    return (
        <div className={styles.container}>
            <div className={getCircleClass()}>
                <div className={getCenterCircleClass()}>
                </div>
            </div>
        </div>
    )
}