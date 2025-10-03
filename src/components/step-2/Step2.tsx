import { useState } from "react";
import "./Step2.css";
import { Box } from "../box/Box";
import { Button } from "../button/Button";
import NextIcon from "../../assets/Next.png";

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
    const [milesQuantity, setMilesQuantity] = useState(0);
    const [pricePerMile, setPricePerMile] = useState(1.8);
    const [useAverage, setUseAverage] = useState(false);

    const timingOptions = [
        { id: "imediato", label: "Pagamento imediato" },
        { id: "confirmacao", label: "Após confirmação" },
        { id: "7dias", label: "Em até 7 dias" }
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
        <div>
            <div className="step2-container">
                <div className="step2-content">
                    <Box className="box">
                        <div className="step2-header">
                            <span className="step-number">02.</span>
                            <h2>Oferte suas milhas</h2>
                            <div className="price-range">
                                Faixa de preço: <span className="price-highlight">R$ 1,60 - R$ 2,00</span>
                            </div>
                        </div>

                        {/* <div className="payment-timing">
                            <label>Quero receber</label>
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

                        <div className="miles-pricing">
                            <div className="miles-input">
                                <label>Quantidade de milhas</label>
                                <div className="input-with-icon">
                                    <input
                                        type="number"
                                        value={milesQuantity || ''}
                                        onChange={(e) => setMilesQuantity(Number(e.target.value))}
                                        className="miles-field"
                                        placeholder="0"
                                    />
                                    <span className="miles-icon">✈️</span>
                                </div>
                            </div>

                            <div className="price-input">
                                <label>Preço por milha</label>
                                <div className="price-field-container">
                                    <span className="currency">R$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={pricePerMile}
                                        onChange={(e) => setPricePerMile(Number(e.target.value))}
                                        className="price-field"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="average-toggle">
                            <label className="toggle-container">
                                <input
                                    type="checkbox"
                                    checked={useAverage}
                                    onChange={(e) => setUseAverage(e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                                Usar preço médio do mercado
                            </label>
                        </div>

                        <div className="action-buttons">
                            <button className="btn-back" onClick={onBack}>
                                Voltar
                            </button>
                            <Button
                                name="Prosseguir"
                                className="btn-next"
                                icon={NextIcon}
                                iconPosition="right"
                                onClick={handleNext}
                            />
                        </div> */}
                    </Box>
                </div>

                <div className="step2-sidebar">
                    <Box className="sidebar-section">
                        <h3>Dica de preço</h3>
                        <p>O preço médio atual para TudoAzul está entre R$ 1,60 e R$ 2,00 por milha.</p>
                    </Box>

                    <Box className="sidebar-section">
                        <h3>Ranking de ofertas</h3>
                        <div className="ranking-list">
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
                        </div>
                    </Box>

                    <Box className="sidebar-section total-section">
                        <h3>Total a receber</h3>
                        <div className="total-value">
                            <span className="currency-large">R$</span>
                            <span className="value-large">{totalValue.toFixed(2)}</span>
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    );
};