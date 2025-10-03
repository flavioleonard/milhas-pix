import { StepCircle } from "../step-circle/StepCircle";
import "./StepBox.css";


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
            ? "step-connector active"
            : "step-connector";
    };

    return (
        <div className="step-box">
            {steps.map((step, index) => (
                <div key={step.number} className="step-container">
                    <div className="step-info">
                        <div className="step-circle">
                            <StepCircle
                                isCurrent={currentStep === step.number}
                                isDone={completedSteps.includes(step.number)}
                            />
                        </div>
                        <div className="step-content">
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
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