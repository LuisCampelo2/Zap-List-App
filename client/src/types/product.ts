export interface Product {
  id: number;
  name: string;
  photo: string;
  category: string;
  price: number | null;
  unitOFMeasure: number | null;
  unitOfCalculation: number | null;
  averageWeight: number | null;
}
