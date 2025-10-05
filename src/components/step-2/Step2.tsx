import { useState, useEffect } from "react";
import Switch from "react-switch";
import { NumericFormat } from 'react-number-format';
import styles from "./Step2.module.css";
import { Box } from "../box/Box";
import Image from "next/image";
import DownPrice from '../../assets/DownPrice.png'
import AirPlanIcon from "../../assets/AirplaneInFlight.png"
import { useDebounce } from "../../hooks/useDebounce";
import { BackButton } from "../back-button/BackButton";
import { NextButton } from "../next-button/NextButton";

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

interface RankingItem {
    mile_value: number;
    description: string;
    position: number;
}

export const Step2 = ({ onNext, onBack }: Step2Props) => {
    const [paymentTiming, setPaymentTiming] = useState("imediato");
    const [averageIsChecked, setAverageIsChecked] = useState(false);
    const [milesQuantity, setMilesQuantity] = useState(0);
    const [pricePerMile, setPricePerMile] = useState(25);
    const [useAverage, setUseAverage] = useState(false);
    const [ranking, setRanking] = useState<RankingItem[]>([]);
    const [isLoadingRanking, setIsLoadingRanking] = useState(false);

    const debouncedPricePerMile = useDebounce(pricePerMile, 500);

    const isPriceInRange = (price: number) => {
        return price >= 14 && price <= 16.56;
    };

    const isPriceOutOfRange = pricePerMile > 0 && !isPriceInRange(pricePerMile);


    const timingOptions = [
        { id: "Imediato", label: "Pagamento imediato" },
        { id: "2dias", label: "Após confirmação" },
        { id: "7dias", label: "Em até 7 dias" },
        { id: "Depois do voo", label: "Depois do voo" }
    ];

    const fetchRanking = async (mileValue: number) => {
        if (mileValue <= 0) {
            setRanking([]);
            return;
        }

        setIsLoadingRanking(true);
        try {
            const response = await fetch(`/api/ranking?mile_value=${mileValue.toFixed(2)}`);
            if (response.ok) {
                const data: RankingItem[] = await response.json();
                setRanking(data);
            }
        } catch (error) {
            console.error("Erro ao buscar ranking:", error);
            setRanking([]);

            try {
                const fallbackResponse = await fetch(`/api/ranking?mile_value=${mileValue.toFixed(2)}`);
                if (fallbackResponse.ok) {
                    const fallbackData: RankingItem[] = await fallbackResponse.json();
                    setRanking(fallbackData);
                }
            } catch (fallbackError) {
                console.error("Erro no fallback:", fallbackError);
            }
        } finally {
            setIsLoadingRanking(false);
        }
    };

    useEffect(() => {
        if (debouncedPricePerMile > 0) {
            fetchRanking(debouncedPricePerMile);
        } else {
            setRanking([]);
        }
    }, [debouncedPricePerMile]);

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
        <div className={styles.container}>
            <div className={styles.content}>
                <Box className={styles.box}>
                    <div className={styles['header']}>
                        <div style={{ display: 'flex', fontWeight: '500', fontSize: '1.125rem', gap: '8px', alignItems: 'center' }}>
                            <span className={styles['step-number']}>02.</span>
                            <span>Oferte suas milhas</span>
                        </div>
                        <div className={styles['price-range']}>
                            Escolha entre: <span className={styles['price-highlight']}>R$ 14,00 - R$ 16,56</span>
                        </div>
                    </div>

                    <div className={styles['payment-section']}>
                        <div className={styles['want-receive']}>
                            <span>Quero receber</span>
                            <div className={styles['timing-options']}>
                                {timingOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        className={`${styles['timing-btn']} ${paymentTiming === option.id ? styles.selected : ''}`}
                                        onClick={() => setPaymentTiming(option.id)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.miles}>
                            <div className={styles['miles-offers']}>
                                <span>Milhas ofertadas</span>
                                <Box className={styles['miles-input']}>
                                    <input
                                        type="text"
                                        name="miles-offers"
                                        id="miles-offers"
                                        value={milesQuantity || ''}
                                        onChange={(e) => setMilesQuantity(Number(e.target.value.replace(/\D/g, '')))}
                                        placeholder="0"
                                    />
                                    <Image
                                        src={AirPlanIcon}
                                        alt="MilhasPix Logo"
                                        width={20}
                                        height={20}
                                    />
                                </Box>
                            </div>
                            <div className={styles['miles-values']}>
                                <span>Valor de a cada 1.000 milhas</span>
                                <Box className={`${styles['value-per-mile']} ${isPriceOutOfRange ? styles['value-per-mile-error'] : ''}`}>
                                    <NumericFormat
                                        value={pricePerMile}
                                        onValueChange={(values) => {
                                            const { floatValue } = values;
                                            setPricePerMile(floatValue || 0);
                                        }}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        prefix="R$ "
                                        decimalScale={2}
                                        fixedDecimalScale
                                        placeholder="R$ 0,00"
                                        className={isPriceOutOfRange ? styles['input-error'] : ''}
                                        style={{
                                            outline: 'none',
                                            width: '100%',
                                            border: 'none',
                                            background: 'transparent'
                                        }}
                                    />
                                    {isPriceOutOfRange && <>
                                        <Image src={DownPrice} width={16} height={16} alt="O preço precisa estar no intervalo" />
                                    </>}
                                </Box>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <div className={styles['average-miles']}>
                                <Switch
                                    checked={averageIsChecked}
                                    offColor="#E2E2E2"
                                    onColor="#1e90ff"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    handleDiameter={24}
                                    onChange={() => setAverageIsChecked(!averageIsChecked)}
                                />
                                <span data-is-average={averageIsChecked}>Definir média de milhas por passageiro</span>
                            </div>
                            {averageIsChecked && <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                                <Box className={styles['average-input']}>
                                    <input type="text" name="average" id="average" />
                                </Box>
                                <Box className={styles.tip}>
                                    <p>Melhor média para sua oferta: <span>27.800</span></p>
                                </Box>
                            </div>}
                        </div>
                    </div>
                </Box>
                <div className={styles['handle-step']}>

                    <BackButton onClick={onBack} />
                    <NextButton onClick={handleNext} />
                </div>
            </div>

            <div className={styles.sidebar}>
                <Box className={styles['sidebar-help']}>
                    <span>Média de milhas</span>
                    <p>Ao vender mais de 20.000 milhas, ative as Opções Avançadas para definir a média de milhas por emissão.</p>
                </Box>

                <div className={styles['sidebar-ranking']}>
                    <span>Ranking de ofertas</span>
                    <Box className={styles['ranking-section']}>
                        {isLoadingRanking ? (
                            <div className={styles['ranking-item']}>
                                <span>Carregando...</span>
                            </div>
                        ) : ranking.length > 0 ? (
                            ranking.map((item) => (
                                <div
                                    key={item.position}
                                    className={`${styles['ranking-item']} ${item.description === 'essa será sua posição' ? styles.highlight : ''}`}
                                >
                                    <span className={styles.position}>{item.position}º</span>
                                    <span>R$ {item.mile_value.toFixed(2).replace('.', ',')}</span>
                                    {item.description === 'essa será sua posição' && (
                                        <span className={styles['you-label']}>VOCÊ</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className={styles['ranking-item']}>
                                <span>Digite um valor para ver o ranking</span>
                            </div>
                        )}
                    </Box>
                </div>

                <div style={{ display: "flex", border: "1px solid #E2E2E2", width: "100%" }}></div>

                <div className={styles['can-receive']}>
                    <span>Receba até: </span>
                    <div className={styles['total-value']}>
                        <span className={styles['currency-large']}>R$</span>
                        <span className={styles['value-large']}>
                            {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};