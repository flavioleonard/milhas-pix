import { NextResponse } from "next/server";
import type { Offer } from "@/types/Offer";

export interface ApiResponse {
  totalQuantityOffers: number;
  offers: Offer[];
}

export async function GET() {
  try {
    const response = await fetch(
      "https://api.milhaspix.com/simulate-offers-list",
      {
        cache: "no-store", // Para sempre buscar dados frescos
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar ofertas da API externa:", error);

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: "Não foi possível buscar as ofertas",
      },
      { status: 500 }
    );
  }
}
