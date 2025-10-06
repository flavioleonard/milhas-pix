"use client";

import { useState } from "react";
import { StepBox } from "../../components/step-box/StepBox";
import styles from "./NewOffer.module.css";
import { Step1 } from "../../components/step-1/Step1";
import { Step2 } from "../../components/step-2/Step2";
import { Step3 } from "@/components/step-3/Step3";
import { Step4 } from "@/components/step-4/Step4";
import { useRouter } from "next/navigation";
import { Step1Data, Step2Data, Step3Data } from "@/types/StepData";

export const NewOffer = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
    const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
    const [step3Data, setStep3Data] = useState<Step3Data | null>(null);
    const router = useRouter();

    const handleStepClick = (stepNumber: number) => {
        if (stepNumber > currentStep) {
            const previousSteps = [];
            for (let i = 1; i < stepNumber; i++) {
                if (!completedSteps.includes(i)) {
                    previousSteps.push(i);
                }
            }

            if (previousSteps.length > 0) {
                setCompletedSteps([...completedSteps, ...previousSteps]);
            }
        }
        else if (stepNumber < currentStep) {
            const newCompletedSteps = completedSteps.filter(step => step < stepNumber);
            setCompletedSteps(newCompletedSteps);
        }

        setCurrentStep(stepNumber);
    };

    const handleStep1Next = (data: Step1Data) => {
        setStep1Data(data);
        completeStep(1);
        setCurrentStep(2);
    };

    const handleStep2Next = (data: Step2Data) => {
        setStep2Data(data);
        completeStep(2);
        setCurrentStep(3);
        handleStepClick(3);
    };

    const handleStep2Back = () => {
        setCurrentStep(1);
        handleStepClick(1);
    };

    const handleStep3Next = (data: Step3Data) => {
        setStep3Data(data);
        completeStep(3);
        setCurrentStep(4);
        handleStepClick(4);
    }

    const handleStep3Back = () => {
        setCurrentStep(2);
        handleStepClick(2);
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
                return <Step3
                    onNext={handleStep3Next}
                    onBack={handleStep3Back}
                    selectedProgram={step1Data?.selectedProgram || 'tudoazul'}
                />;
            case 4:
                return <Step4
                    onViewOffers={() => router.push('./offer-list')}
                    allData={{
                        step1: step1Data,
                        step2: step2Data,
                        step3: step3Data
                    }}
                />;
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