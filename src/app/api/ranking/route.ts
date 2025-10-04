import { NextRequest, NextResponse } from "next/server";

export interface RankingItem {
  mile_value: number;
  description: string;
  position: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mileValue = searchParams.get("mile_value");

    if (!mileValue) {
      return NextResponse.json(
        { error: "mile_value parameter is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.milhaspix.com/simulate-ranking?mile_value=${mileValue}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RankingItem[] = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar ranking da API externa:", error);

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        message: "Não foi possível buscar o ranking",
      },
      { status: 500 }
    );
  }
}
