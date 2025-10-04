"use client";


import { useState } from "react";
import { StepBox } from "../../components/step-box/StepBox";
import styles from "./NewOffer.module.css";
import { Step1 } from "../../components/step-1/Step1";
import { Step2 } from "../../components/step-2/Step2";
import { Step3 } from "@/components/step-3/Step3";


export const NewOffer = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleStepClick = (stepNumber: number) => {
        setCurrentStep(stepNumber);
    };

    const handleStep1Next = (data: any) => {
        completeStep(1);
        setCurrentStep(2);
    };

    const handleStep2Next = (data: any) => {
        completeStep(2);
        setCurrentStep(3);
    };

    const handleStep2Back = () => {
        setCurrentStep(1);
    };

    const handleStep3Next = (data: any) => {
        completeStep(2);
        setCurrentStep(4);
    }

    const handleStep3Back = () => {
        setCurrentStep(2);
    };



    const completeStep = (stepNumber: number) => {
        if (!completedSteps.includes(stepNumber)) {
            setCompletedSteps([...completedSteps, stepNumber]);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1 onNext={handleStep1Next} />;
            case 2:
                return <Step2 onNext={handleStep2Next} onBack={handleStep2Back} />;
            case 3:
                return <Step3 onNext={handleStep3Next} onBack={handleStep3Back} />;
            case 4:
                return <div>Conteúdo do Passo 4 - Finalização</div>;
            default:
                return <div>Passo não encontrado</div>;
        }
    };

    return (
        <div className={styles['new-offer-container']}>
            <div className={styles['new-offer-content']}>
                <StepBox
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    onStepClick={handleStepClick}
                />

                {renderStepContent()}
            </div >
        </div >
    );
};

