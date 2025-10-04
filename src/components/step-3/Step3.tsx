import { useState } from "react";
import styles from "./Step3.module.css";
import { Box } from "../box/Box";

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
        <div className={styles.container}>
            <div className={styles['content']}>
                <Box>
                    <div className={styles['header']}>
                        <span className={styles['step-number']}>03.</span>
                        <h2>Insira os dados do programa de fidelidade</h2>
                        <div className={styles['program-badge']}>
                            <span>TudoAzul</span>
                        </div>
                    </div>

                    <div className={styles['form-grid']}>
                        <div className={styles['form-group-1']}>
                            <div className={styles['cpf-form']}>
                                <label>CPF do Titular</label>
                                <div className={styles['input-with-icon']}>
                                    <input
                                        type="text"
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        className={styles['form-input']}
                                        placeholder="000.000.000-00"
                                    />
                                    <span className={styles['input-icon']}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_4193_317)">
                                                <path d="M4.98438 15.5758C5.45462 14.6496 6.17216 13.8716 7.05745 13.3282C7.94275 12.7848 8.96123 12.4972 10 12.4972C11.0388 12.4972 12.0572 12.7848 12.9425 13.3282C13.8278 13.8716 14.5454 14.6496 15.0156 15.5758" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M10 12.5C11.7259 12.5 13.125 11.1009 13.125 9.375C13.125 7.64911 11.7259 6.25 10 6.25C8.27411 6.25 6.875 7.64911 6.875 9.375C6.875 11.1009 8.27411 12.5 10 12.5Z" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_4193_317">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </span>
                                </div>
                            </div>
                            <div className={styles['login-form']}>
                                <label>Login de acesso</label>
                                <input
                                    type="text"
                                    value={loginAccess}
                                    onChange={(e) => setLoginAccess(e.target.value)}
                                    className={styles['form-input']}
                                    placeholder="Digite seu login"
                                />
                            </div>

                        </div>


                        <div className={styles['form-group-2']}>
                            <div className={styles['password-form']}>
                                <label>Senha de acesso</label>
                                <div className={styles['input-with-icon']}>
                                    <input
                                        type="password"
                                        value={accessPassword}
                                        onChange={(e) => setAccessPassword(e.target.value)}
                                        className={styles['form-input']}
                                        placeholder="Digite sua senha"
                                    />
                                    <span className={styles['input-icon']}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_4193_326)">
                                                <path d="M16.25 6.875H3.75C3.40482 6.875 3.125 7.15482 3.125 7.5V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V7.5C16.875 7.15482 16.5952 6.875 16.25 6.875Z" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.875 6.875V4.375C6.875 3.5462 7.20424 2.75134 7.79029 2.16529C8.37634 1.57924 9.1712 1.25 10 1.25C10.8288 1.25 11.6237 1.57924 12.2097 2.16529C12.7958 2.75134 13.125 3.5462 13.125 4.375V6.875" stroke="#1E90FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_4193_326">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className={styles['phone-form']}>
                                <label>Telefone para autenticação</label>
                                <div className={styles['input-with-icon']}>
                                    <input
                                        type="text"
                                        value={authPhone}
                                        onChange={(e) => setAuthPhone(e.target.value)}
                                        className={styles['form-input']}
                                        placeholder="+55 (00) 00000-0000"
                                    />
                                    <span className={styles['input-icon']}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.77148 22.0431L3.19857 16.8325C2.31839 15.3076 1.85532 13.5776 1.85588 11.8054C1.85814 6.26096 6.37018 1.75024 11.9148 1.75024C14.6054 1.75156 17.1308 2.79866 19.0302 4.69936C20.9291 6.60007 21.9746 9.12643 21.9737 11.8135C21.9712 17.3575 17.4585 21.869 11.9148 21.869C11.9144 21.869 11.9152 21.869 11.9148 21.869H11.9105C10.2272 21.8683 8.57306 21.4461 7.10378 20.6448L1.77148 22.0431Z" fill="white" />
                                        <path d="M11.9184 3.44873C7.30676 3.44873 3.55638 7.19774 3.55469 11.8059C3.554 13.385 3.99593 14.923 4.83277 16.2538L5.03172 16.57L4.18691 19.654L7.35122 18.8243L7.65677 19.0054C8.94011 19.767 10.4115 20.1698 11.912 20.1705H11.9152C16.5233 20.1705 20.2737 16.4211 20.2756 11.8126C20.2764 9.57942 19.4077 7.47939 17.8291 5.89971C16.2506 4.32003 14.1517 3.44967 11.9184 3.44873Z" fill="#10B981" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.40091 7.60159C9.21251 7.18317 9.01432 7.17469 8.83535 7.16734C8.68878 7.16113 8.52111 7.1615 8.35363 7.1615C8.18596 7.1615 7.91373 7.22443 7.68351 7.47593C7.4531 7.72744 6.80371 8.33539 6.80371 9.572C6.80371 10.8086 7.70442 12.0034 7.82989 12.1713C7.95555 12.3389 9.56858 14.9576 12.1234 15.965C14.2464 16.8022 14.6784 16.6356 15.1394 16.5938C15.6002 16.552 16.6264 15.9859 16.8357 15.399C17.0452 14.8122 17.0452 14.3094 16.9824 14.2042C16.9195 14.0993 16.752 14.0366 16.5005 13.9109C16.2492 13.7852 15.0135 13.1771 14.7831 13.0933C14.5527 13.0094 14.3852 12.9676 14.2176 13.2191C14.0501 13.4706 13.5687 14.0366 13.422 14.2042C13.2754 14.3721 13.1288 14.393 12.8773 14.2673C12.626 14.1413 11.8165 13.8762 10.8562 13.02C10.1091 12.3538 9.60475 11.5311 9.45799 11.2796C9.31142 11.0281 9.44235 10.8921 9.56839 10.7668C9.68123 10.6541 9.8197 10.4733 9.94555 10.3265C10.0708 10.1798 10.1128 10.075 10.1965 9.90753C10.2803 9.73967 10.2385 9.59291 10.1756 9.46726C10.1128 9.3416 9.62434 8.09857 9.40091 7.60159Z" fill="white" />
                                    </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
                <div className={styles['action-buttons']}>
                    <button className={styles['btn-back']} onClick={onBack}>
                        ← Voltar
                    </button>
                    <h5>Ao prosseguir você concorda com os termos de uso</h5>
                    <button className={styles['btn-next']} onClick={handleNext}>
                        Concluir →
                    </button>
                </div>
            </div>

            <Box className={styles['sidebar']}>
                <h3>Dados da Conta</h3>
                <p>Por favor, insira os dados da conta que deseja cadastrar e verifique se estão corretos.</p>
            </Box>
        </div>
    );
};