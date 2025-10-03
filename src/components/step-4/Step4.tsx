import "./Step4.css";

interface Step4Props {
    onViewOffers: () => void;
}

export const Step4 = ({ onViewOffers }: Step4Props) => {
    return (
        <div className="step4-container">
            <div className="step4-content">
                <div className="success-icon">
                    🎉
                </div>

                <h1 className="success-title">
                    Ordem de venda criada com sucesso!
                </h1>

                <p className="success-message">
                    Agora é só aguardar — assim que suas milhas forem vendidas, o valor será transferido direto para sua conta via Pix.
                </p>

                <button className="btn-view-offers" onClick={onViewOffers}>
                    Ver minhas ofertas →
                </button>
            </div>
        </div>
    );
};