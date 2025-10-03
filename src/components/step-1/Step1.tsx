import { useState } from "react";
import "./Step1.css";
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
            <div className="step1-container">
                <div className="step1-content">
                    <Box className="box">
                        <div className="step1-header">
                            <span className="step-number">01.</span>
                            <h2>Escolha o programa de fidelidade</h2>
                        </div>
                        <div className="programs-grid">
                            {programs.map((program) => (
                                <button
                                    key={program.id}
                                    className={`program-card ${selectedProgram === program.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedProgram(program.id)}
                                >
                                    <div className="program-logo">
                                        <img src={program.logo} />
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Produto</label>
                                <select
                                    value={product}
                                    onChange={(e) => setProduct(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="Liminar">Liminar</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>CPF's Disponíveis</label>
                                <select
                                    value={availableCPFs}
                                    onChange={(e) => setAvailableCPFs(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="Ilimitado">Ilimitado</option>
                                    <option value="Limitado">Limitado</option>
                                </select>
                            </div>
                        </div>

                    </Box>
                    <div className="button-section">
                        <Button
                            name="Prosseguir"
                            className="button"
                            icon={NextIcon}
                            iconPosition="right"
                            onClick={handleNext}
                        />
                    </div>
                </div>
                <div>
                    <Box className="sidebar-info">
                        <h3>Selecione o programa</h3>
                        <p>Escolha de qual programa de fidelidade você quer vender suas milhas. Use apenas contas em seu nome.</p>
                    </Box>
                </div>
            </div>

        </div >

    );
};