"use client";


import { Box } from "@/components/box/Box"
import { Button } from "@/components/button/Button"
import PlusIcon from "@/assets/Plus.png"
import SearchIcon from "@/assets/Search.png"
import ExpandIcon from "@/assets/Show.png"
import SmilesIcon from "@/assets/Smiles.png"
import AzulIcon from "@/assets/TudoAzul.png"
import "./page.css"
import TextInput from "@/components/inputs/text-input/TextInput"
import FilterInput from "@/components/inputs/filter-input/FilterInput"
import { useState, useEffect } from "react"
import type { Offer } from "@/types/Offer"
import { ApiResponse } from "./api/offers/route";
import { useRouter } from "next/navigation";

export default function Page() {
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
        return 'status-active';
      case 'em utilizacao':
      case 'em utilização':
        return 'status-in-use';
      default:
        return 'status-inactive';
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
        const response = await fetch('/api/offers');

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
    <div className="container">
      <div className="header-offers">
        <span className="page-title">Minhas ofertas</span>
        <Button
          name="Nova Oferta"
          icon={PlusIcon}
          className="offer-button"
          onClick={() => router.push("/new-offer")}
        >
        </Button>
      </div>
      <Box className="box">
        <div className="box-header">
          <span className="offers-title">Todas ofertas ({totalOffers})</span>
          <div className="inputs">
            <TextInput
              placeholder="Login de acesso, ID da oferta..."
              className="offers-search-input"
              icon={SearchIcon.src}
            />
            <FilterInput
              placeholder="Filtros"
              className="offers-filters-input"
              icon={ExpandIcon.src}
              filters={filterOptions}
              onFilterSelect={handleFilterSelect}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
        <div className="box-data">
          {loading ? (
            <div className="loading">Carregando ofertas...</div>
          ) : (
            <table className="offers-table">
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
                      <div className="program-cell">
                        <img
                          src={getProgramIcon(offer.loyaltyProgram).src}
                          alt={offer.loyaltyProgram}
                          className="program-icon"
                        />
                        <div className="program-info">
                          <span className="program-name">{offer.loyaltyProgram}</span>
                          <span className="program-type">{offer.offerType}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(offer.offerStatus)}`}>
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
      </Box>
    </div>
  )
}