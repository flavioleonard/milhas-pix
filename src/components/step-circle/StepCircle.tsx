import styles from "./StepCircle.module.css"

interface StepCircleProps {
    isCurrent: boolean;
    isDone: boolean;
}

export const StepCircle = ({ isCurrent, isDone }: StepCircleProps) => {
    const isPending = !isCurrent && !isDone;

    return (
        <div className={styles.container}>
            <div
                className={styles.circle}
                data-is-current={isCurrent}
                data-is-done={isDone}
                data-is-pending={isPending}
            >
                <div
                    className={styles['center-circle']}
                    data-is-current={isCurrent}
                    data-is-done={isDone}
                    data-is-pending={isPending}
                >
                </div>
            </div>
        </div>
    )
}