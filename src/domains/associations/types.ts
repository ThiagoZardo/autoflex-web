export interface Association {
  id: number;
  productId: number;
  rawMaterialId: number;
  quantity: number;
  productName?: string;
  rawMaterialName?: string;
}
