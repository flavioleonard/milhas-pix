export interface Step1Data {
  selectedProgram: string;
  product: string;
  availableCPFs: string;
}

export interface Step2Data {
  paymentTiming: string;
  milesQuantity: number;
  pricePerMile: number;
  useAverage: boolean;
  averageMiles?: number;
}

export interface Step3Data {
  cpf: string;
  loginAccess: string;
  accessPassword: string;
  authPhone: string;
}

export interface AllData {
  step1: Step1Data | null;
  step2: Step2Data | null;
  step3: Step3Data | null;
}
