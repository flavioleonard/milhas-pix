import { StepCircle } from "../step-circle/StepCircle";
import styles from "./StepBox.module.css";


interface StepBoxProps {
    currentStep: number;
    completedSteps: number[];
    onStepClick: (stepNumber: number) => void;
}

export const StepBox = ({ currentStep, completedSteps, onStepClick }: StepBoxProps) => {
    const steps = [
        { number: 1, title: "Passo 1", description: "Escolha a companhia aérea" },
        { number: 2, title: "Passo 2", description: "Oferte suas milhas" },
        { number: 3, title: "Passo 3", description: "Insira os dados do programa" },
        { number: 4, title: "Passo 4", description: "Pedido finalizado" }
    ];

    const getStepStatus = (stepNumber: number) => {
        const isCurrent = currentStep === stepNumber;
        const isDone = completedSteps.includes(stepNumber);
        const isPending = !isCurrent && !isDone;

        return { isCurrent, isDone, isPending };
    };

    const isConnectorActive = (stepNumber: number) => {
        return currentStep > stepNumber || completedSteps.includes(stepNumber);
    };

    return (
        <div className={styles['step-box']}>
            {steps.map((step, index) => {
                const { isCurrent, isDone, isPending } = getStepStatus(step.number);

                return (
                    <div
                        key={step.number}
                        className={styles['step-container']}
                        data-is-current={isCurrent}
                        data-is-done={isDone}
                        data-is-pending={isPending}
                        onClick={() => onStepClick(step.number)}
                    >
                        <div className={styles['step-info']}>
                            <div className={styles['step-circle']}>
                                <StepCircle
                                    isCurrent={isCurrent}
                                    isDone={isDone}
                                />
                            </div>
                            <div className={styles['step-content']}>
                                <h3
                                    className={styles['step-title']}
                                    data-is-current={isCurrent}
                                    data-is-done={isDone}
                                    data-is-pending={isPending}
                                >
                                    {step.title}
                                </h3>
                                <p
                                    className={styles['step-description']}
                                    data-is-current={isCurrent}
                                    data-is-done={isDone}
                                    data-is-pending={isPending}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={styles['step-connector']}
                                data-is-active={isConnectorActive(step.number)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};