import { useState } from "react";
import "./Step3.css";

interface Step3Props {
    onNext: (data: Step3Data) => void;
    onBack: () => void;
}

interface Step3Data {
    cpf: string;
    loginAccess: string;
    accessPassword: string;
    authPhone: string;
}

export const Step3 = ({ onNext, onBack }: Step3Props) => {
    const [cpf, setCpf] = useState("431.140.231-12");
    const [loginAccess, setLoginAccess] = useState("1283124124");
    const [accessPassword, setAccessPassword] = useState("1877");
    const [authPhone, setAuthPhone] = useState("+55 🇧🇷 (19)98277-3123");

    const handleNext = () => {
        onNext({
            cpf,
            loginAccess,
            accessPassword,
            authPhone
        });
    };

    return (
        <div className="step3-container">
            <div className="step3-content">
                <div className="step3-header">
                    <span className="step-number">03.</span>
                    <h2>Insira os dados do programa de fidelidade</h2>
                    <div className="program-badge">
                        <span>TudoAzul</span>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>CPF do Titular</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                className="form-input"
                                placeholder="000.000.000-00"
                            />
                            <span className="input-icon">👤</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Login de acesso</label>
                        <input
                            type="text"
                            value={loginAccess}
                            onChange={(e) => setLoginAccess(e.target.value)}
                            className="form-input"
                            placeholder="Digite seu login"
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha de acesso</label>
                        <div className="input-with-icon">
                            <input
                                type="password"
                                value={accessPassword}
                                onChange={(e) => setAccessPassword(e.target.value)}
                                className="form-input"
                                placeholder="Digite sua senha"
                            />
                            <span className="input-icon">🔒</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Telefone para autenticação</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                value={authPhone}
                                onChange={(e) => setAuthPhone(e.target.value)}
                                className="form-input"
                                placeholder="+55 (00) 00000-0000"
                            />
                            <span className="input-icon">📱</span>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="btn-back" onClick={onBack}>
                        ← Voltar
                    </button>
                    <button className="btn-next" onClick={handleNext}>
                        Prosseguir →
                    </button>
                </div>
            </div>

            <div className="step3-sidebar">
                <div className="sidebar-info">
                    <h3>Dados da Conta</h3>
                    <p>Por favor, insira os dados da conta que deseja cadastrar e verifique se estão corretos.</p>
                </div>
            </div>
        </div>
    );
};