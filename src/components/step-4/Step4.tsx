import { Box } from "../box/Box";
import styles from "./Step4.module.css";
import Image from "next/image";
import CongratulationsIcon from "../../assets/Congratulations.svg"

interface Step1Data {
    selectedProgram: string;
    product: string;
    availableCPFs: string;
}

interface Step2Data {
    paymentTiming: string;
    milesQuantity: number;
    pricePerMile: number;
    useAverage: boolean;
    averageMiles?: number;
}

interface Step3Data {
    cpf: string;
    loginAccess: string;
    accessPassword: string;
    authPhone: string;
}

interface AllData {
    step1: Step1Data | null;
    step2: Step2Data | null;
    step3: Step3Data | null;
}

interface Step4Props {
    onViewOffers: () => void;
    allData: AllData;
}

export const Step4 = ({ onViewOffers, allData }: Step4Props) => {
    const formData = {
        ...allData.step1,
        ...allData.step2,
        ...allData.step3,
    };

    console.log("Dados preenchidos: ", formData);

    return (
        <Box className={styles['container']}>

            <div className={styles['success-icon']}>
                <Image src={CongratulationsIcon} width={60} height={60} alt="Parabens" />
            </div>

            <h1 className={styles['success-title']}>
                Ordem de venda criada com sucesso!
            </h1>

            <p className={styles['success-message']}>
                Agora é só aguardar — assim que suas milhas forem vendidas, o valor será transferido direto para sua conta via Pix.
            </p>

            <button className={styles['btn-view-offers']} onClick={onViewOffers}>
                Ver minhas ofertas →
            </button>

        </Box>
    );
};