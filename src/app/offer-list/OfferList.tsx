"use client";


import { Box } from "@/components/box/Box"
import { Button } from "@/components/button/Button"
import PlusIcon from "@/assets/Plus.png"
import SearchIcon from "@/assets/Search.png"
import ExpandIcon from "@/assets/Show.png"
import SmilesIcon from "@/assets/Smiles.png"
import AzulIcon from "@/assets/TudoAzul.png"
import styles from "./OfferList.module.css"
import TextInput from "@/components/inputs/text-input/TextInput"
import FilterInput from "@/components/inputs/filter-input/FilterInput"
import { useState, useEffect } from "react"
import type { Offer } from "@/types/Offer"
import { ApiResponse } from "../api/offers/route";
import { useRouter } from "next/navigation";
import { off } from "process";

export default function OfferList() {
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [offers, setOffers] = useState<Offer[]>([]);
    const [totalOffers, setTotalOffers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const filterOptions = ["", "Mais recentes", "Ativos", "Em utilização"];

    const handleFilterSelect = (filter: string) => {
        setSelectedFilter(filter);
    };

    const getProgramIcon = (loyaltyProgram: string) => {
        return loyaltyProgram.toLowerCase().includes('azul') ? AzulIcon : SmilesIcon;
    };

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'ativo':
            case 'ativa':
                return styles['status-active'];
            case 'em utilizacao':
            case 'em utilização':
                return styles['status-in-use'];
            default:
                return styles['status-inactive'];
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatNumber = (number: number) => {
        return number.toLocaleString('pt-BR');
    };

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/offers', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: ApiResponse = await response.json();
                setOffers(data.offers);
                setTotalOffers(data.totalQuantityOffers);
            } catch (error) {
                console.error('Erro ao buscar ofertas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles['header-offers']}>
                <span className={styles['page-title']}>Minhas ofertas</span>
                <Button
                    name="Nova Oferta"
                    icon={PlusIcon}
                    className={styles['offer-button']}
                    onClick={() => router.push("/new-offer")}
                >
                </Button>
            </div>
            <Box className={styles.box}>
                <div className={styles['box-header']}>
                    <span className={styles['offers-title']}>Todas ofertas ({totalOffers})</span>
                    <div className={styles.inputs}>
                        <TextInput
                            placeholder="Login de acesso, ID da oferta..."
                            className={styles['offers-search-input']}
                            icon={SearchIcon.src}
                        />
                        <FilterInput
                            placeholder="Filtros"
                            className={styles['offers-filters-input']}
                            icon={ExpandIcon.src}
                            filters={filterOptions}
                            onFilterSelect={handleFilterSelect}
                            selectedFilter={selectedFilter}
                        />
                    </div>
                </div>
                <div className={styles['box-data']}>
                    {loading ? (
                        <div className={styles.loading}>Carregando ofertas...</div>
                    ) : (
                        <table className={styles['offers-table']}>
                            <thead>
                                <tr>
                                    <th>Programa</th>
                                    <th>Status</th>
                                    <th>ID da oferta</th>
                                    <th>Login</th>
                                    <th>Milhas ofertadas</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.map((offer) => (
                                    <tr key={offer.offerId}>
                                        <td>
                                            <div className={styles['program-cell']}>
                                                <img
                                                    src={getProgramIcon(offer.loyaltyProgram).src}
                                                    alt={offer.loyaltyProgram}
                                                    className={styles['program-icon']}
                                                />
                                                <div className={styles['program-info']}>
                                                    <span className={styles['program-name']}>{offer.loyaltyProgram}</span>
                                                    <span className={styles['program-type']}>{offer.offerType}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles['status-badge']} ${getStatusClass(offer.offerStatus)}`}>
                                                ● {offer.offerStatus}
                                            </span>
                                        </td>
                                        <td>{offer.offerId}</td>
                                        <td>{offer.accountLogin}</td>
                                        <td>{formatNumber(offer.availableQuantity)}</td>
                                        <td>{formatDate(offer.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {/* mobile list */}
                <div className={styles['box-data-mobile']}>
                    {loading ? (
                        <div className={styles.loading}>Carregando ofertas...</div>
                    ) : (
                        <div className={styles['offer-list']}>
                            {offers.map((offer) => (
                                <div key={offer.offerId} className={styles['offer-item']}>
                                    <div className={styles['offer-header']}>
                                        <div className={styles['offer-header-left']}>
                                            <img
                                                src={getProgramIcon(offer.loyaltyProgram).src}
                                                alt={offer.loyaltyProgram}
                                                className={styles['program-icon']}
                                            />
                                            <span className={styles['program-name-mobile']}>{offer.loyaltyProgram}</span>
                                        </div>
                                        <div className={styles['offer-header-right']}>
                                            <span className={`${styles['status-badge']} ${getStatusClass(offer.offerStatus)}`}>
                                                ● {offer.offerStatus}
                                            </span>
                                            <span className={styles['offer-date']}>{formatDate(offer.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className={styles['offer-info']}>
                                        <div className={styles['offer-info-row']}>
                                            <span className={styles['offer-info-label']}>ID da oferta</span>
                                            <span className={styles['offer-info-value']}>{offer.offerId}</span>
                                        </div>
                                        <div className={styles['offer-info-row']}>
                                            <span className={styles['offer-info-label']}>Login</span>
                                            <span className={styles['offer-info-value']}>{offer.accountLogin}</span>
                                        </div>
                                        <div className={styles['offer-info-row']}>
                                            <span className={styles['offer-info-label']}>Milhas ofertadas</span>
                                            <span className={styles['offer-info-value']}>{formatNumber(offer.availableQuantity)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Box>
        </div>
    )
}