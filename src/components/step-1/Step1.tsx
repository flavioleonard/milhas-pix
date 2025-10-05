import { useState } from "react";
import styles from "./Step1.module.css";
import Image from "next/image";
import NextIcon from "../../assets/Next.png"
import AzulLogo from "../../assets/TudoAzulLogo.png"
import SmilesLogo from "../../assets/SmilesLogo.png"
import LatamIcon from "../../assets/Latam.png"
import AirPortugal from "../../assets/AirPortugal.png"
import { Box } from "../box/Box";
import { Button } from "../button/Button";


interface Step1Props {
    onNext: (data: Step1Data) => void;
}

interface Step1Data {
    selectedProgram: string;
    product: string;
    availableCPFs: string;
}

export const Step1 = ({ onNext }: Step1Props) => {
    const [selectedProgram, setSelectedProgram] = useState("tudoazul");
    const [product, setProduct] = useState("Liminar");
    const [availableCPFs, setAvailableCPFs] = useState("Ilimitado");

    const programs = [
        { id: "tudoazul", name: "TudoAzul", logo: AzulLogo },
        { id: "smiles", name: "Smiles", logo: SmilesLogo },
        { id: "latampass", name: "LATAM PASS", logo: LatamIcon },
        { id: "tap", name: "TAP", logo: AirPortugal }
    ];

    const handleNext = () => {
        onNext({
            selectedProgram,
            product,
            availableCPFs
        });
    };

    return (
        <div>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <Box className={styles.box}>
                        <div className={styles['header']}>
                            <span className={styles['step-number']}>01.</span>
                            <span>Escolha o programa de fidelidade</span>
                        </div>
                        <div className={styles['programs-grid']}>
                            {programs.map((program) => (
                                <button
                                    key={program.id}
                                    className={`${styles['program-card']} ${selectedProgram === program.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedProgram(program.id)}
                                >
                                    <div className={styles['program-logo']}>
                                        <Image src={program.logo}
                                            alt="Logo"
                                            width={120}
                                            height={40} />
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className={styles['form-row']}>
                            <div className={styles['form-group']}>
                                <label>Produto</label>
                                <select
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    className={styles['form-select']}
                                >
                                    <option value="Liminar">Liminar</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                            <div className={styles['form-group']}>
                                <label>CPF's Disponíveis</label>
                                <select
                                    value={availableCPFs}
                                    onChange={(e) => setAvailableCPFs(e.target.value)}
                                    className={styles['form-select']}
                                >
                                    <option value="Ilimitado">Ilimitado</option>
                                    <option value="Limitado">Limitado</option>
                                </select>
                            </div>
                        </div>

                    </Box>
                    <div className={styles['button-section']}>
                        <Button
                            name="Prosseguir"
                            className={styles.button}
                            icon={NextIcon}
                            iconPosition="right"
                            onClick={handleNext}
                        />
                    </div>
                </div>
                <div>
                    <Box className={styles['sidebar-info']}>
                        <span className={styles['sidebar-title']}>Selecione o programa</span>
                        <span className={styles['sidebar-description']}>Escolha de qual programa de fidelidade você quer vender suas milhas. Use apenas contas em seu nome.</span>
                    </Box>
                </div>
            </div>

        </div >

    );
};