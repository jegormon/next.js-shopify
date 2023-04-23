import { Product } from "@/framework/common/types/product";
import { FC } from "react";

interface Props {
  product: Product;
}
const ProductCard: FC<Props> = ({ product }) => {
  return <div>{product.name}</div>;
};

export default ProductCard;
