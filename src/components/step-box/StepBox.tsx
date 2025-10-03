import { StepCircle } from "../step-circle/StepCircle";
import "./StepBox.css";

interface Step {
    number: number;
    title: string;
    description: string;
}

interface StepBoxProps {
    currentStep: number;
    completedSteps: number[];
    onStepClick: (stepNumber: number) => void;
}

export const StepBox = ({ currentStep, completedSteps, onStepClick }: StepBoxProps) => {
    const steps: Step[] = [
        {
            number: 1,
            title: "Passo 1",
            description: "Escolha o programa"
        },
        {
            number: 2,
            title: "Passo 2",
            description: "Oferte suas milhas"
        },
        {
            number: 3,
            title: "Passo 3",
            description: "Insira os dados do programa"
        },
        {
            number: 4,
            title: "Passo 4",
            description: "Pedido finalizado"
        }
    ];

    const getStepStatus = (stepNumber: number) => {
        if (stepNumber === currentStep) return "current";
        if (completedSteps.includes(stepNumber)) return "completed";
        if (stepNumber < currentStep) return "accessible";
        return "disabled";
    };

    const isClickable = (stepNumber: number) => {
        return stepNumber <= currentStep || completedSteps.includes(stepNumber);
    };

    const handleStepClick = (stepNumber: number) => {
        if (isClickable(stepNumber)) {
            onStepClick(stepNumber);
        }
    };

    return (
        <div className="step-box">
            {steps.map((step, index) => (
                <div key={step.number} className="step-container">
                    <div className="step-info">
                        <div className="step-circle">
                            <StepCircle />
                        </div>
                        <div className="step-content">
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </div>
                    </div>
                    {index < steps.length - 1 && <div className="step-connector"></div>}
                </div>
            ))}
        </div>
    );
};