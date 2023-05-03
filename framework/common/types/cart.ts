import { ProductOption, ProductVariants } from "./product";

interface Discount {
  value: number;
}

export interface LineItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  path: string;
  quantity: number;
  discounts: Discount[];
  options?: ProductOption[];
  variant: Partial<ProductVariants>;
}

export interface Cart {
  id: string;
  createdAt: String;
  currency: { code: string };
  taxesIncluded: boolean;
  lineItemsSubtotalPrice: number;
  totalPrice: number;
  lineItems: any[];
  discounts: Discount[];
}
