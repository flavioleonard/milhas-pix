import { useForm } from "react-hook-form";
import styles from "./Step3.module.css";
import { Box } from "../box/Box";
import Image from "next/image";
import NextIcon from "../../assets/Next.png";
import AzulLogo from "../../assets/TudoAzulCard.png";
import SmilesLogo from "../../assets/SmilesCard.png";
import LatamIcon from "../../assets/LatamCard.png";
import AirPortugal from "../../assets/TapCard.png";

import { IMaskInput } from 'react-imask';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { BackButton } from "../back-button/BackButton";
import { Button } from "../button/Button";
import { NextButton } from "../next-button/NextButton";
import { useState } from "react";

interface Step3Props {
    onNext: (data: Step3Data) => void;
    onBack: () => void;
    selectedProgram: string;
    totalValue: number;
}

interface Step3Data {
    cpf: string;
    loginAccess: string;
    accessPassword: string;
    authPhone: string;
}

export const Step3 = ({ onNext, onBack, selectedProgram, totalValue }: Step3Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<Step3Data>({
        defaultValues: {
            cpf: "000.000.000-00",
            loginAccess: "",
            accessPassword: "",
            authPhone: ""
        }
    });

    const watchedValues = watch();

    const programsData = {
        tudoazul: { name: "TudoAzul", logo: AzulLogo },
        smiles: { name: "Smiles", logo: SmilesLogo },
        latampass: { name: "LATAM PASS", logo: LatamIcon },
        tap: { name: "TAP", logo: AirPortugal }
    };

    const currentProgram = programsData[selectedProgram as keyof typeof programsData] || programsData.tudoazul;

    const onSubmit = (data: Step3Data) => {
        onNext(data);
    };

    return (
        <div className={styles['mobile']}>
            <div className={styles.container}>
                <div className={styles['content']}>
                    <Box>
                        <div className={styles['header']}>
                            <div style={{ display: 'flex', fontWeight: '500', fontSize: '1.125rem', gap: '8px', alignItems: 'center' }}>
                                <span className={styles['step-number']}>03.</span>
                                <span className={styles['header-text']}>Dados do programa</span>
                                <span className={styles['header-text-desktop']}>Insira os dados do programa de fidelidade</span>
                            </div>
                            <div className={styles['program-badge']}>
                                <Image
                                    src={currentProgram.logo}
                                    alt={`${currentProgram.name} logo`}
                                    width={80}
                                    height={24}
                                    style={{
                                        height: "auto",
                                        width: "auto",
                                        maxWidth: "80px",
                                        maxHeight: "24px",
                                    }}
                                    unoptimized
                                />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles['form-grid']}>
                                <div className={styles['form-group-1']}>
                                    <div className={styles['cpf-form']}>
                                        <label>CPF do Titular</label>
                                        <div className={styles['input-with-icon']}>
                                            <IMaskInput
                                                mask="000.000.000-00"
                                                {...register("cpf", {
                                                    required: "Preencha todos os campos",
                                                    pattern: {
                                                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                                        message: "CPF inválido"
                                                    },
                                                    validate: value => {
                                                        if (!value || value.replace(/\D/g, '').length < 11) {
                                                            return "Preencha todos os campos";
                                                        }
                                                        return true;
                                                    }
                                                })}
                                                onAccept={(value: string) => setValue("cpf", value)}
                                                placeholder="000.000.000-00"
                                                className={styles['form-input']}
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
                                        {errors.cpf && <span className={styles.error}>{errors.cpf.message}</span>}
                                    </div>
                                    <div className={styles['login-form']}>
                                        <label>Login de acesso</label>
                                        <input
                                            type="text"
                                            {...register("loginAccess", {
                                                required: "Preencha todos os campos",
                                                validate: value => value.trim() !== "" || "Preencha todos os campos"
                                            })}
                                            className={styles['form-input']}
                                            placeholder="Digite seu login"
                                        />
                                        {errors.loginAccess && <span className={styles.error}>{errors.loginAccess.message}</span>}
                                    </div>
                                </div>

                                <div className={styles['form-group-2']}>
                                    <div className={styles['password-form']}>
                                        <label>Senha de acesso</label>
                                        <div className={styles['input-with-icon']}>
                                            <input
                                                type="password"
                                                {...register("accessPassword", {
                                                    required: "Preencha todos os campos",
                                                    validate: value => value.trim() !== "" || "Preencha todos os campos"
                                                })}
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
                                        {errors.accessPassword && <span className={styles.error}>{errors.accessPassword.message}</span>}
                                    </div>

                                    <div className={styles['phone-form']}>
                                        <label>Telefone para autenticação</label>
                                        <div className={styles['input-with-icon']}>
                                            <PhoneInput
                                                country={'br'}
                                                value={watchedValues.authPhone}
                                                onChange={(phone: string) => setValue("authPhone", phone)}
                                                enableSearch={true}
                                                searchPlaceholder="Buscar país..."
                                                placeholder="Digite seu telefone"
                                                countryCodeEditable={false}
                                                preferredCountries={['br', 'us', 'ar', 'cl', 'co', 'mx']}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Box>

                    <div className={styles['mobile-sidebar']}>
                        <div className={styles['mobile-sidebar-header']} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <span>Dados da conta</span>
                            <span className={styles['mobile-sidebar-icon']}>
                                {isSidebarOpen ? '−' : '+'}
                            </span>
                        </div>
                        {isSidebarOpen && (
                            <div className={styles['mobile-sidebar-content']}>
                                <span>Por favor, insira os dados da conta que deseja cadastrar e verifique se estão corretos.</span>
                            </div>
                        )}
                    </div>
                    {/* Desktop buttons */}
                    <div className={styles['action-buttons']}>
                        <BackButton onClick={onBack} />
                        <h5>Ao prosseguir você concorda com os termos de uso</h5>
                        <Button
                            name="Concluir"
                            className={styles['next-button']}
                            icon={NextIcon}
                            iconPosition="right"
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </div>

                {/* Desktop Sidebar */}
                <Box className={styles['sidebar']}>
                    <span>Dados da Conta</span>
                    <p>Por favor, insira os dados da conta que deseja cadastrar e verifique se estão corretos.</p>
                </Box>
            </div>

            <div className={styles['mobile-can-receive']}>
                <span className={styles['mobile-can-receive-title']}>Receba até</span>
                <div className={styles['total-value']}>
                    <span className={styles['currency-large']}>R$</span>
                    <span className={styles['value-large']}>
                        {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
            {/* Mobile footer */}
            <div className={styles['mobile-footer']}>
                <button className={styles['mobile-footer-back']} onClick={onBack}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4193_499)">
                            <path d="M13.5 8L2.5 8" stroke="#2E3D50" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 12.5L2.5 8L7 3.5" stroke="#2E3D50" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_4193_499">
                                <rect width="16" height="16" fill="white" transform="translate(16 16) rotate(-180)" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <div className={styles['mobile-footer-step']}>3 de 4</div>
                <NextButton onClick={handleSubmit(onSubmit)} />
            </div>
        </div>


    );
};