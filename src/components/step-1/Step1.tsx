import { useForm } from "react-hook-form";
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

    const onSubmit = (data: Step1Data) => {
        onNext(data);
    };

    return (
        <div>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <Box className={styles.box}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles['header']}>
                                <span className={styles['step-number']}>01.</span>
                                <span>Escolha o programa de fidelidade</span>
                            </div>
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
                                    <label>CPF's Disponíveis</label>
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
                    <div className={styles['button-section']}>
                        <NextButton onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>
                <div style={{ width: '248px' }}>
                    <Box className={styles['sidebar-info']}>
                        <span className={styles['sidebar-title']}>Selecione o programa</span>
                        <span className={styles['sidebar-description']}>Escolha de qual programa de fidelidade você quer vender suas milhas. Use apenas contas em seu nome.</span>
                    </Box>
                </div>
            </div>
        </div>
    );
};