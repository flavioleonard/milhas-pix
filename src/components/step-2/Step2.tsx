import { useState } from "react";
import Switch from "react-switch";

import "./Step2.css";
import { Box } from "../box/Box";
import Image from "next/image";
import { Button } from "../button/Button";
import NextIcon from "../../assets/Next.png";
import BackIcon from "../../assets/Back.png";

import AirPlanIcon from "../../assets/AirplaneInFlight.png"

interface Step2Props {
    onNext: (data: Step2Data) => void;
    onBack: () => void;
}

interface Step2Data {
    paymentTiming: string;
    milesQuantity: number;
    pricePerMile: number;
    useAverage: boolean;
}

export const Step2 = ({ onNext, onBack }: Step2Props) => {
    const [paymentTiming, setPaymentTiming] = useState("imediato");
    const [averageIsChecked, setAverageIsChecked] = useState(false);
    const [milesQuantity, setMilesQuantity] = useState(0);
    const [pricePerMile, setPricePerMile] = useState(1.8);
    const [useAverage, setUseAverage] = useState(false);

    const timingOptions = [
        { id: "Imediato", label: "Pagamento imediato" },
        { id: "2dias", label: "Após confirmação" },
        { id: "7dias", label: "Em até 7 dias" },
        { id: "Depois do voo", label: "Depois do voo" }
    ];

    const handleNext = () => {
        onNext({
            paymentTiming,
            milesQuantity,
            pricePerMile,
            useAverage
        });
    };

    const totalValue = milesQuantity * pricePerMile;

    return (
        <div className="container">
            <div className="content">
                <Box className="box">
                    <div className="header">
                        <span className="step-number">02.</span>
                        <h2>Oferte suas milhas</h2>
                        <div className="price-range">
                            Faixa de preço: <span className="price-highlight">R$ 1,60 - R$ 2,00</span>
                        </div>
                    </div>

                    <div className="payment-section">
                        <div className="want-receive">
                            <h3>Quero receber</h3>
                            <div className="timing-options">
                                {timingOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`timing-btn ${paymentTiming === option.id ? 'selected' : ''}`}
                                        onClick={() => setPaymentTiming(option.id)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="miles">
                            <div className="miles-offers">
                                <h3>Milhas ofertadas</h3>
                                <Box className="miles-input">
                                    <input type="text" name="miles-offers" id="miles-offers" />
                                    <Image
                                        src={AirPlanIcon}
                                        alt="MilhasPix Logo"
                                        width={20}
                                        height={20}
                                    />
                                </Box>
                            </div>
                            <div className="miles-values">
                                <h3>Valor de a cada 1.000 milhas</h3>
                                <Box className="value-per-mile">
                                    <input type="text" name="miles-value" id="miles-value" />
                                    <Image
                                        src={AirPlanIcon}
                                        alt="MilhasPix Logo"
                                        width={20}
                                        height={20}
                                    />

                                </Box>
                            </div>

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div className="average-miles">
                                <Switch
                                    checked={averageIsChecked}
                                    offColor="#E2E2E2"
                                    onColor="#1e90ff"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    onChange={() => setAverageIsChecked(!averageIsChecked)}
                                />
                                <h3>Definir média de milhas por passageiro</h3>
                            </div>
                            {averageIsChecked && <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                                <Box className="average-input">
                                    <input type="text" name="average" id="average" />
                                </Box>
                                <Box className="tip">
                                    <p>Melhor média para sua oferta: <span>27.800</span></p>
                                </Box>
                            </div>}

                        </div>

                    </div>
                </Box>
                <div className="handle-step">
                    <Button
                        name="Voltar"
                        className="back-button"
                        icon={BackIcon}
                        iconPosition="left"
                        onClick={onBack}
                    />
                    <Button
                        name="Prosseguir"
                        className="next-button"
                        icon={NextIcon}
                        iconPosition="right"
                        onClick={handleNext}
                    />
                </div>
            </div>

            <div className="sidebar">
                <Box className="sidebar-help">
                    <h3>Média de milhas</h3>
                    <p>Ao vender mais de 20.000 milhas, ative as Opções Avançadas para definir a média de milhas por emissão.</p>
                </Box>

                <div className="sidebar-ranking">
                    <h3>Ranking de ofertas</h3>
                    <Box className="ranking-section">
                        <div className="ranking-item">
                            <span className="position">1º</span>
                            <span>R$ 1,95</span>
                        </div>
                        <div className="ranking-item highlight">
                            <span className="position">2º</span>
                            <span>R$ 1,80</span>
                            <span className="you-label">VOCÊ</span>
                        </div>
                        <div className="ranking-item">
                            <span className="position">3º</span>
                            <span>R$ 1,75</span>
                        </div>
                    </Box>
                </div>

                <div style={{ display: "flex", border: "1px solid #E2E2E2", width: "100%" }}></div>

                <div className="can-receive">
                    <h3>Receba até: </h3>
                    <div className="total-value">
                        <span className="currency-large">R$</span>
                        <span className="value-large">24.325,23</span>
                    </div>
                </div>
            </div>
        </div>
    );
};