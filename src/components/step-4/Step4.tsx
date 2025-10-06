import { Box } from "../box/Box";
import styles from "./Step4.module.css";
import Image from "next/image";
import CongratulationsIcon from "../../assets/Congratulations.svg"
import { AllData } from "@/types/StepData";

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