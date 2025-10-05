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

    const isConnectorActive = (stepNumber: number) => {
        const nextStepNumber = stepNumber;
        return currentStep > nextStepNumber || completedSteps.includes(nextStepNumber);
    };

    const getConnectorClass = (stepNumber: number) => {
        return isConnectorActive(stepNumber)
            ? `${styles['step-connector']} ${styles.active}`
            : styles['step-connector'];
    };

    const handleStepClick = (stepNumber: number) => {
        onStepClick(stepNumber);
    };

    const getStepTitleClass = (stepNumber: number) => {
        const isPending = currentStep !== stepNumber && !completedSteps.includes(stepNumber);
        return isPending
            ? `${styles['step-title']} ${styles.pending}`
            : styles['step-title'];
    };

    const getStepDescriptionClass = (stepNumber: number) => {
        const isPending = currentStep !== stepNumber && !completedSteps.includes(stepNumber);
        return isPending
            ? `${styles['step-description']} ${styles.pending}`
            : styles['step-description'];
    };

    const getStepContainerClass = (stepNumber: number) => {
        return currentStep === stepNumber
            ? `${styles['step-container']} ${styles.current}`
            : styles['step-container'];
    };

    return (
        <div className={styles['step-box']}>
            {steps.map((step, index) => (
                <div
                    key={step.number}
                    className={getStepContainerClass(step.number)}
                    onClick={() => handleStepClick(step.number)}
                >
                    <div className={styles['step-info']}>
                        <div className={styles['step-circle']}>
                            <StepCircle
                                isCurrent={currentStep === step.number}
                                isDone={completedSteps.includes(step.number)}
                            />
                        </div>
                        <div className={styles['step-content']}>
                            <h3 className={getStepTitleClass(step.number)}>{step.title}</h3>
                            <p className={getStepDescriptionClass(step.number)}>{step.description}</p>
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={getConnectorClass(step.number)}></div>
                    )}
                </div>
            ))}
        </div>
    );
};