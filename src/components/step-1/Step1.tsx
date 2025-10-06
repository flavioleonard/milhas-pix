import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./Step1.module.css";
import Image from "next/image";
import AzulLogo from "../../assets/TudoAzul_resized.png"
import SmilesLogo from "../../assets/Smiles_resized.png"
import LatamIcon from "../../assets/Latam_resized.png"
import AirPortugal from "../../assets/Tap_resized.png"
import { Box } from "../box/Box";
import { NextButton } from "../next-button/NextButton";

interface Step1Props {
    onNext: (data: Step1Data) => void;
}

interface Step1Data {
    selectedProgram: string;
    product: string;
    availableCPFs: string;
}

export const Step1 = ({ onNext }: Step1Props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Step1Data>({
        defaultValues: {
            selectedProgram: "tudoazul",
            product: "Liminar",
            availableCPFs: "Ilimitado"
        }
    });

    const watchedValues = watch();

    const programs = [
        { id: "tudoazul", name: "TudoAzul", logo: AzulLogo },
        { id: "smiles", name: "Smiles", logo: SmilesLogo },
        { id: "latampass", name: "LATAM PASS", logo: LatamIcon },
        { id: "tap", name: "TAP", logo: AirPortugal }
    ];

    const selectedProgram = programs.find(p => p.id === watchedValues.selectedProgram);

    const onSubmit = (data: Step1Data) => {
        onNext(data);
    };

    const handleProgramSelect = (programId: string) => {
        setValue("selectedProgram", programId);
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles['mobile']}>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <Box className={styles.box}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles['header']}>
                                <span className={styles['step-number']}>01.</span>
                                <span className={styles['desktop-text']}>Escolha o programa de fidelidade</span>
                                <span className={styles['mobile-text']}>Escolha o programa</span>

                            </div>

                            {/* Desktop version - programs grid */}
                            <div className={styles['programs-grid']}>
                                {programs.map((program) => (
                                    <button
                                        key={program.id}
                                        type="button"
                                        className={`${styles['program-card']} ${watchedValues.selectedProgram === program.id ? styles.selected : ''}`}
                                        onClick={() => setValue("selectedProgram", program.id)}
                                    >
                                        <div className={styles['logo-wrapper']}>
                                            <Image
                                                src={program.logo}
                                                alt={`${program.name} logo`}
                                                style={{
                                                    height: "auto",
                                                    width: "auto",
                                                    maxWidth: "60%",
                                                    maxHeight: "60%",
                                                }}
                                                unoptimized
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Mobile version - selected program display */}
                            <div className={styles['mobile-selected-program']}>
                                <span className={styles['mobile-selected-program-text']}>
                                    {selectedProgram?.name}
                                </span>
                                <Image
                                    src={selectedProgram?.logo || AzulLogo}
                                    alt={`${selectedProgram?.name} logo`}
                                    className={styles['mobile-selected-program-logo']}
                                    unoptimized
                                />
                            </div>

                            <div className={styles['form-row']}>
                                <div className={styles['form-group']}>
                                    <label>Produto</label>
                                    <select
                                        {...register("product", { required: "Produto é obrigatório" })}
                                        className={styles['form-select']}
                                    >
                                        <option value="Liminar">Liminar</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                                <div className={styles['form-group']}>
                                    <label>CPF&apos;s Disponíveis</label>
                                    <select
                                        {...register("availableCPFs", { required: "CPF's disponíveis é obrigatório" })}
                                        className={styles['form-select']}
                                    >
                                        <option value="Ilimitado">Ilimitado</option>
                                        <option value="Limitado">Limitado</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </Box>

                    {/* Mobile version - program selector */}
                    <div className={styles['mobile-program-selector']} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <span className={styles['mobile-program-selector-text']}>
                            Selecione o programa
                        </span>
                        <span className={styles['mobile-program-selector-icon']}>
                            {isDropdownOpen ? '−' : '+'}
                        </span>

                        {isDropdownOpen && (
                            <div className={styles['mobile-program-dropdown']}>
                                {programs.map((program) => (
                                    <div
                                        key={program.id}
                                        className={styles['mobile-program-option']}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProgramSelect(program.id);
                                        }}
                                    >
                                        <Image
                                            src={program.logo}
                                            alt={`${program.name} logo`}
                                            className={styles['mobile-program-option-logo']}
                                            unoptimized
                                        />
                                        <span className={styles['mobile-program-option-text']}>
                                            {program.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Desktop button section */}
                    <div className={styles['button-section']}>
                        <NextButton onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>

                <div className={styles['sidebar']}>
                    <Box className={styles['sidebar-info']}>
                        <span className={styles['sidebar-title']}>Selecione o programa</span>
                        <span className={styles['sidebar-description']}>Escolha de qual programa de fidelidade você quer vender suas milhas. Use apenas contas em seu nome.</span>
                    </Box>
                </div>
            </div>

            {/* Mobile footer */}
            <div className={styles['mobile-footer']}>
                <div className={styles['mobile-footer-step']}>1 de 4</div>
                <NextButton onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};